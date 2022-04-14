import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const LeftMenuForSuperAdmin: React.FC = () => {

    let [leftMenuVisibility, setLeftMenuVisibility] = useState(false);

    function changeLeftMenuVisibility() {
        setLeftMenuVisibility(!leftMenuVisibility);
    }

    function getCollapseClass() {
        return (leftMenuVisibility) ? "" : "collapsed";
    }

    return (
        <Fragment>
            <div className="toggle-area">
                <button className="btn btn-primary toggle-button" onClick={() => changeLeftMenuVisibility()}>
                    <i className="fas fa-bolt"></i>
                </button>
            </div>

            <ul className={`navbar-nav bg-gradient-primary-green sidebar sidebar-dark accordion ${getCollapseClass()}`}
                id="collapseMenu">

                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-text mx-3">Kids Painting</div>
                </a>

                <hr className="sidebar-divider my-0" />

                <li className="nav-item active">

                    <Link className="nav-link" to="/super-admin/home">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Trang chủ</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Quản lý người dùng
                </div>

                <li className="nav-item">
                    <Link className="nav-link" to={`/super-admin/add-user`}>
                        <i className="fas fa-fw fa-user"></i>
                        <span>Thêm người dùng</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/super-admin/teacher-request`}>
                        <i className="fas fa-fw fa-user"></i>
                        <span>Yêu cầu</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Quản lý hệ thống
                </div>

                <li className="nav-item">
                    <Link className="nav-link" to={`/super-admin/art`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Mỹ thuật</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/super-admin/courses`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Khoá học</span>
                    </Link>
                </li>


                <li className="nav-item">
                    <Link className="nav-link" to={`/super-admin/myclass`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Lớp học</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/super-admin/contest`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Cuộc thi</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`/super-admin/feedbacks`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Phản hồi</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`/super-admin/blog`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Blog</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Quản lý tài khoản
                </div>
                <li className="nav-item">
                    <Link className="nav-link" to={`/super-admin/account`}>
                        <i className="fas fa-fw fa-user-circle"></i>
                        <span>Tài khoản</span>
                    </Link>
                </li>
            </ul>
        </Fragment>
    );
};

export default LeftMenuForSuperAdmin;
