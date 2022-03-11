import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IExerciseState, ILevelState, IMytypeState  } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IExercise, ExerciseModificationStatus } from "../../store/models/exercise.interface";
import TextInput from "../../common/components/TextInput";
import { clearSelectedExercise, setModificationState, addExercise } from "../../store/actions/exercise.actions";
import { addNotification } from "../../store/actions/notifications.action";
import NumberInput from "../../common/components/NumberInput";
import { OnChangeModel, IExerciseFormState } from "../../common/types/Form.types";

import { ILevel } from "../../store/models/levels.interface";
import { IMytype } from "../../store/models/mytypes.interface";

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
  exercise = { id: 0, name: "", body: "", weight: 0, maxSubmit: 1};

  const levels: ILevelState = useSelector((state: IStateType) => state.levels);
  const listLevel: ILevel[] = levels.levels
  const listLevels: string[] = []
  listLevel.map((ele) => {
    return listLevels.push(ele.name)
  })

  const mytypes: IMytypeState = useSelector((state: IStateType) => state.mytypes);
  const listMytype: IMytype[] = mytypes.mytypes
  const listMytypes: string[] = []
  listMytype.map((ele) => {
    return listMytypes.push(ele.name)
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

    let saveUserFn: Function = addExercise;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: IExerciseFormState, saveFn: Function): void {
    if (exercise) {
      dispatch(saveFn({
        ...exercise,
        name: formState.name.value,
        body: formState.body.value,
        weight: formState.weight.value,
        maxSubmit:  formState.maxSubmit.value,
      }));

      dispatch(addNotification("Bài tập ", `Bài tập  ${formState.name.value} đã được thêm bỏi bạn`));
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
    return (formState.body.error || formState.maxSubmit.error
      || formState.name.error || formState.weight.error 
      || !formState.name.value || !formState.weight.value) as boolean;
}

  return (
    <Fragment>
      <div className="col-xl-12 col-lg-12">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green"> Tạo bài tập</h6>
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
                <TextInput id="input_body"
                field = "body"
                  value={formState.body.value}
                  onChange={hasFormValueChanged}
                  required={false}
                  maxLength={10000}
                  label="Miêu tả chi tiết bài tập"
                  placeholder="" />
              </div>
              <div className="form-group">
                <NumberInput id="input_weight"
                  field = "weight"
                  value={formState.weight.value}
                  onChange={hasFormValueChanged}
                  label="Tỉ lệ đánh giá"
                />
              </div>
              <div className="form-group">
                  <NumberInput id="input_maxSubmit"
                    value={formState.maxSubmit.value}
                    field="maxSubmit"
                    onChange={hasFormValueChanged}
                    max={1000}
                    min={0}
                    label="Số lượng tối đa lần nộp" />
              </div>
              <button className="btn btn-danger" onClick={() => cancelForm()}>Cancel</button>
              <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Save</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ExerciseForm;
