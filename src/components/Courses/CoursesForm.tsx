import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, ICourseState, ILevelState, IMytypeState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { ICourse, CourseModificationStatus } from "../../store/models/courses.interface";
import TextInput from "../../common/components/TextInput";
import { editCourse, clearSelectedCourse, setModificationState, addCourse } from "../../store/actions/courses.actions";
import { addNotification } from "../../store/actions/notifications.action";
import NumberInput from "../../common/components/NumberInput";
import SelectInput from "../../common/components/Select";
import { OnChangeModel, ICourseFormState } from "../../common/types/Form.types";
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

const CoursesForm: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const courses: ICourseState | null = useSelector((state: IStateType) => state.courses);
  let course: ICourse | null = courses.selectedCourse;
  const isCreate: boolean = (courses.modificationState === CourseModificationStatus.Create);
  
  if (!course || isCreate) {
  course = { id: 0, name: "", description: "", type: "", level: "", price: 0, amount: 0};
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

  //console.log(listLevels)

  const [formState, setFormState] = useState({
    name: { error: "", value: course.name },
    description: { error: "", value: course.description },
    type: { error: "", value: course.type },
    level: { error: "", value: course.level },
    price: { error: "", value: course.price },
    amount: { error: "", value: course.amount },
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
      dispatch(saveFn({
        ...course,
        name: formState.name.value,
        description: textHtml,
        type: formState.type.value,
        level: formState.level.value,
        price: formState.price.value,
        amount: formState.amount.value,
      }));

      dispatch(addNotification("Khóa học", `${formState.name.value} đã được thêm bởi bạn`));
      dispatch(clearSelectedCourse());
      dispatch(setModificationState(CourseModificationStatus.None));
    }
  }

  function cancelForm(): void {
    dispatch(setModificationState(CourseModificationStatus.None));
  }

  function getDisabledClass(): string {
    let isError: boolean = isFormInvalid();
    return isError ? "disabled" : "";
  }

  function isFormInvalid(): boolean {
    return (formState.price.error
      || formState.name.error ||  formState.type.error 
      || formState.level.error || !formState.name.value || !formState.type.value) as boolean;
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
                <NumberInput id="input_price"
                  field = "price"
                  value={formState.price.value}
                  onChange={hasFormValueChanged}
                  label="Giá"
                />
              </div>
              <div className="form-group">
                <NumberInput id="input_amount"
                  field = "amount"
                  value={formState.amount.value}
                  onChange={hasFormValueChanged}
                  label="Số lượng buổi học"
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

export default CoursesForm;
