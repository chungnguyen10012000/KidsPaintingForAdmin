import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IContestState, ILevelState, IMytypeState  } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IContest, ContestModificationStatus } from "../../store/models/contest.interface";
import TextInput from "../../common/components/TextInput";
import { editContest, clearSelectedContest, setModificationState, addContest } from "../../store/actions/contest.actions";
import { addNotification } from "../../store/actions/notifications.action";
import NumberInput from "../../common/components/NumberInput";
import { OnChangeModel, IContestFormState } from "../../common/types/Form.types";
import SelectInput from "../../common/components/SelectInput";

import { ILevel } from "../../store/models/levels.interface";
import { IMytype } from "../../store/models/mytypes.interface";

import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import { postContest } from "../../common/service/contest/postContest";
import { putContest } from "../../common/service/contest/putContest";
import { useHistory, useParams } from "react-router-dom";
import Popup from "reactjs-popup";

export type levelListProps = {
  onSelect?: (level: ILevel) => void;
  children?: React.ReactNode;
};

type Options = {
  name: string;
  value: any;
}

type role = {
  id: string;
};

export type mytypeListProps = {
  onSelect?: (mytype: IMytype) => void;
  children?: React.ReactNode;
};

const ContestForm: React.FC = () => {

  let history = useHistory();
  const { id } = useParams<role>()

  const [popup, setPopup] = useState(false);
  
  const dispatch: Dispatch<any> = useDispatch();
  const contests: IContestState | null = useSelector((state: IStateType) => state.contest);
  let contest: IContest | null = contests.selectedContest;
  const isCreate: boolean = (contests.modificationState === ContestModificationStatus.Create);
  
  if (!contest || isCreate) {
    contest = { id: 0, name: "", image_url: "", description: "", art_level_id: 0, art_type_id: 0, is_enabled: false, max_participant: 0, start_time: "", end_time: ""};
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

  const listStatus: Options[] = []
  listStatus.push({"name": "true", value: true})
  listStatus.push({"name": "false", value: false})

  const levels: ILevelState = useSelector((state: IStateType) => state.levels);
  const listLevel: ILevel[] = levels.levels
  const listLevels:  Options[] = [];
  listLevel.map((ele) => {
    let item: Options = {"name": ele.name, "value": ele.id}
    return listLevels.push(item)
  })

  const mytypes: IMytypeState = useSelector((state: IStateType) => state.mytypes);
  const listMytype: IMytype[] = mytypes.mytypes
  const listMytypes: Options[] = [];
  listMytype.map((ele) => {
    let item: Options = {"name": ele.name, "value": ele.id}
    return listMytypes.push(item)
  })

  const [formState, setFormState] = useState({
    name: { error: "", value: contest.name },
    description: { error: "", value: contest.description },
    art_type_id: { error: "", value: contest.art_type_id },
    art_level_id: { error: "", value: contest.art_level_id },
    is_enabled: { error: "", value: contest.is_enabled },
    max_participant: { error: "", value: contest.max_participant },
    start_time: { error: "", value: contest.start_time },
    end_time: { error: "", value: contest.end_time },
    image_url: { error: "", value: contest.image_url },
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
    console.log('form-contet', formState)
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
      if (saveFn === addContest){
        dispatch(postContest({
          ...contest,
          name: formState.name.value,
          description: textHtml,
          art_type_id: formState.art_type_id.value,
          art_level_id:  formState.art_level_id.value,
          is_enabled:  formState.is_enabled.value,
          max_participant: formState.max_participant.value,
          start_time:  formState.start_time.value,
          end_time: formState.end_time.value,
          image_url: formState.image_url.value,
        }));
      }
      else {
        dispatch(putContest(contest.id, {
          ...contest,
          name: formState.name.value,
          description: textHtml,
          art_type_id: formState.art_type_id.value,
          art_level_id:  formState.art_level_id.value,
          is_enabled:  formState.is_enabled.value,
          max_participant: formState.max_participant.value,
          start_time:  formState.start_time.value,
          end_time: formState.end_time.value,
          image_url: formState.image_url.value,
        }));
      }
      

      dispatch(addNotification("Cuộc thi", ` ${formState.name.value} chỉnh bởi bạn`));
      dispatch(clearSelectedContest());
      dispatch(setModificationState(ContestModificationStatus.None));
    }
  }

  function cancelForm(): void {
    dispatch(setModificationState(ContestModificationStatus.None));
    setPopup(true)
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.max_participant.error || !formState.art_type_id.value) as boolean;
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
                <SelectInput id="input_art_type_id"
                  field = "art_type_id"
                  value={formState.art_type_id.value}
                  onChange={hasFormValueChanged}
                  required={true}
                  label="Thể loại"
                  options={listMytypes}
                />
              </div>
              <div className="form-group">
                  <SelectInput
                    id="input_art_level_id"
                    field="art_level_id"
                    label="Mức độ"
                    options={listLevels}
                    required={true}
                    onChange={hasFormValueChanged}
                    value={formState.art_level_id.value}
                  />
              </div>
               <div className="form-group">
                  <SelectInput
                    id="input_is_enabled"
                    field="is_enabled"
                    label="Trạng thái"
                    options={listStatus}
                    required={true}
                    onChange={hasFormValueChanged}
                    value={formState.is_enabled.value}
                  />
              </div> 
              <div className="form-group">
                <label className="lable-image">Ảnh</label>
                <input id="input_image_url"
                  type="file"
                  value={formState.image_url.value}
                  placeholder="Chọn ảnh đại diện" />
              </div>
              <div className="form-group">
                  <NumberInput id="input_max_participant"
                    value={formState.max_participant.value}
                    field="max_participant"
                    onChange={hasFormValueChanged}
                    max={1000}
                    min={0}
                    label="Số lượng tối đa tham gia" />
              </div>
              <div className="form-group">
                <TextInput id="input_start_time"
                  field = "start_time"
                  type="date"
                  value={formState.start_time.value}
                  onChange={hasFormValueChanged}
                  required={false}
                  maxLength={100}
                  label="Thời gian bắt đầu"
                  placeholder="" />
              </div>
              <div className="form-group">
                <TextInput id="input_end_time"
                  field = "end_time"
                  type="date"
                  value={formState.end_time.value}
                  onChange={hasFormValueChanged}
                  required={false}
                  maxLength={100}
                  label="Thời gian hết hạn"
                  placeholder="" />
              </div>
              <button className="btn btn-danger" onClick={() => cancelForm()}>Hủy</button>
              <button type="submit" className={`btn btn-success left-margin ${getDisabledClass()}`}>Lưu</button>
            </form>
          </div>
        </div>
      </div>
      <Popup
        className="popup-modal"
        open={popup}
        onClose={() => setPopup(false)}
        closeOnDocumentClick
      >
        <div className="popup-modal">
          <div className="popup-title">
            Bạn chắc chắn?
          </div>
          <div className="popup-content">
            <button type="button"
              className="btn btn-danger"
              onClick={() => {
                history.push({
                  pathname: `/${id}/contest`
                })
                setPopup(false);
              }}>Hủy
            </button>
          </div>
        </div>
      </Popup>
    </Fragment>
  );
};

export default ContestForm;
