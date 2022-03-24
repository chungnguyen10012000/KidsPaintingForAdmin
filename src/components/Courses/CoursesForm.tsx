import React, { useState, FormEvent, Dispatch, Fragment, useEffect } from "react";
import { IStateType, ICourseState } from "../../store/models/root.interface";
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
    course = { courseId: 0, courseName: "", courseDescription: "", courseLevel: "", courseType: "", coursePrice: 0, maxCourseParticipant: 0, sumOfSection: 0};
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
      quill.clipboard.dangerouslyPasteHTML(course.courseDescription);
    }
  }, [quill, course, isCreate]);


  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setTextHtml(quill.root.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill]);

  const [mytype, setMyType] = useState<IMytype[]>([])

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/typeArt')
    .then(res => res.json())
    .then(x => {
      setMyType(x)
    })
  }, [])

  const listMytype: IMytype[] = mytype
  const listMytypes: string[] = []
  listMytype.map((ele) => {
    return listMytypes.push(ele.typeName)
  })

  const [mylevel, setMyLevel] = useState<ILevel[]>([])

  const listLevel: ILevel[] = mylevel
  const listLevels: string[] = []
  listLevel.map((ele) => {
    return listLevels.push(ele.levelName)
  })

  //console.log(listLevels)

  const [formState, setFormState] = useState({
    name: { error: "", value: course.courseName },
    description: { error: "", value: course.courseDescription },
    type: { error: "", value: course.courseType },
    level: { error: "", value: course.courseLevel },
    price: { error: "", value: course.coursePrice },
    amount: { error: "", value: course.maxCourseParticipant },
    sumOfSesson: { error: "", value: course.sumOfSection },
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
        level: formState.level.value,
        type: formState.type.value,
        price: formState.price.value,
        amount: formState.amount.value,
        sumOfSesson: formState.sumOfSesson.value,
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
                  label="Số lượng tối đa học viên"
                />
              </div>
              <div className="form-group">
                <NumberInput id="input_sumOfSesson"
                  field = "sumOfSesson"
                  value={formState.sumOfSesson.value}
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
    </Fragment>
  )
};

export default CoursesForm;
