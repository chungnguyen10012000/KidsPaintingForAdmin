import React, { useState, FormEvent, Dispatch, Fragment } from "react";
//import { IStateType, IUserState } from "../../store/models/root.interface";
import { useDispatch } from "react-redux";
import { IUser, UserModificationStatus } from "../../store/models/user.interface";
import TextInput from "../../common/components/TextInput";
import { editUser, clearSelectedUser, setModificationState } from "../../store/actions/users.action";
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, IUserFormState } from "../../common/types/Form.types";
import SelectInput from "../../common/components/Select";

const AccountForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  //const users: IUserState | null = useSelector((state: IStateType) => state.users);
  let user: IUser | null = {
    id: 0, firstName: "", 
    lastName: "", 
    avatar: "", 
    email: "", 
    sex: "", 
    dateOfDay: "", 
    address: "", 
    phone: "", 
    password: "",  
    username:"", 
    userStatus: true
  }



  

  const [formState, setFormState] = useState({
    firstName: { error: "", value: user.firstName },
    lastName: { error: "", value: user.lastName},
    email: { error: "", value: user.email },
    username: { error: "", value: user.username },
    sex: { error: "", value: user.sex },
    dateOfDay: { error: "", value: user.dateOfDay },
    address: { error: "", value: user.address },
    phone: { error: "", value: user.phone },
    password: { error: "", value: user.password },
    avatar: { error: "", value: user.avatar },
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
        firstName: formState.firstName.value,
        lastName: formState.lastName.value,
        email: formState.email.value,
        username: formState.username.value,
        avatar: formState.avatar.value,
        sex: formState.sex.value,
        dateOfDay:  formState.dateOfDay.value,
        address:  formState.address.value,
        phone: formState.phone.value,
        password:  formState.password.value,
      }));


      dispatch(addNotification("Th??ng tin c?? nh??n", ` ${formState.email.value} ???? s???a b???i b???n`));
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
      || formState.firstName.error || formState.sex.error || formState.dateOfDay.error || formState.address.error || formState.password.error
      || formState.dateOfDay.error || !formState.firstName.value || !formState.sex.value) as boolean;
  }


  return (
    <Fragment>
      <div className="col-xl-6 col-lg-6">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green"> {"S???a"} th??ng tin t??i kho???n</h6>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
              <div className="form-group">
                <label>Ch???n ???nh ?????i di???n</label>
                <input id="input_avatar"
                  type="file"
                  value={formState.avatar.value}
                  onChange={() => hasFormValueChanged}
                  placeholder="Ch???n ???nh ?????i di???n" />
              </div>
              <div className="form-group">
                <TextInput id="input_firstName"
                  value={formState.firstName.value}
                  field="firstName"
                  onChange={hasFormValueChanged}
                  required={true}
                  maxLength={10000}
                  label="H???"
                  placeholder="" />
              </div>
              <div className="form-group">
                <TextInput id="input_lastName"
                  value={formState.lastName.value}
                  field="lastName"
                  onChange={hasFormValueChanged}
                  required={true}
                  maxLength={10000}
                  label="T??n"
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
                <TextInput id="input_username"
                field = "username"
                  value={formState.username.value}
                  onChange={hasFormValueChanged}
                  required={false}
                  maxLength={10000}
                  label="T??n ????ng nh???p"
                  placeholder="" />
              </div>
              <div className="form-group">
                <SelectInput
                    id="input_sex"
                    field="sex"
                    label="Gi???i t??nh"
                    options={["Nam", "N???", "Kh??ng x??c ?????nh"]}
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
                  label="?????a ch???"
                  placeholder="" />
              </div>
              <div className="form-group">
                <TextInput id="input_phone"
                  field = "phone"
                  value={formState.phone.value}
                  onChange={hasFormValueChanged}
                  required={false}
                  maxLength={100}
                  label="S??? ??i???n tho???i"
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
