import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IStateType } from "../../store/models/root.interface";

type role = {
  id: string;
};

function TopMenuNotification(): JSX.Element {
  const email: string = useSelector((state: IStateType) => state.account.email);
  const [isShow, setShow] = useState(false);

  const { id } = useParams<role>()

  return (

    <li className="nav-item dropdown no-arrow">
      <a className="nav-link dropdown-toggle"
        onClick={() => {
          setShow(!isShow);
        }}
        href={`/${id}/notification`}
        id="userDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false">
        <span className="mr-2 d-none d-lg-inline small cadet">{email}</span>
        <i className="fas fa-fw fa-bell"></i>
      </a>

{/*       <div className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${(isShow) ? "show" : ""}`}
        aria-labelledby="userDropdown">
                  <a className="dropdown-item"
        onClick={() => 
                  {
                      history.push({
                        pathname: `/${id}/account`,
                      })
                  }}
        data-toggle="modal"
        href={`/${id}/account`}
        data-target="#logoutModal">
          <i className="fas fa-cog fa-sm fa-fw mr-2 text-gray-400"></i>
          Cài đặt
        </a>


        <a className="dropdown-item"
        onClick={() => {
          dispatch(logout())
          localStorage.removeItem('email')
          localStorage.removeItem('access_token') // Authorization
          localStorage.removeItem('refresh_token')
          localStorage.removeItem('rememberMe')
          localStorage.removeItem('permission')
          localStorage.removeItem('authorities')
        }}
        href="/login" 
        data-toggle="modal"
        data-target="#logoutModal">
          <i className="fas fa-fw fa-bell fa-sm fa-fw mr-2 text-gray-400"></i>
          Logout
        </a>



      </div> */}
    </li>
    
  );
};

export default TopMenuNotification;
