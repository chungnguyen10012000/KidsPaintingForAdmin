import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, ISessonState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ISesson, SessonModificationStatus } from "../../store/models/sesson.interface";
import TextInput from "../../common/components/TextInput";
import { editSesson, clearSelectedSesson, setModificationState, addSesson } from "../../store/actions/sesson.action";
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, ISessonFormState } from "../../common/types/Form.types";
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';

const SessonForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const sesson1: ISessonState | null = useSelector((state: IStateType) => state.sessons);
  let sesson: ISesson | null = sesson1.selectedSesson;
  const isCreate: boolean = (sesson1.modificationState === SessonModificationStatus.Create);
  
  if (!sesson || isCreate) {
    sesson = { id: 0, name: "", description: "", startTime: "0:00", endTime: '0:00', currentDay: '0-0-0'};
  }

  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} }
  });

  if (Quill && !quill) {
    // const BlotFormatter = require('quill-blot-formatter');
    Quill.register('modules/blotFormatter', BlotFormatter);
  }

  let [textHtml, setTextHtml] = useState<string>('')

  React.useEffect(() => {
    if (quill && sesson && !isCreate) {
      quill.clipboard.dangerouslyPasteHTML(sesson.description);
    }
  }, [quill, sesson, isCreate]);


  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setTextHtml(quill.root.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill]);

  const [formState, setFormState] = useState({
    name: { error: "", value: sesson.name },
    description: { error: "", value: sesson.description },
    startTime: { error: "", value: sesson.startTime },
    endTime: { error: "", value: sesson.endTime },
    currentDay: { error: "", value: sesson.currentDay },
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function saveUser(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }

    let saveUserFn: Function = (isCreate) ? addSesson : editSesson;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: ISessonFormState, saveFn: Function): void {
    if (sesson) {
      dispatch(saveFn({
        ...sesson,
        name: formState.name.value,
        description: textHtml,
        startTime: formState.startTime.value,
        endTime: formState.endTime.value,
        currentDay: formState.currentDay.value,
      }));

      dispatch(addNotification("Buổi ", `${formState.name.value} đã được thêm bởi bạn`));
      dispatch(clearSelectedSesson());
      dispatch(setModificationState(SessonModificationStatus.None));
    }
  }

  function cancelForm(): void {
    dispatch(setModificationState(SessonModificationStatus.None));
  }

  function getDisabledSesson(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.name.error
      || formState.startTime.error 
      || !formState.name.value) as boolean;
}

  return (
    <Fragment>
      <div className="col-xl-7 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green"> {(isCreate ? "Tạo" : "Sửa")} buổi học</h6>
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
                  label="Tên buổi học"
                  placeholder="" />
              </div>
              <div className="form-group">
                <div ref={quillRef} />
              </div>
              <div className="form-group">
                <TextInput id="input_startTime"
                  value={formState.startTime.value}
                  field="startTime"
                  type="time"
                  onChange={hasFormValueChanged}
                  required={true}
                  maxLength={2000}
                  label="Thời gian học"
                  placeholder="" />
              </div>
              <div className="form-group">
                <TextInput id="input_endTime"
                  value={formState.endTime.value}
                  field="endTime"
                  type="time"
                  onChange={hasFormValueChanged}
                  required={true}
                  maxLength={2000}
                  label="Thời gian kết thúc"
                  placeholder="" />
              </div>
              <div className="form-group">
                <TextInput id="input_currentDay"
                  value={formState.currentDay.value}
                  field="currentDay"
                  type="date"
                  onChange={hasFormValueChanged}
                  required={true}
                  maxLength={2000}
                  label="Ngày học"
                  placeholder="" />
              </div>
              <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
              <button type="submit" className={`btn btn-success left-margin ${getDisabledSesson()}`}>Lưu</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
};

export default SessonForm;
