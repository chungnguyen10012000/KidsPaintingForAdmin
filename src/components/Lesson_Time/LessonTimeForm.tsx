import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, ILessonTimeState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ILessonTime, LessonTimeModificationStatus } from "../../store/models/lesson_time.interface";
import TextInput from "../../common/components/TextInput";
import { editLessonTime, clearSelectedLessonTime, setModificationState, addLessonTime } from "../../store/actions/lesson_time/lesson_time.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, ILessonTimeFormState } from "../../common/types/Form.types";

const LessonTimeForm: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const lessonTimes: ILessonTimeState | null = useSelector((state: IStateType) => state.lessonTimes);
    let lessonTime: ILessonTime | null = lessonTimes.selectedLessonTime;
    const isCreate: boolean = (lessonTimes.modificationState === LessonTimeModificationStatus.Create);

    if (!lessonTime || isCreate) {
        lessonTime = { id: 1, start_time: "", end_time: ''};
    }

    const [formState, setFormState] = useState({
        start_time: { error: "", value: lessonTime.start_time },
        end_time: { error: "", value: lessonTime.end_time },
    });

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }

        let saveUserFn: Function = (isCreate) ? addLessonTime : editLessonTime;
        saveForm(formState, saveUserFn);
    }

    function saveForm(formState: ILessonTimeFormState, saveFn: Function): void {
        if (lessonTime) {
            dispatch(saveFn({
                ...lessonTime,
                start_time: formState.start_time.value,
                end_time: formState.end_time.value,
            }));

            dispatch(addNotification("Tiết ", `từ ${formState.start_time.value} đến ${formState.end_time.value} đã được thêm bởi bạn`));
            dispatch(clearSelectedLessonTime());
            dispatch(setModificationState(LessonTimeModificationStatus.None));
        }
    }

    function cancelForm(): void {
        dispatch(setModificationState(LessonTimeModificationStatus.None));
    }

    function getDisabledLessonTime(): string {
        let isError: boolean = isFormInvalid();
        console.log("go to disable")
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (formState.start_time.error || formState.end_time.error
            || !formState.start_time.value || !formState.end_time.value) as boolean;
    }

    return (
        <Fragment>
            <div className="col-xl-7 col-lg-7">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green"> {(isCreate ? "Tạo" : "Sửa")} thời gian tiết học</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={saveUser}>
                            <div className="form-group">
                                <TextInput id="input_start_time"
                                    value={formState.start_time.value}
                                    field="start_time"
                                    type="time"
                                    onChange={hasFormValueChanged}
                                    required={true}
                                    maxLength={20}
                                    label="Thời gian bắt đầu"
                                    placeholder="" />
                            </div>
                            <div className="form-group">
                                <TextInput id="input_end_time"
                                    value={formState.end_time.value}
                                    field="end_time"
                                    type="time"
                                    onChange={hasFormValueChanged}
                                    required={true}
                                    maxLength={20}
                                    label="Thời gian kết thúc"
                                    placeholder="" />
                            </div>
                            <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
                            <button type="submit" className={`btn btn-success left-margin ${getDisabledLessonTime()}`}>Lưu</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default LessonTimeForm;
