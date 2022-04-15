import React, { Fragment, Dispatch, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import ExerciseList from "../Exercises/ExerciseList";
import { useHistory } from "react-router-dom";
import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import SelectInput from "../../common/components/Select";



const LessonDetail: React.FC = () => {

  let history = useHistory();

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Buổi học", "Chi tiết buổi học"));


  const { quill, quillRef, Quill } = useQuill({
    modules: { blotFormatter: {} }
  });

  if (Quill && !quill) {
    // const BlotFormatter = require('quill-blot-formatter');
    Quill.register('modules/blotFormatter', BlotFormatter);
  }

  let [textHtml, setTextHtml] = useState<string>('')


  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setTextHtml(quill.root.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill]);

  const listPage = ["1", "2", "3", "Nhiều hơn"]
  const [page, setPage] = useState("1")
  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Chi tiết buổi học</h1>
      <p className="mb-4">Thông tin chung</p>


      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green"> Danh sách bài tập</h6>
            </div>
            <div className="card-body">
              {
                <ExerciseList />
              }
              <button
                className={`btn btn-primary btn-user btn-block`}
                onClick={() => {
                  history.push('/teacher/exercise')
                }}
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-12">
            <div className="card-header py-12">
              <h6 className="m-0 font-weight-bold text-green"> Buổi học mẫu</h6>
            </div>
            <div className="card-body text-center">
            <button  
                className="btn btn-warning"

              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-12">
            <div className="card-header py-12">
              <h6 className="m-0 font-weight-bold text-green"> Soạn giáo án</h6>
            </div>
            <div className="card-body">
              <form>
              <div className="form-group">
                <SelectInput id="input_page"
                  field = "page"
                  required={true}
                  value={page}
                  onChange={(x: any) => {setPage(x)}}
                  label="Trang"
                  options={listPage}
                />
              </div>
                <div className="form-group">
                  <div ref={quillRef} style={{ minHeight: 200 }} />
                </div>
              </form>
              <button
                className={`btn btn-primary btn-user btn-block`}
                onClick={() => {
                  alert(textHtml)
                }}
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment >
  )
};

export default LessonDetail;
