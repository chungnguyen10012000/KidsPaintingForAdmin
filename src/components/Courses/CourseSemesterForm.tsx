import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, ICourseState, ICourseSemesterState, IScheduleState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ICourseSemester, CourseSemesterModificationStatus } from "../../store/models/course_for_semester.interface";
import { editCourseSemester, clearSelectedCourseSemester, setModificationStateSemester, addCourseSemester } from "../../store/actions/course_semester/course_for_semester.actions";
import { addNotification } from "../../store/actions/notifications.action";
import SelectInput from "../../common/components/SelectInput";
import { OnChangeModel, ICourseSemesterFormState } from "../../common/types/Form.types";
import { ILevel } from "../../store/models/levels.interface";
import { IMytype } from "../../store/models/mytypes.interface";
import { postCourseSemester } from "../../store/actions/course_semester/postCourseSemester";
import { putCourseSemester } from "../../store/actions/course_semester/putCourseSemester";

export type levelListProps = {
    onSelect?: (level: ILevel) => void;
    children?: React.ReactNode;
};

export type mytypeListProps = {
    onSelect?: (mytype: IMytype) => void;
    children?: React.ReactNode;
};

type Options = {
    name: string;
    value: any;
}


const CourseSemesterForm: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const courses: ICourseState | null = useSelector((state: IStateType) => state.courses);
    const schedules: IScheduleState | null = useSelector((state: IStateType) => state.schedules);

    const schedules2: IScheduleState | null = useSelector((state: IStateType) => state.schedules);
    let listSchedule: Options[] = [];
    schedules2.schedules.map(ele => {
        let item: Options = {"name": ele.name, "value": ele.id}
        return listSchedule.push(item)
    })

    let listCourses: Options[] = [];
    courses.courses.map(ele => {
        let item: Options = {"name": ele.name, "value": ele.id}
        return listCourses.push(item)
    })

    const courseSemesters: ICourseSemesterState | null = useSelector((state: IStateType) => state.courseSemeters);

    let courseSemester: ICourseSemester | null = courseSemesters.selectedCourseSemester;
    const isCreate: boolean = (courseSemesters.modificationState === CourseSemesterModificationStatus.Create);

    if (!courseSemester || isCreate) {
        courseSemester = { id: 0, course_id: 1, schedule_id: 1};
    }

    const [formState, setFormState] = useState({
        course_id: { error: "", value: courseSemester.course_id },
        schedule_id: { error: "", value: courseSemester.schedule_id },
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
            if (saveFn == addCourseSemester){
                dispatch(postCourseSemester({
                    ...courseSemester,
                    course_id: formState.course_id.value,
                    schedule_id: formState.schedule_id.value,
                }));
            }
            else {
                dispatch(putCourseSemester(courseSemester.id, {
                    ...courseSemester,
                    course_id: formState.course_id.value,
                    schedule_id: formState.schedule_id.value,
                }));
            }


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
        return (formState.course_id.error || !formState.course_id.value) as boolean;
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
                                <SelectInput id="input_course_id"
                                    field="course_id"
                                    value={formState.course_id.value}
                                    onChange={hasFormValueChanged}
                                    required={true}
                                    label="Khóa học chính"
                                    options={listCourses}
                                />
                            </div>
                            <div className="form-group">
                                <SelectInput
                                    id="input_schedule_id"
                                    field="schedule_id"
                                    label="Lịch học"
                                    options={listSchedule}
                                    required={true}
                                    onChange={hasFormValueChanged}
                                    value={formState.schedule_id.value}
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

export default CourseSemesterForm;
