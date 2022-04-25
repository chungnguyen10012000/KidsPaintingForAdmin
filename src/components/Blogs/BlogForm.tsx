import React, { useState, FormEvent, Dispatch, Fragment } from "react";
import { IStateType, IBlogState } from "../../store/models/root.interface";
import { useSelector, useDispatch } from "react-redux";
import { IBlog, BlogModificationStatus } from "../../store/models/blogs.innterface";
import TextInput from "../../common/components/TextInput";
import { editBlog, clearSelectedBlog, setModificationState, addBlog } from "../../store/actions/blogs.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { OnChangeModel, IBlogFormState } from "../../common/types/Form.types";

import { ILevel } from "../../store/models/levels.interface";
import { IMytype } from "../../store/models/mytypes.interface";

import { useQuill } from 'react-quilljs';
import BlotFormatter from 'quill-blot-formatter';
import 'quill/dist/quill.snow.css';
import { postBlog } from "../../common/service/blog/postBlog";
import { putBlog } from "../../common/service/blog/putBlog";
import Popup from "reactjs-popup";
import { useHistory, useParams } from "react-router-dom";

export type levelListProps = {
  onSelect?: (level: ILevel) => void;
  children?: React.ReactNode;
};

export type mytypeListProps = {
  onSelect?: (mytype: IMytype) => void;
  children?: React.ReactNode;
};

type role = {
  id: string;
};

const BlogForm: React.FC = () => {

  let history = useHistory();
  const { id } = useParams<role>()
  
  const dispatch: Dispatch<any> = useDispatch();
  const blogs: IBlogState | null = useSelector((state: IStateType) => state.blogs);
  let blog: IBlog | null = blogs.selectedBlog;
  const isCreate: boolean = (blogs.modificationState === BlogModificationStatus.Create);

  if (!blog || isCreate) {
    blog = { id: 0, name: "", description: "", image_url: "" };
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
    if (quill && blog && !isCreate) {
      quill.clipboard.dangerouslyPasteHTML(blog.description);
    }
  }, [quill, blog, isCreate]);


  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setTextHtml(quill.root.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill]);


  const [formState, setFormState] = useState({
    name: { error: "", value: blog.name },
    description: { error: "", value: blog.description },
    image_url: { error: "", value: blog.image_url },
  });

  function hasFormValueChanged(model: OnChangeModel): void {
    setFormState({ ...formState, [model.field]: { error: model.error, value: model.value } });
  }

  function saveUser(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (isFormInvalid()) {
      return;
    }

    let saveUserFn: Function = (isCreate) ? addBlog : editBlog;
    saveForm(formState, saveUserFn);
  }

  function saveForm(formState: IBlogFormState, saveFn: Function): void {
    if (blog) {
      if (saveFn === addBlog) {
        dispatch(postBlog({
          ...blog,
          name: formState.name.value,
          description: textHtml,
        }));
      }
      else {
        dispatch(putBlog(blog.id, {
          ...blog,
          name: formState.name.value,
          description: textHtml,
        }));
      }


      dispatch(addNotification("Blog", ` ${formState.name.value} chỉnh bởi bạn`));
      dispatch(clearSelectedBlog());
      dispatch(setModificationState(BlogModificationStatus.None));
    }
  }

  const [popup, setPopup] = useState(false);

  function cancelForm(): void {
    dispatch(setModificationState(BlogModificationStatus.None));
    setPopup(true)
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
            <h6 className="m-0 font-weight-bold text-green"> {(isCreate ? "Tạo" : "Sửa")} blog</h6>
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
                  label="Tên blog"
                  placeholder="Nhập tên blog" />
              </div>
              <div className="form-group">
                <label className="lable-image">Ảnh</label>
                <input id="input_image_url"
                  type="file"
                  value={formState.image_url.value}
                  placeholder="Chọn ảnh đại diện" />
              </div>
              <div className="form-group">
                <div ref={quillRef} />
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
                  pathname: `/${id}/blog`
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

export default BlogForm;
