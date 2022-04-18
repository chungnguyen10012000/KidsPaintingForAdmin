import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IScheduleItemState, ILessonTimeState, IScheduleState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IScheduleItem, ScheduleItemModificationStatus } from "../../store/models/schedule_item.interface";
import { editScheduleItem, clearSelectedScheduleItem, setModificationStateItem, addScheduleItem } from "../../store/actions/schedule/schedule_item.actions";
import { addNotification } from "../../store/actions/notifications.action";
import NumberInput from "../../common/components/NumberInput";
import { OnChangeModel, IScheduleItemFormState } from "../../common/types/Form.types";
import SelectInput from "../../common/components/SelectInput";
import { postScheduleItem } from "../../store/actions/schedule/postScheduleItem";
import { putScheduleItem } from "../../store/actions/schedule/putScheduleItem";

type Options = {
    name: string;
    value: any;
}

const CalendarItemForm: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const schedules: IScheduleItemState | null = useSelector((state: IStateType) => state.scheduleItems);
    const schedules2: IScheduleState | null = useSelector((state: IStateType) => state.schedules);
    const lessonTimes: ILessonTimeState = useSelector((state: IStateType) => state.lessonTimes);

    let listSchedule: Options[] = [];
    schedules2.schedules.map(ele => {
        let item: Options = {"name": ele.name, "value": ele.id}
        return listSchedule.push(item)
    })

    let listLessonTime: Options[] = [];
    lessonTimes.lessonTimes.map(ele => {
        let item: Options = {"name":ele.start_time + " => " + ele.end_time, "value": ele.id }
        return listLessonTime.push(item)
    })

    let schedule: IScheduleItem | null = schedules.selectedScheduleItem;
    const isCreate: boolean = (schedules.modificationState === ScheduleItemModificationStatus.Create);

    if (!schedule || isCreate) {
        schedule = { id: 1, schedule_id: 1, lesson_time: 1, date_of_week: 1 };
    }

    const [formState, setFormState] = useState({
        schedule_id: { error: "", value: schedule.schedule_id },
        lesson_time: { error: "", value: schedule.lesson_time },
        date_of_week: { error: "", value: schedule.date_of_week },
    });

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }

        let saveUserFn: Function = (isCreate) ? addScheduleItem : editScheduleItem;
        saveForm(formState, saveUserFn);
    }

    function saveForm(formState: IScheduleItemFormState, saveFn: Function): void {
        if (schedule) {
            if (saveFn === addScheduleItem){
                dispatch(postScheduleItem({
                    ...schedule,
                    lesson_time: formState.lesson_time.value,
                    date_of_week: formState.date_of_week.value,
                }));
            }
            else {
                dispatch(putScheduleItem(schedule.id, {
                    ...schedule,
                    lesson_time: formState.lesson_time.value,
                    date_of_week: formState.date_of_week.value,
                }));
            }


            dispatch(addNotification("Lịch học ", ` đã được thêm bởi bạn`));
            dispatch(clearSelectedScheduleItem());
            dispatch(setModificationStateItem(ScheduleItemModificationStatus.None));
        }
    }

    function cancelForm(): void {
        dispatch(setModificationStateItem(ScheduleItemModificationStatus.None));
    }

    function getDisabledScheduleItem(): string {
        let isError: boolean = isFormInvalid();
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        console.log("id: ",formState.schedule_id.value)
        return (formState.lesson_time.error || formState.date_of_week.error
            || !formState.lesson_time.value || !formState.date_of_week.value) as boolean;
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
                                <SelectInput
                                    id="input_schedule_id"
                                    field="schedule_id"
                                    label="Thuộc lịch"
                                    options={listSchedule}
                                    required={true}
                                    onChange={hasFormValueChanged}
                                    value={formState.schedule_id.value}
                                />
                            </div>
                            <div className="form-group">
                                <SelectInput
                                    id="input_lesson_time"
                                    field="lesson_time"
                                    label="Thời gian"
                                    options={listLessonTime}
                                    required={true}
                                    onChange={hasFormValueChanged}
                                    value={formState.lesson_time.value}
                                />
                            </div>
                            <div className="form-group">
                                <NumberInput id="input_date_of_week"
                                    value={formState.date_of_week.value}
                                    field="date_of_week"
                                    onChange={hasFormValueChanged}
                                    label="Ngày thứ (Trong tuần)"
                                />
                            </div>
                            <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
                            <button type="submit" className={`btn btn-success left-margin ${getDisabledScheduleItem()}`}>Lưu</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default CalendarItemForm;
