import React, { Fragment, Dispatch } from "react";
import TopCard from "../../common/components/TopCard";
import { IBlog } from "../../store/models/blog.interface";
import { useDispatch, useSelector } from "react-redux";
import { IStateType } from "../../store/models/root.interface";
import { addBlog, removeBlog, removeBlogWait } from "../../store/actions/blog.actions";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { addNotification } from "../../store/actions/notifications.action";

const Blogs: React.FC = () => {

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Bài viết", "Danh sách"));
  
  const blogs: IBlog[] = useSelector((state: IStateType) => state.blogs.blogs);
  const blogAccept: IBlog[] = useSelector((state: IStateType) => state.blogs.blogAccept);

  function setBlogAccept(blog: IBlog): void {
    dispatch(addNotification("Bài viết'", ` Bài viết của ${blog.email} ' đã thêm vào hệ thống`));
    dispatch(addBlog(blog));
  }

  function setBlogNotAccept(blogAccept: IBlog): void {
    dispatch(addNotification("Bài viết'", `Bài viết của ${blogAccept.email} ' đã bị xóa khỏi hệ thống`));
    dispatch(removeBlog(blogAccept.id)); 
  }

  function setBlogWaitNotAccept(blog: IBlog): void {
    dispatch(addNotification("Bài viết'", `Bài viết của ${blog.email} ' không được chấp nhận`));
    dispatch(removeBlogWait(blog.id)); 
  }

  const blogElements: JSX.Element[] = blogs.map(blog => {
    return (
      <tr className={`table-row`}
        key={`blog_${blog.id}`}>
        <th scope="row">{blog.id}</th>
        <td>{blog.email}</td>
        <td>{blog.description}</td>
        <td><button className="btn btn-success" onClick={() => setBlogAccept(blog)}>Chấp nhận</button> </td>
        <td><button className="btn btn-danger" onClick={() => setBlogWaitNotAccept(blog)}>Xóa</button> </td>
      </tr>);
  });

  const blogAcceptElements: JSX.Element[] = blogAccept.map(blogAccept_element => {
    return (
      <tr className={`table-row`}
        key={`blog_${blogAccept_element.id}`}>
        <th scope="row">{blogAccept_element.id}</th>
        <td>{blogAccept_element.email}</td>
        <td id="isDescription">{blogAccept_element.description}</td>
        <td><button className="btn btn-danger" onClick={() => setBlogNotAccept(blogAccept_element)}>Xóa bài viết</button> </td>
      </tr>);
  });

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Phản hồi</h1>
      <p className="mb-4">Thông tin chung</p>

      <div className="row">
        <TopCard title="PHẢN HỒI ĐƯỢC CHẤP NHẬN" text={blogAccept.length.toString()} icon="user-tie" class="primary" />
        <TopCard title="PHẢN HỒI CHỜ XỬ LÝ" text={blogs.length.toString()} icon="user" class="danger" />
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách phản hồi được chấp nhận</h6>
              <div className="header-buttons">
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive portlet">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Email</th>
                      <th scope="col">Chi tiết</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogAcceptElements}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách phản hồi chờ xử lý</h6>
              <div className="header-buttons">
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive portlet">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Email</th>
                      <th scope="col">Chi tiết</th>
                    </tr>
                  </thead>
                  <tbody id="xxx">
                    {blogElements}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment >
  );
};

export default Blogs;
