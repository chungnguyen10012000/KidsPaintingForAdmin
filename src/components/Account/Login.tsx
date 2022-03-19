import React, { useState, FormEvent, Dispatch } from "react";
import { useHistory, useParams } from "react-router";
import { OnChangeModel } from "../../common/types/Form.types";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/account.actions";
import TextInput from "../../common/components/TextInput";
import jwtDecode, { JwtPayload } from "jwt-decode";

type role = {
  id: string;
};

const Login: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  let history = useHistory();

  const { id } = useParams<role>()

  const [formState, setFormState] = useState({
    email: { error: "", value: "" },
    password: { error: "", value: "" }
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(isFormInvalid()) { return; }
    var details: { [key: string]: any }= {
      'client_id': 'login-app',
      'username': formState.email.value,
      'password': formState.password.value,
      'grant_type': 'password'
    };

    //console.log(details)

    var formBody: string[] = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue: string = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    var formBodySString: string = formBody.join("&");
    //console.log(formBody)

    fetch('https://kidraw-keycloak.herokuapp.com/auth/realms/SpringBootKeycloak/protocol/openid-connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBodySString
    })
      .then(res => res.json())
      .then(data => {
        //console.log(data)
        localStorage.setItem('access_token', data.access_token) // Authorization
        localStorage.setItem('refresh_token', data.refresh_token)
        localStorage.setItem('email', formState.email.value)
        const token: string = data.access_token;
        const decoded = jwtDecode<JwtPayload>(token); 
        console.log(decoded)
        dispatch(login(formState.email.value)); 
        if(id === "admin"){
          alert('Quản trị viên đăng nhập thành công!')
          history.push({pathname: '/admin/home', state: {isAdmin: true}})
        }
        else if (id === "teacher"){
          alert('Giáo viên đăng nhập thành công!')
          history.push({pathname: '/teacher/home', state: {isAdmin: false}})
        }
        else{
          alert('Nhân viên đăng nhập thành công!')
          history.push({pathname: '/employee/home', state: {isAdmin: 'employee'}})
        }
      })
      .catch(() => {
        alert('Đăng nhập không thành công!')
      })
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
                      <h1 className="h4 text-gray-900 mb-4">Chào mừng {
                        function (){
                          if (id === "admin"){
                            return "Quản trị viên"
                          }
                          else if (id === "teacher"){
                            return "Giáo viên"
                          }
                          return "Nhân viên"
                        }()
                      } !</h1>
                    </div>
                    <form className="user" onSubmit={submit}>
                      <div className="form-group">

                        <TextInput id="input_email"
                          field="email"
                          value={formState.email.value}
                          onChange={hasFormValueChanged}
                          required={true}
                          maxLength={100}
                          label="Email"
                          placeholder="Nhập Email" />
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
                      {
                        function () {
                          if (id === "admin"){
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
                          else if(id === "teacher"){
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
                          else{
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
                      }
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
