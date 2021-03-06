import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IMytypeState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IMytype, MytypeModificationStatus } from "../../store/models/mytypes.interface";
import TextInput from "../../common/components/TextInput";
import { editMytype, clearSelectedMytype, setModificationStateMytype, addMytype } from "../../store/actions/mytypes.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, IMytypeFormState } from "../../common/types/Form.types";
import { postArtType } from "../../common/service/art_type/postArtType";
import { putArtType } from "../../common/service/art_type/putArtType";

const TypeForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const mytypes: IMytypeState | null = useSelector((state: IStateType) => state.mytypes);
  let mytype: IMytype | null = mytypes.selectedMytype;
  const isCreate: boolean = (mytypes.modificationState === MytypeModificationStatus.Create);

  if (!mytype || isCreate) {
    mytype = { id: 0, name: "" };
  }

  const [formState, setFormState] = useState({
    name: { error: "", value: mytype.name },
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function saveUser(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }

    let saveUserFn: Function = (isCreate) ? addMytype : editMytype;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: IMytypeFormState, saveFn: Function): void {
    if (mytype) {
      if (saveFn === addMytype){
        dispatch(postArtType({
          ...mytype,
          name: formState.name.value,
        }));
      }
      else {
        dispatch(putArtType(mytype.id,{
          ...mytype,
          name: formState.name.value,
        }));
      }

      dispatch(addNotification("Th??? lo???i", `${formState.name.value} ???? ???????c th??m b???i b???n`));
      dispatch(clearSelectedMytype());
      dispatch(setModificationStateMytype(MytypeModificationStatus.None));
    }
  }

  function cancelForm(): void {
    dispatch(setModificationStateMytype(MytypeModificationStatus.None));
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
            <h6 className="m-0 font-weight-bold text-green"> {(isCreate ? "T???o" : "S???a")} th??? lo???i</h6>
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
                  label="T??n th??? lo???i"
                  placeholder="Nh???p t??n th??? lo???i" />
              </div>
              <button className="btn btn-danger" onClick={() => cancelForm()}>H???y</button>
              <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>L??u</button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
};

export default TypeForm;
