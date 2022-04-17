import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, ILevelState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ILevel, LevelModificationStatus } from "../../store/models/levels.interface";
import TextInput from "../../common/components/TextInput";
import { editLevel, clearSelectedLevel, setModificationStateLevel, addLevel } from "../../store/actions/art_level/levels.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, ILevelFormState } from "../../common/types/Form.types";
import { postLevel } from "../../store/actions/art_level/postLevel";
import { putLevel } from "../../store/actions/art_level/putLevel";

const LevelForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const levels: ILevelState | null = useSelector((state: IStateType) => state.levels);
  let level: ILevel | null = levels.selectedLevel;
  const isCreate: boolean = (levels.modificationState === LevelModificationStatus.Create);
  
  if (!level || isCreate) {
  level = { id: 0, name: ""};
  }

  const [formState, setFormState] = useState({
    name: { error: "", value: level.name },
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function saveUser(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }

    let saveUserFn: Function = (isCreate) ? addLevel : editLevel;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: ILevelFormState, saveFn: Function): void {
    if (level) {
      if (saveFn == addLevel){
        dispatch(postLevel({
          ...level,
          name: formState.name.value,
        }));
      }
      else {
        dispatch(putLevel(level.id, {
          ...level,
          name: formState.name.value,
        }));
      }

      dispatch(addNotification("Mức độ", `${formState.name.value} đã được lưu bởi bạn`));
      dispatch(clearSelectedLevel());
      dispatch(setModificationStateLevel(LevelModificationStatus.None));
    }
  }

  function cancelForm(): void {
    dispatch(setModificationStateLevel(LevelModificationStatus.None));
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.name.error || !formState.name.value) as boolean;
  }

  return (
    <Fragment>
      <div className="col-xl-7 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green"> {(isCreate ? "Tạo" : "Sửa")} mức độ</h6>
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
                  label="Tên mức độ"
                  placeholder="Nhập tên mức độ" />
              </div>
              <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
              <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Lưu</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
};

export default LevelForm;
