import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IMyClassState, ICourseState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IMyClass, MyClassModificationStatus } from "../../store/models/myclass.interface";
import TextInput from "../../common/components/TextInput";
import { editMyClass, clearSelectedMyClass, setModificationState, addMyClass } from "../../store/actions/myclass.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, IMyClassFormState } from "../../common/types/Form.types";
import { ICourse } from "../../store/models/courses.interface";
import SelectInput from "../../common/components/Select";
import Popup from "reactjs-popup";

const Student: React.FC = () => {
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
        return listCourses.push(ele.name)
    })


    // const teachers: IUserState = useSelector((state: IStateType) => state.users);
    // const LessonList: string[] = [
    //     "Tiết 1 (06:00 - 06:50)",
    //     "Tiết 2 (07:00 - 07:50)",
    //     "Tiết 3 (08:00 - 08:50)",
    //     "Tiết 4 (09:00 - 09:50)",
    //     "Tiết 5 (10:00 - 10:50)",
    //     "Tiết 6 (11:00 - 11:50)",
    //     "Tiết 7 (12:00 - 12:50)",
    //     "Tiết 8 (13:00 - 13:50)",
    //     "Tiết 9 (14:00 - 14:50)",
    //     "Tiết 10 (15:00 - 15:50)",
    //     "Tiết 11 (16:00 - 16:50)",
    //     "Tiết 12 (17:00 - 17:50)",
    //     "Tiết 13 (18:00 - 18:50)",
    //     "Tiết 14 (19:00 - 19:50)",
    //     "Tiết 15 (20:00 - 20:50)",
    // ]

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

    const [popup, setPopup] = useState(false);

    function onSearch() {
        setPopup(true);
    }

    return (
        <Fragment>
            <div className="col-xl-7 col-lg-7">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green"> Đổi lớp</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={saveUser}>
                            <div className="form-group">
                                <button className="btn btn-success" onClick={() => onSearch()}>Tìm kiếm học viên</button>
                            </div>
                            <div className="form-group">
                                <TextInput id="input_name"
                                    value={formState.name.value}
                                    type="search"
                                    field="name"
                                    onChange={hasFormValueChanged}
                                    required={true}
                                    maxLength={20}
                                    label="Tên đăng nhập học viên"
                                    placeholder="" />
                            </div>
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

            <Popup
                className="popup-modal"
                open={popup}
                onClose={() => setPopup(false)}
                closeOnDocumentClick
            >
                <div className="popup-modal">
                    <div className="popup-title">
                        Tìm kiếm học viên
                    </div>
                    <div className="popup-content">
                        <input type="search" id="gsearch" name="gsearch" />
                    </div>
                </div>
            </Popup>
        </Fragment>
    )
};

export default Student;
