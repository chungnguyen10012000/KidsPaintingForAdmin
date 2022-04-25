import React, { Dispatch, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStateType, IBlogState } from "../../store/models/root.interface";
import { BlogModificationStatus, IBlog } from "../../store/models/blogs.innterface";
import { useHistory, useParams } from "react-router-dom";
import { clearSelectedBlog, setModificationState } from "../../store/actions/blogs.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { deleteBlog } from "../../common/service/blog/deleteBlog";
import Popup from "reactjs-popup";

export type productListProps = {
  onSelect?: (product: IBlog) => void;
  children?: React.ReactNode;
};

type role = {
  id: string;
};

function BlogList(props: productListProps): JSX.Element  {

  let history = useHistory();
  const { id } = useParams<role>()

  const dispatch: Dispatch<any> = useDispatch();
  
  const blogs: IBlogState = useSelector((state: IStateType) => state.blogs);

  const [popup, setPopup] = useState(false);
  const [blog, setBlog] = useState<any>()

  function onBlogRemove(blog: IBlog) {
    console.log('enter Remove')
    setPopup(true);
    setBlog(blog)
  }

  const productElements: (JSX.Element | null)[] = blogs.blogs.map((blog_item, index) => {
    if (!blog_item) { return null; }
    return (
      <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12" key={index}>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green">{blog_item.name}</h6>
            <div className="header-buttons">
            </div>
          </div>
          <img className="card-img-top" src={require('../../assets/img/blog/blog_1.jpg')} alt="" onClick={() => {
            console.log('click img')
            history.push({
              pathname: `/${id}/blog-detail`,
              state: { body: blog_item.description }
            })
          }}></img>
          <div className="card-body">
            <button
              className="btn btn-success btn-blue"
              onClick={() => {
                if (props.onSelect) props.onSelect(blog_item);
                dispatch(setModificationState(BlogModificationStatus.Edit))
                history.push({
                  pathname: `/${id}/edit-blog`,
                  state: { body: blog_item.description }
                })
              }
              }
            >
              <i className="fas fa fa-pen"></i>
              Chỉnh sửa</button>
            <button className="btn btn-success btn-red float-right" onClick={() => {
              onBlogRemove(blog_item)
            }}>
              <i className="fas fa fa-times" ></i>
              Xóa
            </button>
          </div>
        </div>
      </div>
    );
  });


  return (
    <>
      {productElements}
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
                if (!blog) {
                  return;
                }
                dispatch(addNotification("Blog", ` ${blog.name} đã bị xóa khỏi hệ thống`));
                dispatch(deleteBlog(blog.id));
                dispatch(clearSelectedBlog());
                setPopup(false);
              }}>Xóa
            </button>
          </div>
        </div>
      </Popup>
    </>

  );
}

export default BlogList;
