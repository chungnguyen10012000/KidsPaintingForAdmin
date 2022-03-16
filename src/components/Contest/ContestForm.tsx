import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IContestState, ILevelState, IMytypeState  } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IContest, ContestModificationStatus } from "../../store/models/contest.interface";
import TextInput from "../../common/components/TextInput";
import { editContest, clearSelectedContest, setModificationState, addContest } from "../../store/actions/contest.actions";
import { addNotification } from "../../store/actions/notifications.action";
import NumberInput from "../../common/components/NumberInput";
import { OnChangeModel, IContestFormState } from "../../common/types/Form.types";
import SelectInput from "../../common/components/Select";

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

const ContestForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const contests: IContestState | null = useSelector((state: IStateType) => state.contest);
  let contest: IContest | null = contests.selectedContest;
  const isCreate: boolean = (contests.modificationState === ContestModificationStatus.Create);
  
  if (!contest || isCreate) {
    contest = { id: 0, name: "", description: "", type: "", level: "", status: "", amount: 0, hasBeginDate: "", hasExpiryDate: ""};
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
    if (quill && contest && !isCreate) {
      quill.clipboard.dangerouslyPasteHTML(contest.description);
    }
  }, [quill, contest, isCreate]);


  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setTextHtml(quill.root.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill]);

  const listStatus = ['Còn hạn', 'Hết hạn']

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
    name: { error: "", value: contest.name },
    description: { error: "", value: contest.description },
    type: { error: "", value: contest.type },
    level: { error: "", value: contest.level },
    status: { error: "", value: contest.status },
    amount: { error: "", value: contest.amount },
    hasBeginDate: { error: "", value: contest.hasBeginDate },
    hasExpiryDate: { error: "", value: contest.hasExpiryDate },
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function saveUser(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }

    let saveUserFn: Function = (isCreate) ? addContest : editContest;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: IContestFormState, saveFn: Function): void {
    if (contest) {
      dispatch(saveFn({
        ...contest,
        name: formState.name.value,
        description: textHtml,
        type: formState.type.value,
        level:  formState.level.value,
        status:  formState.status.value,
        amount: formState.amount.value,
        hasBeginDate:  formState.hasBeginDate.value,
        hasExpiryDate: formState.hasExpiryDate.value,
      }));

      dispatch(addNotification("Cuộc thi", ` ${formState.name.value} chỉnh bởi bạn`));
      dispatch(clearSelectedContest());
      dispatch(setModificationState(ContestModificationStatus.None));
    }
  }

  function cancelForm(): void {
    dispatch(setModificationState(ContestModificationStatus.None));
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.amount.error 
      || formState.name.error || formState.type.error || formState.level.error || formState.status.error || formState.hasBeginDate.error || formState.hasExpiryDate.error
      || formState.level.error || !formState.name.value || !formState.type.value) as boolean;
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
                  label="Tên cuộc thi"
                  placeholder="Nhập tên cuộc thi" />
              </div>
              <div className="form-group">
                <div ref={quillRef} />
              </div>
              <div className="form-group">
                <SelectInput id="input_type"
                  field = "type"
                  value={formState.type.value}
                  onChange={hasFormValueChanged}
                  required={true}
                  label="Thể loại"
                  options={listMytypes}
                />
              </div>
              <div className="form-group">
                  <SelectInput
                    id="input_level"
                    field="level"
                    label="Mức độ"
                    options={listLevels}
                    required={true}
                    onChange={hasFormValueChanged}
                    value={formState.level.value}
                  />
              </div>
              <div className="form-group">
                  <SelectInput
                    id="input_status"
                    field="status"
                    label="Trạng thái"
                    options={listStatus}
                    required={true}
                    onChange={hasFormValueChanged}
                    value={formState.status.value}
                  />
              </div>
              <div className="form-group">
                  <NumberInput id="input_amount"
                    value={formState.amount.value}
                    field="amount"
                    onChange={hasFormValueChanged}
                    max={1000}
                    min={0}
                    label="Số lượng tối đa tham gia" />
              </div>
              <div className="form-group">
                <TextInput id="input_hasBeginDate"
                  field = "hasBeginDate"
                  type="date"
                  value={formState.hasBeginDate.value}
                  onChange={hasFormValueChanged}
                  required={false}
                  maxLength={100}
                  label="Thời gian bắt đầu"
                  placeholder="" />
              </div>
              <div className="form-group">
                <TextInput id="input_hasExpiryDate"
                  field = "hasExpiryDate"
                  type="date"
                  value={formState.hasExpiryDate.value}
                  onChange={hasFormValueChanged}
                  required={false}
                  maxLength={100}
                  label="Thời gian hết hạn"
                  placeholder="" />
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

export default ContestForm;
