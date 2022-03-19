import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IExerciseState, ILevelState, IMytypeState  } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IExercise, ExerciseModificationStatus } from "../../store/models/exercise.interface";
import TextInput from "../../common/components/TextInput";
import { editExercise, clearSelectedExercise, setModificationState, addExercise } from "../../store/actions/exercise.actions";
import { addNotification } from "../../store/actions/notifications.action";
import NumberInput from "../../common/components/NumberInput";
import { OnChangeModel, IExerciseFormState } from "../../common/types/Form.types";

import { ILevel } from "../../store/models/levels.interface";
import { IMytype } from "../../store/models/mytypes.interface";

import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';



export type levelListProps = {
  onSelect?: (level: ILevel) => void;
  children?: React.ReactNode;
};

export type mytypeListProps = {
  onSelect?: (mytype: IMytype) => void;
  children?: React.ReactNode;
};

const ExerciseForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const exercises: IExerciseState | null = useSelector((state: IStateType) => state.exercises);
  let exercise: IExercise | null = exercises.selectedExercise;
  const isCreate: boolean = (exercises.modificationState === ExerciseModificationStatus.Create);
  
  if (!exercise || isCreate) {
    exercise = { id: 0, name: "", body: "<p></p>", weight: 0, maxSubmit: 1};
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
    if (quill && exercise && !isCreate) {
      quill.clipboard.dangerouslyPasteHTML(exercise.body);
    }
  }, [quill, exercise, isCreate]);


  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setTextHtml(quill.root.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill]);

  //console.log(textHtml)

  const levels: ILevelState = useSelector((state: IStateType) => state.levels);
  const listLevel: ILevel[] = levels.levels
  const listLevels: string[] = []
  listLevel.map((ele) => {
    return listLevels.push(ele.levelName)
  })

  const mytypes: IMytypeState = useSelector((state: IStateType) => state.mytypes);
  const listMytype: IMytype[] = mytypes.mytypes
  const listMytypes: string[] = []
  listMytype.map((ele) => {
    return listMytypes.push(ele.typeName)
  })

  const [formState, setFormState] = useState({
    name: { error: "", value: exercise.name },
    body: { error: "", value: exercise.body },
    weight: { error: "", value: exercise.weight },
    maxSubmit: { error: "", value: exercise.maxSubmit },
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function saveUser(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }

    let saveUserFn: Function = (isCreate) ? addExercise : editExercise;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: IExerciseFormState, saveFn: Function): void {
    if (exercise) {
      dispatch(saveFn({
        ...exercise,
        name: formState.name.value,
        body: textHtml,
        weight: formState.weight.value,
        maxSubmit:  formState.maxSubmit.value,
      }));

      dispatch(addNotification("Bài tập", ` ${formState.name.value} sửa bởi bạn`));
      dispatch(clearSelectedExercise());
      dispatch(setModificationState(ExerciseModificationStatus.None));
    }
  }

  function cancelForm(): void {
    dispatch(setModificationState(ExerciseModificationStatus.None));
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return ( formState.weight.error
      || formState.name.error || formState.maxSubmit.error 
       || !formState.maxSubmit.value || !formState.weight.value) as boolean;
}

  return (
    <Fragment>
      <div className="col-xl-7 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green"> {(isCreate ? "Tạo" : "Sửa")} cuộc thi</h6>
          </div>
          <div className="card-body">
            <form onSubmit={saveUser}>
              <div className="form-group">
                <TextInput id="input_name"
                  value={formState.name.value}
                  field="name"
                  onChange={hasFormValueChanged}
                  required={true}
                  maxLength={10000}
                  label="Tên bài tập"
                  placeholder="Nhập tên bài tập" />
              </div>
              <div className="form-group">
                <div ref={quillRef} />
              </div>
              <div className="form-group">
                  <NumberInput id="input_weight"
                    value={formState.weight.value}
                    field="weight"
                    onChange={hasFormValueChanged}
                    max={1000}
                    min={0}
                    label="Tỉ lệ đánh giá" />
              </div>
              <div className="form-group">
                  <NumberInput id="input_maxSubmit"
                    value={formState.maxSubmit.value}
                    field="maxSubmit"
                    onChange={hasFormValueChanged}
                    max={1000}
                    min={0}
                    label="Tỉ lệ đánh giá" />
              </div>
              <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
              <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Lưu</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ExerciseForm;
