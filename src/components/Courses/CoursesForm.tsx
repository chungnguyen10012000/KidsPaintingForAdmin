import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, ICourseState, IMytypeState, ILevelState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ICourse, CourseModificationStatus } from "../../store/models/courses.interface";
import TextInput from "../../common/components/TextInput";
import { editCourse, clearSelectedCourse, setModificationState, addCourse } from "../../store/actions/courses.actions";
import { addNotification } from "../../store/actions/notifications.action";
import NumberInput from "../../common/components/NumberInput";
import SelectInput from "../../common/components/SelectInput";
import { OnChangeModel, ICourseFormState } from "../../common/types/Form.types";
import { ILevel } from "../../store/models/levels.interface";
import { IMytype } from "../../store/models/mytypes.interface";

import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import { putCourse } from "../../common/service/course/putCourse";
import { postCourse } from "../../common/service/course/postCourse";
import { useHistory, useParams } from "react-router-dom";
import Popup from "reactjs-popup";

export type levelListProps = {
  onSelect?: (level: ILevel) => void;
  children?: React.ReactNode;
};

type role = {
  id: string;
};

type Options = {
  name: string;
  value: any;
}

export type mytypeListProps = {
  onSelect?: (mytype: IMytype) => void;
  children?: React.ReactNode;
};

const CoursesForm: React.FC = () => {
  
  let history = useHistory();
  const { id } = useParams<role>()

  const [popup, setPopup] = useState(false);

  const dispatch: Dispatch<any> = useDispatch();
  const courses: ICourseState | null = useSelector((state: IStateType) => state.courses);
  let course: ICourse | null = courses.selectedCourse;
  const isCreate: boolean = (courses.modificationState === CourseModificationStatus.Create);

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
  
  if (!course || isCreate) {
    course = { id: 0, name: "", description: "", art_level_id: 1, art_type_id: 1, price: 0, max_participant: 0, sum_of_section: 0, is_enabled: false, image_url: '' };
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
    if (quill && course && !isCreate) {
      quill.clipboard.dangerouslyPasteHTML(course.description);
    }
  }, [quill, course, isCreate]);


  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setTextHtml(quill.root.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill]);



  //console.log(listLevels)

  const [formState, setFormState] = useState({
    name: { error: "", value: course.name },
    description: { error: "", value: course.description },
    art_type_id: { error: "", value: course.art_type_id },
    art_level_id: { error: "", value: course.art_level_id },
    price: { error: "", value: course.price },
    max_participant: { error: "", value: course.max_participant },
    sum_of_section: { error: "", value: course.sum_of_section },
    image_url: { error: "", value: course.image_url },
    is_enabled: { error: "", value: course.is_enabled}
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function saveUser(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }

    let saveUserFn: Function = (isCreate) ? addCourse : editCourse;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: ICourseFormState, saveFn: Function): void {
    if (course) {
      console.log(typeof(formState.art_level_id.value))
      if (saveFn === addCourse){
        dispatch(postCourse({
          ...course,
          name: formState.name.value,
          description: textHtml,
          art_type_id: formState.art_type_id.value,
          art_level_id: formState.art_level_id.value,
          price: formState.price.value,
          max_participant: formState.max_participant.value,
          sum_of_section: formState.sum_of_section.value,
          image_url: formState.image_url.value,
          is_enabled: formState.is_enabled.value,
        }));
      }
      else {
        dispatch(putCourse(course.id, {
          ...course,
          name: formState.name.value,
          description: textHtml,
          art_type_id: formState.art_type_id.value,
          art_level_id: formState.art_level_id.value,
          price: formState.price.value,
          max_participant: formState.max_participant.value,
          sum_of_section: formState.sum_of_section.value,
          image_url: formState.image_url.value,
          is_enabled: formState.is_enabled.value,
        }));
      }


      dispatch(addNotification("Khóa học", `${formState.name.value} đã được thêm bởi bạn`));
      dispatch(clearSelectedCourse());
      dispatch(setModificationState(CourseModificationStatus.None));
    }
  }

  function cancelForm(): void {
    dispatch(setModificationState(CourseModificationStatus.None));
    setPopup(true)
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.price.error
      || formState.name.error || !formState.name.value ) as boolean;
}

  return (
    <Fragment>
      <div className="col-xl-7 col-lg-7">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-green"> {(isCreate ? "Tạo" : "Sửa")} khóa học</h6>
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
                  label="Tên khóa học"
                  placeholder="Nhập tên khóa học" />
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
                <label className="lable-image">Ảnh</label>
                <input id="input_image_url"
                  type="file"
                  value={formState.image_url.value}
                  placeholder="Chọn ảnh đại diện" />
              </div>
              <div className="form-group">
                <NumberInput id="input_price"
                  field = "price"
                  value={formState.price.value}
                  onChange={hasFormValueChanged}
                  label="Giá"
                />
              </div>
              <div className="form-group">
                <NumberInput id="input_max_participant"
                  field = "max_participant"
                  value={formState.max_participant.value}
                  onChange={hasFormValueChanged}
                  label="Số lượng tối đa học viên"
                />
              </div>
              <div className="form-group">
                <NumberInput id="input_sum_of_section"
                  field = "sum_of_section"
                  value={formState.sum_of_section.value}
                  onChange={hasFormValueChanged}
                  label="Số lượng buổi học"
                />
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
                  pathname: `/${id}/courses`
                })
                setPopup(false);
              }}>Hủy
            </button>
          </div>
        </div>
      </Popup>
    </Fragment>
  )
};

export default CoursesForm;
