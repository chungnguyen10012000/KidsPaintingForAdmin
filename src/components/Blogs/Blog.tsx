import React, { Fragment, Dispatch, useState, useEffect } from "react";
import BlogList from "./BlogList";
import BlogForm from "./BlogForm";
import TopCard from "../../common/components/TopCard";
import "./Blog.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IBlogState, IStateType, IRootPageStateType } from "../../store/models/root.interface";
import { clearSelectedBlog, setModificationState,
  changeSelectedBlog } from "../../store/actions/blogs.actions";
import { BlogModificationStatus, IBlog } from "../../store/models/blogs.innterface";
import { getBlog } from "../../common/service/blog/getBlog";

type role = {
  id: string;
};

const Blogs: React.FC = () => {


  const dispatch: Dispatch<any> = useDispatch();
  const blogs: IBlogState = useSelector((state: IStateType) => state.blogs);
  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  const numberItemsCount: number = blogs.blogs.length;

  useEffect(() => {
    dispatch(getBlog())
  }, [dispatch])


  useEffect(() => {
    dispatch(clearSelectedBlog());
    dispatch(updateCurrentPath("Blog", "Danh sách"));
  }, [path.area, dispatch]);

  function onBlogSelect(product: IBlog): void {
    dispatch(changeSelectedBlog(product));
    dispatch(setModificationState(BlogModificationStatus.None));
  }

  const [isCheckOpen1, setIsCheckOpen1] = useState(false)

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Blog</h1>
      <p className="mb-4">Thông tin chung</p>
      <div className="row">
        <TopCard title="TỔNG SỐ Blog" text={`${numberItemsCount}`} icon="box" class="primary" />
      </div>

      <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <button className="btn btn-success btn-green btn-create" onClick={() => {
                        dispatch(setModificationState(BlogModificationStatus.Create))
                        setIsCheckOpen1(!isCheckOpen1)
                    }}
                    >
                        <i className="fas fa fa-plus"></i>
                        Thêm Blog
                    </button>
                </div>

                {((blogs.modificationState === BlogModificationStatus.Create) && isCheckOpen1 === true) ?
                    <BlogForm /> : null}
            </div>

      <div className="row">
        <BlogList
          onSelect={onBlogSelect}
        />
{/*         <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách Blog</h6>
              <div className="header-buttons">
                <button className="btn btn-success btn-blue" onClick={() =>
                  {
                    dispatch(setModificationState(BlogModificationStatus.Edit))
                    setIsCheckOpen2(!isCheckOpen2)
                  }}>
                  <i className="fas fa fa-pen"></i>
                  Chỉnh sửa
                </button>
                <button className="btn btn-success btn-red" onClick={() => onBlogRemove()}>
                  <i className="fas fa fa-times"></i>
                  Xóa
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
                  Chi tiết
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
        {((blogs.modificationState === BlogModificationStatus.Edit && blogs.selectedBlog && isCheckOpen2 === true)) ?
          <BlogForm /> : null} */}
      </div>
    </Fragment >
  );
};

export default Blogs;
