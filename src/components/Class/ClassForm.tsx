import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IClassState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IClass, ClassModificationStatus } from "../../store/models/class.interface";
import TextInput from "../../common/components/TextInput";
import { editClass, clearSelectedClass, setModificationState, addClass } from "../../store/actions/class.actions";
import { addNotification } from "../../store/actions/notifications.action";
import NumberInput from "../../common/components/NumberInput";
import { OnChangeModel, IClassFormState } from "../../common/types/Form.types";

const ClassForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const myClass: IClassState | null = useSelector((state: IStateType) => state.class);
  let _class: IClass | null = myClass.selectedClass;
  const isCreate: boolean = (myClass.modificationState === ClassModificationStatus.Create);
  
  if (!_class || isCreate) {
    _class = { id: 0, name: "", course: 1, teacher_id: 1, amount: 0};
  }

  const [formState, setFormState] = useState({
    name: { error: "", value: _class.name },
    course: { error: "", value: _class.course },
    teacher_id: { error: "", value: _class.teacher_id },
    amount: { error: "", value: _class.amount },
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function saveUser(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }

    let saveUserFn: Function = (isCreate) ? addClass : editClass;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: IClassFormState, saveFn: Function): void {
    if (_class) {
      dispatch(saveFn({
        ..._class,
        name: formState.name.value,
        course: formState.course.value,
        teacher_id: formState.teacher_id.value,
        amount: formState.amount.value,
      }));

      dispatch(addNotification("Lớp ", `${formState.name.value} đã được thêm bởi bạn`));
      dispatch(clearSelectedClass());
      dispatch(setModificationState(ClassModificationStatus.None));
    }
  }

  function cancelForm(): void {
    dispatch(setModificationState(ClassModificationStatus.None));
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.amount.error || formState.name.error
      || formState.teacher_id.error ||  formState.course.error 
      || !formState.name.value || !formState.course.value) as boolean;
}

  return (
    <Fragment>
      <div className="col-xl-7 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green"> {(isCreate ? "Tạo" : "Sửa")} lớp</h6>
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
                  label="Tên lớp học"
                  placeholder="Nhập tên lớp học" />
              </div>
              <div className="form-group">
                <NumberInput id="input_course"
                  field = "course"
                  value={formState.course.value}
                  onChange={hasFormValueChanged}
                  label="Thuộc khóa học (Nhập ID)"
                />
              </div>
              <div className="form-group">
                <NumberInput id="input_teacher_id"
                  field = "teacher_id"
                  value={formState.teacher_id.value}
                  onChange={hasFormValueChanged}
                  label="Giáo viên (Nhập ID)"
                />
              </div>
              <div className="form-group">
                <NumberInput id="input_amount"
                  field = "amount"
                  value={formState.amount.value}
                  onChange={hasFormValueChanged}
                  label="Nhập số lượng tối đa học sinh"
                />
              </div>
              <button className="btn btn-danger" onClick={() => cancelForm()}>Cancel</button>
              <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Save</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
};

export default ClassForm;
