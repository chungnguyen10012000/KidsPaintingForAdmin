import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IMyClassState, ICourseState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IMyClass, MyClassModificationStatus } from "../../store/models/myclass.interface";
import { editMyClass, clearSelectedMyClass, setModificationState, addMyClass } from "../../store/actions/myclass.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, IMyClassFormState } from "../../common/types/Form.types";
import { ICourse } from "../../store/models/courses.interface";
import { IUser } from "../../store/models/user.interface";
import SelectInput from "../../common/components/Select";

const data_1 = [
    {
        "username": 'nvchung00',
        "classPrent": "CM-1",
        "classGoal": "CM-2"
    }
]

const ChangeClass: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const myClass: IMyClassState | null = useSelector((state: IStateType) => state.myclass);
    let myclass: IMyClass | null = myClass.selectedMyClass;
    const isCreate: boolean = (myClass.modificationState === MyClassModificationStatus.Create);

    if (!myclass || isCreate) {
        myclass = { id: 0, name: "", course: '', teacher_id: '', amount: 0 };
    }

    const courses: ICourseState = useSelector((state: IStateType) => state.courses);
    const listCourse: ICourse[] = courses.courses
    const listCourses: string[] = []
    listCourse.map((ele) => {
        return listCourses.push(ele.courseName)
    })

    const classList: string[] = [
        "CM-1",
        "CM-2",
    ]

    const courseList: string[] = [
        "Khóa học chì màu dành cho trẻ 5-9 tuổi",
        "Khóa học sơn dầu dành cho trẻ 9-12 tuổi",
    ]

    const [formState, setFormState] = useState({
        name: { error: "", value: myclass.name },
        course: { error: "", value: myclass.course },
        teacher_id: { error: "", value: myclass.teacher_id },
        amount: { error: "", value: myclass.amount },
    });

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }

        let saveUserFn: Function = (isCreate) ? addMyClass : editMyClass;
        saveForm(formState, saveUserFn);
    }

    function saveForm(formState: IMyClassFormState, saveFn: Function): void {
        if (myclass) {
            dispatch(saveFn({
                ...myclass,
                name: formState.name.value,
                course: formState.course.value,
                teacher_id: formState.teacher_id.value,
                amount: formState.amount.value,
            }));

            dispatch(addNotification("Lớp ", `${formState.name.value} đã được thêm bởi bạn`));
            dispatch(clearSelectedMyClass());
            dispatch(setModificationState(MyClassModificationStatus.None));
        }
    }

    function cancelForm(): void {
        dispatch(setModificationState(MyClassModificationStatus.None));
    }

    function getDisabledMyClass(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (formState.amount.error || formState.name.error
            || formState.teacher_id.error || formState.course.error
            || !formState.name.value || !formState.course.value) as boolean;
    }

    const users: IUser[] = useSelector((state: IStateType) => state.users.users);

    const userElements: JSX.Element[] = data_1.map((ele, index )=> {
        return (
            <tr className={`table-row`}
                key={`user_${index + 1}`}>
                <th scope="row">{index + 1}</th>
                <td>{ele.username}</td>
                <td>{ele.classPrent}</td>
                <td>{ele.classGoal}</td>
                <td>
                    <button className="btn btn-success" >Chấp nhận</button>
                </td>
                <td>
                    <button className="btn btn-danger" >Xóa</button>
                </td>
            </tr>);
    });

    return (
        <Fragment>
            <div className="col-xl-6 col-lg-6">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green"> Đăng kí đổi lớp</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={saveUser}>
                            <div className="form-group">
                                <SelectInput
                                    id="input_course"
                                    field="course"
                                    label="Khóa học"
                                    options={courseList}
                                    required={true}
                                    onChange={hasFormValueChanged}
                                    value={formState.course.value}
                                />
                            </div>
                            <div className="form-group">
                                <SelectInput
                                    id="input_lesson"
                                    field="lesson"
                                    label="Lớp hiện tại"
                                    options={classList}
                                    required={true}
                                    onChange={hasFormValueChanged}
                                    value={formState.teacher_id.value}
                                />
                            </div>
                            <div className="form-group">
                                <SelectInput
                                    id="input_lesson"
                                    field="lesson"
                                    label="Lớp muốn đổi"
                                    options={classList}
                                    required={true}
                                    onChange={hasFormValueChanged}
                                    value={formState.teacher_id.value}
                                />
                            </div>
                            <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
                            <button type="submit" className={`btn btn-success left-margin ${getDisabledMyClass()}`}>Lưu</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Yêu cầu đổi lớp</h6>
                            <div className="header-buttons">
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive portlet">
                                <table className="table">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Giáo viên yêu cầu đổi</th>
                                            <th scope="col">Lớp hiện tại</th>
                                            <th scope="col">Lớp yêu cầu đổi</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userElements}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default ChangeClass;
