import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router";
import { OnChangeModel } from "../../common/types/Form.types";
//import { useDispatch } from "react-redux";
// import { login } from "../../store/actions/account.actions";
import TextInput from "../../common/components/TextInput";
// import jwtDecode from "jwt-decode";
// import { JwtType } from '../../common/types/Jwt.types'
// import { getDomain } from "../../common/util/RestAPI.util";


const Login: React.FC = () => {
  //let role: string[] = []
  //const dispatch: Dispatch<any> = useDispatch();
  let history = useHistory();

  const [formState, setFormState] = useState({
    email: { error: "", value: "" },
    password: { error: "", value: "" }
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    if(isFormInvalid()) { return; }
    if (formState.email.value === "admin"){
      alert('Quản trị viên đăng nhập thành công!')
      history.push({pathname: '/admin/home', state: {isAdmin: true}})
    }
    else if (formState.email.value === "staff"){
      alert('Nhân viên đăng nhập thành công!')
      history.push({pathname: '/employee/home', state: {isAdmin: 'employee'}})
    }
    else if (formState.email.value === "teacher"){
      alert('Giáo viên đăng nhập thành công!')
      history.push({pathname: '/teacher/home', state: {isAdmin: false}})
    }
    else if (formState.email.value === "super-admin"){
      alert('Super Admin đăng nhập thành công!')
      history.push({pathname: '/super-admin/home', state: {isAdmin: false}})
    }

    localStorage.setItem('email', formState.email.value)
/*     let pathAuth = getDomain('auth')
    fetch(pathAuth, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username":formState.email.value,
        "password": formState.password.value
      })
    })
      .then(res => res.json())
      .then(data => {
        //console.log(data)
        localStorage.setItem('access_token', data.accessToken) // Authorization
        localStorage.setItem('refresh_token', data.refreshToken)
        localStorage.setItem('email', formState.email.value)
        const token: string = data.accessToken;
        //console.log(token)
        const decoded = jwtDecode<JwtType>(token); 
        //console.log(decoded.roles)
        role = decoded.roles
        for (let index = 0; index < role.length; index++) {
          dispatch(login(formState.email.value))
          //console.log(decoded)
          if(role[index] === "ROLE_ADMIN"){
            //console.log(10)
            alert('Quản trị viên đăng nhập thành công!')
            history.push({pathname: '/admin/home', state: {isAdmin: true}})
          }
          else if (role[index] === "ROLE_TEACHER"){
            alert('Giáo viên đăng nhập thành công!')
            history.push({pathname: '/teacher/home', state: {isAdmin: false}})
          }
          else if (role[index] === "ROLE_STAFF"){
            alert('Nhân viên đăng nhập thành công!')
            history.push({pathname: '/employee/home', state: {isAdmin: 'employee'}})
          }
        }
        //console.log(role)
      })
      .catch(() => {
        alert('Đăng nhập không thành công!')
      })
    e.preventDefault(); */
  }

  function isFormInvalid() {
    return (formState.email.error || formState.password.error
      || !formState.email.value || !formState.password.value);
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid() as boolean;
    return isError ? "disabled" : "";
  }

  return (

    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Chào mừng bạn !</h1>
                    </div>
                    <form className="user" onSubmit={submit}>
                      <div className="form-group">

                        <TextInput id="input_email"
                          field="email"
                          value={formState.email.value}
                          onChange={hasFormValueChanged}
                          required={true}
                          maxLength={100}
                          label="Tên đăng nhập"
                          placeholder="Nhập tên đăng nhập" />
                      </div>
                      <div className="form-group">
                        <TextInput id="input_password"
                          field="password"
                          value={formState.password.value}
                          onChange={hasFormValueChanged}
                          required={true}
                          maxLength={100}
                          type="password"
                          label="Mật khẩu"
                          placeholder="Nhập mật khẩu" />
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input type="checkbox" className="custom-control-input" id="customCheck" />
                          <label className="custom-control-label"
                            htmlFor="customCheck">Nhớ tài khoản</label>
                        </div>
                      </div>
                      <button
                        className={`btn btn-primary btn-user btn-block ${getDisabledClass()}`}
                        type="submit">
                        Đăng nhập
                      </button>
                      {/* {
                        function () {
                          if (role === "ADMIN_USER"){
                            return (
                              <div className="container">
                                <div className="row">
                                  <a href="/teacher/login">Bạn là giáo viên ?</a>
                                </div>
                                <div className="row">
                                  <a href="/employee/login">Bạn là nhân viên ?</a>
                                </div>
                              </div>
                            )
                          }
                          else if(role === "TEACHER_USER"){
                            return (
                              <div className="container">
                                <div className="row">
                                  <a href="/admin/login">Bạn là quản trị viên ?</a>
                                </div>
                                <div className="row">
                                  <a href="/employee/login">Bạn là nhân viên ?</a>
                                </div>
                              </div>
                            )
                          }
                          else if (role === "STAFF_USER"){
                            return (
                              <div className="container">
                                <div className="row">
                                  <a href="/teacher/login">Bạn là giáo viên ?</a>
                                </div>
                                <div className="row">
                                  <a href="/admin/login">Bạn là quản trị viên ?</a>
                                </div>
                              </div>
                            )
                          }
                        }()
                      } */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
