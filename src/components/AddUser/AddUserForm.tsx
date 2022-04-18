import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUser, UserModificationStatus } from "../../store/models/user.interface";
import { addUser, clearSelectedUser, setModificationState } from "../../store/actions/users/users.action";
import { addNotification } from "../../store/actions/notifications.action";
import { IUserFormState, OnChangeModel } from "../../common/types/Form.types";
import TextInput from "../../common/components/TextInput";
import { IStateType, ICourseState } from "../../store/models/root.interface";
import { ICourse } from "../../store/models/courses.interface";
import SelectInput from "../../common/components/Select";
import { postUser } from "../../store/actions/users/postUser";

type teacherInfo = {
  username: string;
  level: string;
};

const AddUserForm: React.FC = (props: any) => {
  const dispatch: Dispatch<any> = useDispatch();
  let user: IUser = { id: 0, firstName: '', lastName: '', username: '', avatar: '', userStatus: true, email: '', sex: '', dateOfDay: '', address: '', phone: '', password: '' }
  const courses: ICourseState = useSelector((state: IStateType) => state.courses);

  const listCourse: ICourse[] = courses.courses
  const listCourses: string[] = []
  listCourse.map((ele) => {
    return listCourses.push(ele.name)
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

      dispatch(postUser({
        ...user,
        firstName: formState.firstName.value,
        lastName: formState.lastName.value,
        username: formState.username.value,
        avatar: formState.avatar.value,
        email: formState.email.value,
        sex: formState.sex.value,
        dateOfDay: formState.dateOfDay.value,
        address: formState.address.value,
        phone: formState.phone.value,
        password: formState.password.value,
      }))

      dispatch(addNotification("Giáo viên ", ` ${formState.username.value} đã thêm bởi bạn`));
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
    return (formState.username.error || !formState.username.value) as boolean;
  }

  const [csvFile, setCsvFile] = useState<any>();

  const [csvArray, setCsvArray] = useState<any>([]);

  const processCSV = (str: string, delim = ',') => {
    const headers = str.slice(0, str.indexOf('\n')).split(delim);
    const rows = str.slice(str.indexOf('\n') + 1).split('\n');

    const newArray = rows.map(row => {
      const values = row.split(delim);
      const eachObject = headers.reduce((obj: any, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {})
      return eachObject;
    })
    setCsvArray(newArray)
    csvArray.map((ele: any) => {
      if (ele.username !== "") {
        let x: IUserFormState = {
          firstName: { error: "", value: user.firstName },
          lastName: { error: "", value: user.lastName },
          username: { error: "", value: ele.username },
          avatar: { error: "", value: user.avatar },
          email: { error: "", value: user.email },
          sex: { error: "", value: user.sex },
          dateOfDay: { error: "", value: user.dateOfDay },
          address: { error: "", value: user.address },
          phone: { error: "", value: user.phone },
          password: { error: "", value: user.password },
        };
        console.log(ele.username)
        let saveUserFn: Function = addUser;
        console.log('add')
        saveForm(x, saveUserFn);
      }
      return 0
    })
  }

  const saveTeacherCSV = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const file = csvFile;
    const reader = new FileReader();

    reader.onload = function (e: any) {
      const text = e.target.result;
      processCSV(text)
    }

    reader.readAsText(file);
  }
    console.log(localStorage.getItem('typeUserAdd'))
  if (localStorage.getItem('typeUserAdd') === "Quản trị viên" || localStorage.getItem('typeUserAdd') === "Nhân viên"){
    return (
      <Fragment>
        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green"> {"Tạo"} thông tin tài khoản</h6>
            </div>
            <div className="card-body">
              <form id='csv-form' onSubmit={saveTeacherCSV}>
                <div className="form-group">
                  <input
                    type={"file"}
                    accept=".csv,.xlsx,.xls"
                    id="csvFile"
                    onChange={(e: any) => {
                      setCsvFile(e.target.files[0])
                    }}
                  />
                </div>
                <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
                <button type="submit" className={`btn btn-success left-margin`}>Lưu</button>
                <br />
                <br />
                {/*               {csvArray.length > 0 ?
                  <>
                    <table>
                      <thead>
                        <th>Tên đăng nhập</th>
                        <th>Trình dộ</th>
                      </thead>
                      <tbody>
                        {
                          csvArray.map((item: any, index: any) => (
                            <tr key={index}>
                              <td>{item.username}</td>
                              <td>{item.level}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </table>
                  </> : null} */}
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
                  <TextInput id="input_username"
                    value={formState.username.value}
                    field="username"
                    onChange={hasFormValueChanged}
                    required={true}
                    maxLength={10000}
                    label="Tên đăng nhập"
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
  }
  return (
    <Fragment>
      <div className="col-xl-6 col-lg-6">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green"> {"Tạo"} thông tin tài khoản</h6>
          </div>
          <div className="card-body">
            <form id='csv-form' onSubmit={saveTeacherCSV}>
              <div className="form-group">
                <input
                  type={"file"}
                  accept=".csv,.xlsx,.xls"
                  id="csvFile"
                  onChange={(e: any) => {
                    setCsvFile(e.target.files[0])
                  }}
                />
              </div>
              <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
              <button type="submit" className={`btn btn-success left-margin`}>Lưu</button>
              <br />
              <br />
              {/*               {csvArray.length > 0 ?
                <>
                  <table>
                    <thead>
                      <th>Tên đăng nhập</th>
                      <th>Trình dộ</th>
                    </thead>
                    <tbody>
                      {
                        csvArray.map((item: any, index: any) => (
                          <tr key={index}>
                            <td>{item.username}</td>
                            <td>{item.level}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </> : null} */}
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
                <TextInput id="input_username"
                  value={formState.username.value}
                  field="username"
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

export default AddUserForm;
