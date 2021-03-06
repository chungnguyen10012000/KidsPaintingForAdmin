import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IMyClassState, ICourseState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IMyClass, MyClassModificationStatus } from "../../store/models/myclass.interface";
import { editMyClass, clearSelectedMyClass, setModificationState, addMyClass } from "../../store/actions/myclass.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, IMyClassFormState } from "../../common/types/Form.types";
import { ICourse } from "../../store/models/courses.interface";
import TextInput from "../../common/components/TextInput";

const SendNotification: React.FC = () => {
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

            dispatch(addNotification("L???p ", `${formState.name.value} ???? ???????c th??m b???i b???n`));
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

    return (
        <Fragment>
            <div className="col-xl-12 col-lg-12">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green"> G???i th???ng b??o cho l???p</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={saveUser}>
                            <div className="form-group">
                            <TextInput id="input_name"
                                value={formState.name.value}
                                field="name"
                                onChange={hasFormValueChanged}
                                required={true}
                                maxLength={100}
                                label="T??n"
                                placeholder="" />
                            </div>
                            <div className="form-group">
                            <TextInput id="input_name"
                                value={formState.name.value}
                                field="name"
                                onChange={hasFormValueChanged}
                                required={true}
                                maxLength={100}
                                label="N???i dung"
                                placeholder="Nh???p t??n kh??a h???c" />
                            </div>
                            <button className="btn btn-danger" onClick={() => cancelForm()}>H???y</button>
                            <button type="submit" className={`btn btn-success left-margin ${getDisabledMyClass()}`}>L??u</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default SendNotification;
