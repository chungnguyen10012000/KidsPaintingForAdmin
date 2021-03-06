import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, ISemesterState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ISemester, SemesterModificationStatus } from "../../store/models/semester.interface";
import TextInput from "../../common/components/TextInput";
import { editSemester, clearSelectedSemester, setModificationState, addSemester } from "../../store/actions/semester.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, ISemesterFormState } from "../../common/types/Form.types";
import NumberInput from "../../common/components/NumberInput";
import { postSemester } from "../../common/service/semester/postSemester";
import { putSemester } from "../../common/service/semester/putSemester";

const SemesterForm: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const semesters: ISemesterState | null = useSelector((state: IStateType) => state.semesters);
    let semester: ISemester | null = semesters.selectedSemester;
    const isCreate: boolean = (semesters.modificationState === SemesterModificationStatus.Create);

    if (!semester || isCreate) {
        semester = { id: 1, name: "", year: '', description: '', number: 1, start_time: '', end_time: '' };
    }

    const [formState, setFormState] = useState({
        name: { error: "", value: semester.name },
        year: { error: "", value: semester.year },
        description: { error: "", value: semester.description },
        number: { error: "", value: semester.number },
        start_time: { error: "", value: semester.start_time },
        end_time: { error: "", value: semester.end_time },
    });

    function hasFormValueChanged(model: OnChangeModel): void {
        setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    }

    function saveUser(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (isFormInvalid()) {
            return;
        }

        let saveUserFn: Function = (isCreate) ? addSemester : editSemester;
        saveForm(formState, saveUserFn);
    }

    function saveForm(formState: ISemesterFormState, saveFn: Function): void {
        if (semester) {
            if(saveFn === addSemester){
                dispatch(postSemester({
                    ...semester,
                    name: formState.name.value,
                    year: formState.year.value,
                    description: formState.description.value,
                    number: formState.number.value,
                    start_time: formState.start_time.value,
                    end_time: formState.end_time.value,
                }));
            }
            else {
                dispatch(putSemester(semester.id, {
                    ...semester,
                    name: formState.name.value,
                    year: formState.year.value,
                    description: formState.description.value,
                    number: formState.number.value,
                    start_time: formState.start_time.value,
                    end_time: formState.end_time.value,
                }));
            }
            

            dispatch(addNotification("H???c k?? ", `${formState.name.value} ???? ???????c th??m b???i b???n`));
            dispatch(clearSelectedSemester());
            dispatch(setModificationState(SemesterModificationStatus.None));
        }
    }

    function cancelForm(): void {
        dispatch(setModificationState(SemesterModificationStatus.None));
    }

    function getDisabledSemester(): string {
        let isError: boolean = isFormInvalid();
        console.log("go to disable")
        return isError ? "disabled" : "";
    }

    function isFormInvalid(): boolean {
        return (formState.name.error || formState.year.error
            || !formState.name.value || !formState.year.value) as boolean;
    }

    return (
        <Fragment>
            <div className="col-xl-7 col-lg-7">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green"> {(isCreate ? "T???o" : "S???a")} h???c k??</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={saveUser}>
                            <div className="form-group">
                                <TextInput id="input_name"
                                    value={formState.name.value}
                                    field="name"
                                    onChange={hasFormValueChanged}
                                    required={true}
                                    maxLength={20000}
                                    label="T??n"
                                    placeholder="" />
                            </div>
                            <div className="form-group">
                                <NumberInput id="input_number"
                                    value={formState.number.value}
                                    field="number"
                                    onChange={hasFormValueChanged}
                                    max={1000}
                                    min={0}
                                    label="K??" />
                            </div>
                            <div className="form-group">
                                <TextInput id="input_year"
                                    value={formState.year.value}
                                    field="year"
                                    onChange={hasFormValueChanged}
                                    required={true}
                                    maxLength={200}
                                    label="N??m h???c"
                                    placeholder="" />
                            </div>
                            <div className="form-group">
                                <TextInput id="input_description"
                                    value={formState.description.value}
                                    field="description"
                                    onChange={hasFormValueChanged}
                                    required={true}
                                    maxLength={2000}
                                    label="Mi??u t???"
                                    placeholder="" />
                            </div>
                            <div className="form-group">
                                <TextInput id="input_start_time"
                                    value={formState.start_time.value}
                                    field="start_time"
                                    type="date"
                                    onChange={hasFormValueChanged}
                                    required={true}
                                    maxLength={2000}
                                    label="Th???i gian b???t ?????u"
                                    placeholder="" />
                            </div>
                            <div className="form-group">
                                <TextInput id="input_end_time"
                                    value={formState.end_time.value}
                                    field="end_time"
                                    type="date"
                                    onChange={hasFormValueChanged}
                                    required={true}
                                    maxLength={2000}
                                    label="Th???i gian k???t th??c"
                                    placeholder="" />
                            </div>
                            <button className="btn btn-danger" onClick={() => cancelForm()}>H???y</button>
                            <button type="submit" className={`btn btn-success left-margin ${getDisabledSemester()}`}>L??u</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default SemesterForm;
