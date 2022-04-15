import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, ISemesterState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ISemester, SemesterModificationStatus } from "../../store/models/semester.interface";
import TextInput from "../../common/components/TextInput";
import { editSemester, clearSelectedSemester, setModificationState, addSemester } from "../../store/actions/semester/semester.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, ISemesterFormState } from "../../common/types/Form.types";

const SemesterForm: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const semesters: ISemesterState | null = useSelector((state: IStateType) => state.semesters);
    let semester: ISemester | null = semesters.selectedSemester;
    const isCreate: boolean = (semesters.modificationState === SemesterModificationStatus.Create);

    if (!semester || isCreate) {
        semester = { id: 1, name: "", year: '', description: ''};
    }

    const [formState, setFormState] = useState({
        name: { error: "", value: semester.name },
        year: { error: "", value: semester.year },
        description: { error: "", value: semester.description },
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
            dispatch(saveFn({
                ...semester,
                name: formState.name.value,
                year: formState.year.value,
                description: formState.description.value,
            }));

            dispatch(addNotification("Học kì ", `${formState.name.value} đã được thêm bởi bạn`));
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
                                    maxLength={20}
                                    label="Tên"
                                    placeholder="" />
                            </div>
                            <div className="form-group">
                                <TextInput id="input_year"
                                    value={formState.year.value}
                                    field="year"
                                    onChange={hasFormValueChanged}
                                    required={true}
                                    maxLength={20}
                                    label="Năm học"
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
                            <button type="submit" className={`btn btn-success left-margin ${getDisabledSemester()}`}>Lưu</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default SemesterForm;
