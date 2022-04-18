import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IScheduleState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ISchedule, ScheduleModificationStatus } from "../../store/models/schedule.interface";
import TextInput from "../../common/components/TextInput";
import { editSchedule, clearSelectedSchedule, setModificationState, addSchedule } from "../../store/actions/schedule/schedule.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, IScheduleFormState } from "../../common/types/Form.types";
import { postSchedule } from "../../store/actions/schedule/postSchedule";
import { putSchedule } from "../../store/actions/schedule/putSchedule";

const CalendarForm: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const schedules: IScheduleState | null = useSelector((state: IStateType) => state.schedules);
    let schedule: ISchedule | null = schedules.selectedSchedule;
    const isCreate: boolean = (schedules.modificationState === ScheduleModificationStatus.Create);

    if (!schedule || isCreate) {
        schedule = { id: 1, creator_id: "", description: "",  name: ""};
    }

    const [formState, setFormState] = useState({
        name: { error: "", value: schedule.name },
        description: { error: "", value: schedule.description },
    });

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }

        let saveUserFn: Function = (isCreate) ? addSchedule : editSchedule;
        saveForm(formState, saveUserFn);
    }

    function saveForm(formState: IScheduleFormState, saveFn: Function): void {
        if (schedule) {
            if (saveFn === addSchedule) {
                dispatch(postSchedule({
                    ...schedule,
                    name: formState.name.value,
                    description: formState.description.value,
                }));
            }
            else {
                dispatch(putSchedule(schedule.id, {
                    ...schedule,
                    name: formState.name.value,
                    description: formState.description.value,
                }));
            }


            dispatch(addNotification("Lịch học ", `${formState.name.value} đã được thêm bởi bạn`));
            dispatch(clearSelectedSchedule());
            dispatch(setModificationState(ScheduleModificationStatus.None));
        }
    }

    function cancelForm(): void {
        dispatch(setModificationState(ScheduleModificationStatus.None));
    }

    function getDisabledSchedule(): string {
        let isError: boolean = isFormInvalid();
        console.log("go to disable")
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (formState.name.error || formState.description.error
            || !formState.name.value || !formState.description.value) as boolean;
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
                                <TextInput id="input_name"
                                    value={formState.name.value}
                                    field="name"
                                    onChange={hasFormValueChanged}
                                    required={true}
                                    maxLength={2000}
                                    label="Tên"
                                    placeholder="" />
                            </div>
                            <div className="form-group">
                                <TextInput id="input_description"
                                    value={formState.description.value}
                                    field="description"
                                    onChange={hasFormValueChanged}
                                    required={true}
                                    maxLength={2000}
                                    label="Miêu tả"
                                    placeholder="" />
                            </div>
                            <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
                            <button type="submit" className={`btn btn-success left-margin ${getDisabledSchedule()}`}>Lưu</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default CalendarForm;
