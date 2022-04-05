import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const LeftMenuForTeacher: React.FC = () => {

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
                    <Link className="nav-link" to="/teacher/home">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Trang chủ</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/teacher/sigup-class`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Đăng ký lớp</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to={`/teacher/sigup-course`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Đăng ký trình độ</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Lớp
                </div>

                <li className="nav-item">
                    <Link className="nav-link" to={`/teacher/myclass`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Lớp dạy</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`/teacher/schedule`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Thời khóa biểu</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Cuộc thi
                </div>

                <li className="nav-item">
                    <Link className="nav-link" to={`/teacher/contest`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Cuộc thi chấm</span>
                    </Link>
                </li>


                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Tiện ích khác
                </div>

                <li className="nav-item">
                    <Link className="nav-link" to={`/teacher/change-class`}>
                        <i className="fas fa-fw fa-warehouse"></i>
                        <span>Yêu cầu đổi lớp</span>
                    </Link>
                </li>

                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Quản lý tài khoản
                </div>
                <li className="nav-item">
                    <Link className="nav-link" to={`/teacher/account`}>
                        <i className="fas fa-fw fa-user-circle"></i>
                        <span>Tài khoản</span>
                    </Link>
                </li>
            </ul>
        </Fragment>
    );
};

export default LeftMenuForTeacher;
