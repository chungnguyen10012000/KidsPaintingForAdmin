import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUser, UserModificationStatus } from "../../store/models/user.interface";
import { addUser, clearSelectedUser, setModificationState } from "../../store/actions/users.action";
import { addNotification } from "../../store/actions/notifications.action";
import { IUserFormState, OnChangeModel } from "../../common/types/Form.types";
import TextInput from "../../common/components/TextInput";
import SelectInput from "../../common/components/Select";
import { ICourseState, IStateType } from "../../store/models/root.interface";
import { ICourse } from "../../store/models/courses.interface";

const EmployeeForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  let user: IUser = { id: 0, firstName: '', lastName: '', avatar: '', username: '', userStatus: true, email: '', sex: '', dateOfDay: '', address: '', phone: '', password: '' }

  const courses: ICourseState = useSelector((state: IStateType) => state.courses);

  const listCourse: ICourse[] = courses.courses
  const listCourses: string[] = []
  listCourse.map((ele) => {
    return listCourses.push(ele.courseName)
  })

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
        avatar: formState.avatar.value,
        email: formState.email.value,
        sex: formState.sex.value,
        dateOfDay: formState.dateOfDay.value,
        address: formState.address.value,
        phone: formState.phone.value,
        password: formState.password.value,
      }));

      dispatch(addNotification("Nhân viên ", ` ${formState.email.value} đã thêm bởi bạn`));
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
    return (formState.email.error
      || !formState.email.value) as boolean;
  }

  return (
    <Fragment>
      <div className="col-xl-6 col-lg-6">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green"> {"Tạo"} thông tin tài khoản</h6>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
              <div className="form-group">
                <input type={"file"} accept={".csv"} />
              </div>
              <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
              <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Lưu</button>
            </form>
          </div>
        </div>
      </div>
      <div className="col-xl-6 col-lg-6">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green"> {"Tạo"} thông tin tài khoản</h6>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
              <div className="form-group">
                <TextInput id="input_name"
                  value={formState.username.value}
                  field="name"
                  onChange={hasFormValueChanged}
                  required={true}
                  maxLength={10000}
                  label="Tên đăng nhập"
                  placeholder="" />
              </div>
              <div className="form-group">
                  <SelectInput
                    id="input_course"
                    field="course"
                    label="Trình độ"
                    options={listCourses}
                    required={true}
                    onChange={hasFormValueChanged}
                    value={formState.avatar.value}
                  />
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

export default EmployeeForm;
