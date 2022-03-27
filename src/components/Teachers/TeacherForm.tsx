import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { useDispatch } from "react-redux";
import { IUser, UserModificationStatus } from "../../store/models/user.interface";
import TextInput from "../../common/components/TextInput";
import { addUser, clearSelectedUser, setModificationState } from "../../store/actions/users.action";
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, IUserFormState } from "../../common/types/Form.types";

const TeacherForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  let user: IUser  = {id: 0, firstName: '', lastName: '', username: '', avatar: '', userStatus: true, email: '', sex: '', dateOfDay: '', address: '', phone: '', password: ''}
  

  const [formState, setFormState] = useState({
    firstName: { error: "", value: user.firstName },
    lastName: { error: "", value: user.lastName },
    username: { error: "", value: user.username },
    avatar: { error: "", value: user.avatar },
    email: { error: "", value: user.email },
    sex: { error: "", value: user.sex },
    dateOfDay: { error: "", value: user.dateOfDay },
    address: { error: "", value: user.address },
    phone: { error: "", value: user.phone },
    password: { error: "", value: user.password },
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function saveUser(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }

    let saveUserFn: Function = addUser;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: IUserFormState, saveFn: Function): void {
    if (user) {
      dispatch(saveFn({
        ...user,
        firstName: formState.firstName.value,
        lastName: formState.lastName.value,
        username: formState.username.value,
        avatar: formState.avatar.value,
        email: formState.email.value,
        sex: formState.sex.value,
        dateOfDay:  formState.dateOfDay.value,
        address:  formState.address.value,
        phone: formState.phone.value,
        password:  formState.password.value,
      }));

      dispatch(addNotification("Giáo viên ", ` ${formState.email.value} đã thêm bởi bạn`));
      dispatch(clearSelectedUser());
      dispatch(setModificationState(UserModificationStatus.None));
    }
  }

  function cancelForm(): void {
    dispatch(setModificationState(UserModificationStatus.None));
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.username.error || formState.password.error
       || !formState.username.value  ) as boolean;
}

  return (
    <Fragment>
      <div className="col-xl-7 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green"> {"Tạo"} thông tin tài khoản</h6>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
              <div className="form-group">
                <TextInput id="input_username"
                  field = "username"
                  value={formState.username.value}
                  onChange={hasFormValueChanged}
                  required={false}
                  maxLength={10000}
                  label="Tên đăng nhập*"
                  placeholder="" />
              </div>
              <div className="form-group">
                <TextInput id="input_email"
                field = "email"
                  value={formState.email.value}
                  onChange={hasFormValueChanged}
                  required={false}
                  maxLength={10000}
                  label="Email"
                  placeholder="" />
              </div>
              <div className="form-group">
                <TextInput id="input_password"
                field = "password"
                  value={formState.password.value}
                  onChange={hasFormValueChanged}
                  required={false}
                  maxLength={10000}
                  label="Mật khẩu*"
                  placeholder="" />
              </div>
              <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
              <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Lưu</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TeacherForm;
