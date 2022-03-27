import React, { Fragment, Dispatch, useState, useEffect } from "react";
import BlogList from "./BlogList";
import BlogForm from "./BlogForm";
import TopCard from "../../common/components/TopCard";
import "./Blog.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IBlogState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import { removeBlog, clearSelectedBlog, setModificationState,
  changeSelectedBlog } from "../../store/actions/blogs.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { BlogModificationStatus, IBlog } from "../../store/models/blogs.innterface";
import { useHistory, useParams } from "react-router-dom";

type role = {
  id: string;
};

const Blogs: React.FC = () => {

  const { id } = useParams<role>()
  const [description, setDescription] = useState<String>('')

  let history = useHistory();

  const dispatch: Dispatch<any> = useDispatch();
  const blogs: IBlogState = useSelector((state: IStateType) => state.blogs);
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  const numberItemsCount: number = blogs.blogs.length;
  const [popup, setPopup] = useState(false);
  
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };
  console.log(searchTerm)

  useEffect(() => {
    dispatch(clearSelectedBlog());
    dispatch(updateCurrentPath("Blog", "Danh sách"));
  }, [path.area, dispatch]);

  function onBlogSelect(product: IBlog): void {
    dispatch(changeSelectedBlog(product));
    dispatch(setModificationState(BlogModificationStatus.None));
    setDescription(product.description)
  }

  function onBlogRemove() {
    if(blogs.selectedBlog) {
      setPopup(true);
    }
  }

  console.log(description)
  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Blog</h1>
      <p className="mb-4">Thông tin chung</p>
      <div className="row">
        <TopCard title="TỔNG SỐ Blog" text={`${numberItemsCount}`} icon="box" class="primary" />
        <div className="col-xl-6 col-md-6 mb-4">
          <div className="shadow h-100 py-4 ">
            <div className="card-body">
              <input
                type="text"
                placeholder="Tìm kiếm"
                value={searchTerm}
                onChange={handleChange}
                style={{width: '100%'}}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách Blog</h6>
              <div className="header-buttons">
                <button className="btn btn-success btn-green" onClick={() =>
                  dispatch(setModificationState(BlogModificationStatus.Create))}>
                  <i className="fas fa fa-plus"></i>
                </button>
                <button className="btn btn-success btn-blue" onClick={() =>
                  dispatch(setModificationState(BlogModificationStatus.Edit))}>
                  <i className="fas fa fa-pen"></i>
                </button>
                <button className="btn btn-success btn-red" onClick={() => onBlogRemove()}>
                  <i className="fas fa fa-times"></i>
                </button>
                <button className="btn btn-success btn-blue" onClick={() => 
                  {
                    if (blogs.selectedBlog){
                      history.push({
                        pathname: `/${id}/blog-detail`,
                        state: { body : description}
                      })
                    }
                  }}>
                  <i className="fas fa fa-info-circle"></i>
                </button>
              </div>
            </div>
            <div className="card-body">
              <BlogList
                onSelect={onBlogSelect}
              />
            </div>
          </div>
        </div>
        {((blogs.modificationState === BlogModificationStatus.Create)
          || (blogs.modificationState === BlogModificationStatus.Edit && blogs.selectedBlog)) ?
          <BlogForm /> : null}
      </div>


      <Popup
        className="popup-modal"
        open={popup}
        onClose={() => setPopup(false)}
        closeOnDocumentClick
      >
        <div className="popup-modal">
          <div className="popup-title">
            Bạn chắc chắn?
          </div>
          <div className="popup-content">
            <button type="button"
              className="btn btn-danger"
              onClick={() => {
                if (!blogs.selectedBlog) {
                  return;
                }
                dispatch(addNotification("Blog", ` ${blogs.selectedBlog.name} đã bị xóa khỏi hệ thống`));
                dispatch(removeBlog(blogs.selectedBlog.id));
                dispatch(clearSelectedBlog());
                setPopup(false);
              }}>Xóa
              </button>
          </div>
        </div>
      </Popup>
    </Fragment >
  );
};

export default Blogs;
