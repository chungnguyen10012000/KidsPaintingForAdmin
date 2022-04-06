import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, ICourseState, ICourseSemesterState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ICourseSemester, CourseSemesterModificationStatus } from "../../store/models/course_for_semester.interface";
import TextInput from "../../common/components/TextInput";
import { editCourseSemester, clearSelectedCourseSemester, setModificationStateSemester, addCourseSemester } from "../../store/actions/course_for_semester.actions";
import { addNotification } from "../../store/actions/notifications.action";
import SelectInput from "../../common/components/Select";
import { OnChangeModel, ICourseSemesterFormState } from "../../common/types/Form.types";
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

const LessonList: string[] = [
    "Thứ 2-4-6", 
    "Thứ 3-5-7", 
    ]

const CourseSemesterForm: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const courses: ICourseState | null = useSelector((state: IStateType) => state.courses);
    const listCourses: string[] = []
    courses.courses.map((ele) => {
        return listCourses.push(ele.courseName)
    })

    const courseSemesters: ICourseSemesterState | null = useSelector((state: IStateType) => state.courseSemeters);

    let courseSemester: ICourseSemester | null = courseSemesters.selectedCourseSemester;
    const isCreate: boolean = (courseSemesters.modificationState === CourseSemesterModificationStatus.Create);

    if (!courseSemester || isCreate) {
        courseSemester = { courseId: 0, courseTemplate: "", time: 'Thứ 2-4-6', timeLesson: "" };
    }

    const [formState, setFormState] = useState({
        courseTemplate: { error: "", value: courseSemester.courseTemplate },
        time: { error: "", value: courseSemester.time },
        timeLesson: { error: "", value: courseSemester.timeLesson },
    });

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }

        let saveUserFn: Function = (isCreate) ? addCourseSemester : editCourseSemester;
        saveForm(formState, saveUserFn);
    }

    function saveForm(formState: ICourseSemesterFormState, saveFn: Function): void {
        if (courseSemester) {
            dispatch(saveFn({
                ...courseSemester,
                courseTemplate: formState.courseTemplate.value,
                time: formState.time.value,
                timeLesson: formState.timeLesson.value,
            }));

            dispatch(addNotification("Khóa học theo kỳ", `Đã được thêm bởi bạn`));
            dispatch(clearSelectedCourseSemester());
            dispatch(setModificationStateSemester(CourseSemesterModificationStatus.None));
        }
    }

    function cancelForm(): void {
        dispatch(setModificationStateSemester(CourseSemesterModificationStatus.None));
    }

    function getDisabledClass(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (formState.courseTemplate.error || !formState.courseTemplate.value) as boolean;
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
                                <SelectInput id="input_courseTemplate"
                                    field="courseTemplate"
                                    value={formState.courseTemplate.value}
                                    onChange={hasFormValueChanged}
                                    required={true}
                                    label="Khóa học chính"
                                    options={listCourses}
                                />
                            </div>
                            <div className="form-group">
                                <SelectInput
                                    id="input_time"
                                    field="time"
                                    label="Thời gian học"
                                    options={LessonList}
                                    required={true}
                                    onChange={hasFormValueChanged}
                                    value={formState.time.value}
                                />
                            </div>
                            <div className="form-group">
                                <TextInput id="input_timeLesson"
                                    field="timeLesson"
                                    type="date"
                                    value={formState.timeLesson.value}
                                    onChange={hasFormValueChanged}
                                    required={false}
                                    maxLength={100}
                                    label="Thời gian bắt đầu"
                                    placeholder="" />
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

export default CourseSemesterForm;
