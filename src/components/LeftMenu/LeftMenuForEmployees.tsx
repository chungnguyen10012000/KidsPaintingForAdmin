import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const LeftMenuForEmployees: React.FC = () => {

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

                    <Link className="nav-link" to="/employee/home">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Trang chủ</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Quản lý người dùng
                </div>

                <li className="nav-item">
                    <Link className="nav-link" to={`/employee/add-user`}>
                        <i className="fas fa-fw fa-user"></i>
                        <span>Thêm người dùng</span>
                    </Link>
                </li>


                <li className="nav-item">
                    <Link className="nav-link" to={`/employee/request`}>
                        <i className="fas fa-fw fa-user"></i>
                        <span>Yêu cầu</span>
                    </Link>
                </li>


                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Quản lý hệ thống
                </div>

                <li className="nav-item">
                    <Link className="nav-link" to={`/employee/calendar`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Lịch</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/employee/courses`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Khoá học</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/employee/contest`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Cuộc thi</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`/employee/feedbacks`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Phản hồi</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`/employee/blog`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Blog</span>
                    </Link>
                </li>
            </ul>
        </Fragment>
    );
};

export default LeftMenuForEmployees;