import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, ICourseForYearState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ICourseForYear, CourseForYearModificationStatus } from "../../store/models/courseForYear.interface";
import TextInput from "../../common/components/TextInput";
import { editCourseForYear, clearSelectedCourseForYear, setModificationStateCourseForYear, addCourseForYear } from "../../store/actions/courseForYear.actions";
import { addNotification } from "../../store/actions/notifications.action";
import SelectInput from "../../common/components/Select";
import { OnChangeModel, ICourseForYearFormState } from "../../common/types/Form.types";
import { ILevel } from "../../store/models/levels.interface";
import { IMytype } from "../../store/models/mytypes.interface";


export type levelListProps = {
    onSelect?: (level: ILevel) => void;
    children?: React.ReactNode;
};

export type mytypeListProps = {
    onSelect?: (mytype: IMytype) => void;
    children?: React.ReactNode;
};

const CoursesForYearForm: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const courses: ICourseForYearState | null = useSelector((state: IStateType) => state.courseForYear);
    let course: ICourseForYear | null = courses.selectedCourseForYear;
    const isCreate: boolean = (courses.modificationState === CourseForYearModificationStatus.Create);

    if (!course || isCreate) {
        course = { courseId: 0, courseName: "", semester: "", time: 'Thứ 2-4-6' };
    }

    const [formState, setFormState] = useState({
        courseName: { error: "", value: course.courseName },
        semester: { error: "", value: course.semester},
        time: { error: "", value: course.time },
    });

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }

        let saveUserFn: Function = (isCreate) ? addCourseForYear : editCourseForYear;
        saveForm(formState, saveUserFn);
    }

    function saveForm(formState: ICourseForYearFormState, saveFn: Function): void {
        if (course) {
            dispatch(saveFn({
                ...course,
                courseName: formState.courseName.value,
                semester: formState.semester.value,
                time: formState.time.value,
            }));

            dispatch(addNotification("Khóa học theo kì", `${formState.courseName.value} đã được thêm bởi bạn`));
            dispatch(clearSelectedCourseForYear());
            dispatch(setModificationStateCourseForYear(CourseForYearModificationStatus.None));
        }
    }

    function cancelForm(): void {
        dispatch(setModificationStateCourseForYear(CourseForYearModificationStatus.None));
    }

    function getDisabledClass(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return ( formState.courseName.error || !formState.courseName.value) as boolean;
    }

    return (
        <Fragment>
            <div className="col-xl-7 col-lg-7">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green"> {(isCreate ? "Tạo" : "Sửa")} khóa học</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={saveUser}>
                            <div className="form-group">
                                <TextInput id="input_courseName"
                                    value={formState.courseName.value}
                                    field="courseName"
                                    onChange={hasFormValueChanged}
                                    required={true}
                                    maxLength={100}
                                    label="Tên khóa học"
                                    placeholder="Nhập tên khóa học" />
                            </div>
                            <div className="form-group">
                                <SelectInput id="input_semester"
                                    field="semester"
                                    value={formState.semester.value}
                                    onChange={hasFormValueChanged}
                                    required={true}
                                    label="Học kì"
                                    options={["Kì 1", "Kì 2", "Kì hè"]}
                                />
                            </div>
                            <div className="form-group">
                                <SelectInput id="input_time"
                                    field="time"
                                    value={formState.time.value}
                                    onChange={hasFormValueChanged}
                                    required={true}
                                    label="Thời gian"
                                    options={["Thứ 2-4-6", "Thứ 3-5-7"]}
                                />
                            </div>
                            <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
                            <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Lưu</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default CoursesForYearForm;
