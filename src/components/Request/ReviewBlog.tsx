import React, { Fragment, Dispatch } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import "./ReviewBlog.css"

const data = [{
    "name": "Tại sao bé nên học mỹ thuật",
    "content": "Các nghiên cứu về trẻ em Việt Nam cho thấy, người lớn vẫn thường thích trẻ vâng lời, làm theo sự chỉ dẫn hơn là thích trẻ sáng tạo, có chính kiến riêng. Nhiều bậc cha mẹ luôn đánh giá sự phát triển của con mình bằng những tiêu chí khuôn mẫu như bé ngoan ngoãn, tuân thủ nề nếp, đạt kết quả cao trên trường, bằng bạn bằng bè."
}]

const ReviewBlog: React.FC = () => {



    const dispatch: Dispatch<any> = useDispatch();
    dispatch(updateCurrentPath("Giáo viên đăng ký", "Danh sách"));

    // useEffect(() => {
    //   let pathUsers = getDomain('user?role=ROLE_TEACHER')
    //   let token: string | null = localStorage.getItem('access_token');
    //   if (token != null) {
    //     getRestApiWithToken(pathUsers, token)
    //       .then(res => {
    //         return RestApiAuth(res);
    //       })
    //       .then( (data: Page) => {
    //         setListUser(data.items)
    //       })
    //     }
    // }, [])


    const userElements: JSX.Element[] = data.map((ele, index) => {
        return (
            <tr className={`table-row`}
                key={`user_${index}`}>
                <th scope="row">{index + 1}</th>
                <td>{ele.name}</td>
                <td><p>{ele.content}</p></td>
                <td><button className="btn btn-warning" >Xem chi tiết</button> </td>
                <td><button className="btn btn-success" >Chấp nhận</button> </td>
                <td><button className="btn btn-danger" >Xóa</button> </td>
            </tr>);
    });

    return (
        <Fragment>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Yêu cầu xác nhận Blog</h6>
                            <div className="header-buttons">
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive portlet">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Tên Blog</th>
                                            <th scope="col">Nội dung</th>
                                            <th scope="col"></th>
                                            <th scope="col">Cấp quyền</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userElements}
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

export default ReviewBlog;
