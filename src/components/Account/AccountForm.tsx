import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IUserState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IUser, UserModificationStatus } from "../../store/models/user.interface";
import TextInput from "../../common/components/TextInput";
import { editUser, clearSelectedUser, setModificationState } from "../../store/actions/users.action";
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, IUserFormState } from "../../common/types/Form.types";
import SelectInput from "../../common/components/Select";

const AccountForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const users: IUserState | null = useSelector((state: IStateType) => state.users);
  let user: IUser  = users.admins[0]
  

  const [formState, setFormState] = useState({
    fullName: { error: "", value: user.fullName },
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

    let saveUserFn: Function = editUser;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: IUserFormState, saveFn: Function): void {
    if (user) {
      dispatch(saveFn({
        ...user,
        fullName: formState.fullName.value,
        email: formState.email.value,
        sex: formState.sex.value,
        dateOfDay:  formState.dateOfDay.value,
        address:  formState.address.value,
        phone: formState.phone.value,
        password:  formState.password.value,
      }));

      dispatch(addNotification("Thông tin cá nhân", ` ${formState.fullName.value} đã sửa bởi bạn`));
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
    return (formState.phone.error || formState.email.error
      || formState.fullName.error || formState.sex.error || formState.dateOfDay.error || formState.address.error || formState.password.error
      || formState.dateOfDay.error || !formState.fullName.value || !formState.sex.value) as boolean;
  }


  return (
    <Fragment>
      <div className="col-xl-7 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green"> {"Sửa"} thông tin tài khoản</h6>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
              <div className="form-group">
                <TextInput id="input_name"
                  value={formState.fullName.value}
                  field="fullName"
                  onChange={hasFormValueChanged}
                  required={true}
                  maxLength={10000}
                  label="Tên"
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
                <SelectInput
                    id="input_sex"
                    field="sex"
                    label="Giới tính"
                    options={["Nam", "Nữ", "Không xác định"]}
                    required={true}
                    onChange={hasFormValueChanged}
                    value={formState.sex.value}
                  />
              </div>
              <div className="form-group">
                <TextInput id="input_dateOfDay"
                  value={formState.dateOfDay.value}
                  field="dateOfDay"
                  onChange={hasFormValueChanged}
                  required={true}
                  maxLength={20}
                  label=""
                  placeholder="" />
              </div>
              <div className="form-group">
                <TextInput id="input_address"
                field = "address"
                  value={formState.address.value}
                  onChange={hasFormValueChanged}
                  required={false}
                  maxLength={100}
                  label="Địa chỉ"
                  placeholder="" />
              </div>
              <div className="form-group">
                <TextInput id="input_phone"
                  field = "phone"
                  value={formState.phone.value}
                  onChange={hasFormValueChanged}
                  required={false}
                  maxLength={100}
                  label="Số điện thoại"
                  placeholder="" />
              </div>
              <div className="form-group">
                <TextInput id="input_password"
                  field = "password"
                  type="password"
                  value={formState.password.value}
                  onChange={hasFormValueChanged}
                  required={false}
                  maxLength={100}
                  label="Mật khẩu"
                  placeholder="" />
              </div>
              <button className="btn btn-danger" onClick={() => cancelForm()}>Cancel</button>
              <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Save</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AccountForm;
