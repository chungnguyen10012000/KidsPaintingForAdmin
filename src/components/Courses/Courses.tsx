import React, { Fragment, Dispatch, useState, useEffect } from "react";
import CoursesList from "./CoursesList";
import CoursesForm from "./CoursesForm";
import TopCard from "../../common/components/TopCard";
import "./Courses.css";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { addNotification } from "../../store/actions/notifications.action";
import { updateCurrentPath } from "../../store/actions/root.actions";
import CoursesSemesterList from "./CourseSemesterList";
import CourseSemesterForm from "./CourseSemesterForm";


import { ICourseState, ICourseSemesterState, IStateType, IRootPageStateType, IMytypeState } from "../../store/models/root.interface";

import { CourseModificationStatus, ICourse } from "../../store/models/courses.interface";

import { removeMytype, clearSelectedMytype } from "../../store/actions/mytypes.actions";
import { removeCourse, clearSelectedCourse, setModificationState, changeSelectedCourse } from "../../store/actions/courses.actions";
import { clearSelectedLevel } from "../../store/actions/levels.actions";

import { CourseSemesterModificationStatus, ICourseSemester } from "../../store/models/course_for_semester.interface";
import { removeCourseSemester, clearSelectedCourseSemester, setModificationStateSemester, changeSelectedCourseSemester } from "../../store/actions/course_for_semester.actions";
import { useParams } from "react-router-dom";
import { getCourse } from "../../common/service/course/getCourse";
import { deleteCourse } from "../../common/service/course/deleteCourse";
import { getArtType } from "../../common/service/art_type/getArtType";
import { getLevel } from "../../common/service/art_level/getLevel";
import { getSchedule } from "../../common/service/schedule/getSchedule";
import { getCourseSemester } from "../../common/service/course_semester/getCourseSemester";
import { deleteCourseSemester } from "../../common/service/course_semester/deleteCourseSemester";


type role = {
  id: string;
};

const Courses: React.FC = () => {

  const { id } = useParams<role>()

  const [popup, setPopup] = useState(false);
  const [popup1, setPopup1] = useState(false);
  //const [popup2, setPopup2] = useState(false);
  const [popup3, setPopup3] = useState(false);

  const dispatch: Dispatch<any> = useDispatch();

  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  const mytypes: IMytypeState = useSelector((state: IStateType) => state.mytypes);
  //const levels: ILevelState = useSelector((state: IStateType) => state.levels);
  const courseSemesters: ICourseSemesterState = useSelector((state: IStateType) => state.courseSemeters);

  const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
  const numberItemsCount: number = courses.courses.length;

  useEffect(() => {
    dispatch(getCourse())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCourseSemester())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getArtType())
  }, [dispatch])
  
  useEffect(() => {
    dispatch(getLevel())
  }, [dispatch])

  useEffect(() => {
    dispatch(getSchedule())
  }, [dispatch])

  useEffect(() => {
    dispatch(clearSelectedCourse());
    dispatch(clearSelectedLevel());
    dispatch(clearSelectedMytype());
    dispatch(clearSelectedCourseSemester());
    dispatch(updateCurrentPath("Kh??a h???c", "Danh s??ch"));
  }, [path.area, dispatch]);

  function onCourseSelect(course: ICourse): void {
    dispatch(changeSelectedCourse(course));
    dispatch(setModificationState(CourseModificationStatus.None));
  }

  function onCourseSemesterSelect(courseSemester: ICourseSemester): void {
    dispatch(changeSelectedCourseSemester(courseSemester));
    dispatch(setModificationStateSemester(CourseSemesterModificationStatus.None));
  }

  function onCourseSemesterRemove() {
    if (courseSemesters.selectedCourseSemester) {
      setPopup3(true);
    }
  }

  const [isCheckOpen1, setIsCheckOpen1] = useState(false)
  const [isCheckOpen2, setIsCheckOpen2] = useState(false)
  const [isCheckOpen3, setIsCheckOpen3] = useState(false)

  if (id === "admin" || id === "super-admin" || id === "employee") {
    return (
      <Fragment>
        <h1 className="h3 mb-2 text-gray-800">Kh??a h???c</h1>
        <p className="mb-4">Th??ng tin chung</p>
        <div className="row">
          <TopCard title="T???NG S??? KH??A H???C" text={`${numberItemsCount}`} icon="box" class="primary" />
        </div>

        <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <button className="btn btn-success btn-green btn-create" onClick={() => {
                        dispatch(setModificationState(CourseModificationStatus.Create))
                        setIsCheckOpen3(!isCheckOpen3)
                    }}
                    >
                        <i className="fas fa fa-plus"></i>
                        Th??m kh??a h???c
                    </button>
                </div>

                {((courses.modificationState === CourseModificationStatus.Create) && isCheckOpen3 === true) ?
                    <CoursesForm /> : null}
            </div>

        <div className="row">
          <CoursesList
            onSelect={onCourseSelect}
          />
{/*           <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-green">Danh s??ch kh??a h???c</h6>
                <div className="header-buttons">
                  <button className="btn btn-success btn-blue" onClick={() =>
                    {
                      dispatch(setModificationState(CourseModificationStatus.Edit))
                      if (courses.selectedCourse){
                        setIsCheckOpen4(!isCheckOpen4)
                      }
                    }}>
                    <i className="fas fa fa-pen"></i>
                  </button>
                  <button className="btn btn-success btn-red" onClick={() => onCourseRemove()}>
                    <i className="fas fa fa-times"></i>
                  </button>
                </div>
              </div>
              <div className="card-body">
                <CoursesList
                  onSelect={onCourseSelect}
                />
              </div>
            </div>
          </div>
          {((courses.modificationState === CourseModificationStatus.Edit && courses.selectedCourse && isCheckOpen4 === true)) ?
            <CoursesForm /> : null} */}
        </div>

        <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <button className="btn btn-success btn-green btn-create" onClick={() => {
                        dispatch(setModificationStateSemester(CourseSemesterModificationStatus.Create))
                        setIsCheckOpen1(!isCheckOpen1)
                    }}
                    >
                        <i className="fas fa fa-plus"></i>
                        Th??m kh??a h???c theo k??
                    </button>
                </div>

                {((courseSemesters.modificationState === CourseSemesterModificationStatus.Create) && isCheckOpen1 === true) ?
                    <CourseSemesterForm /> : null}
            </div>


        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-green">Danh s??ch kh??a h???c theo h???c k???</h6>
                <div className="header-buttons">
                  <button className="btn btn-success btn-blue" onClick={() =>
                    {
                      dispatch(setModificationStateSemester(CourseSemesterModificationStatus.Edit))
                      if (courseSemesters.selectedCourseSemester){
                        setIsCheckOpen2(!isCheckOpen2)
                      }
                    }}>
                    <i className="fas fa fa-pen"></i>
                    Ch???nh s???a
                  </button>
                  <button className="btn btn-success btn-red" onClick={() => onCourseSemesterRemove()}>
                    <i className="fas fa fa-times"></i>
                    X??a
                  </button>
                </div>
              </div>
              <div className="card-body">
                <CoursesSemesterList
                  onSelect={onCourseSemesterSelect}
                />
              </div>
            </div>
          </div>
          {((courseSemesters.modificationState === CourseSemesterModificationStatus.Edit && courseSemesters.selectedCourseSemester && isCheckOpen2 === true)) ?
            <CourseSemesterForm /> : null}
        </div>


        <Popup
          className="popup-modal"
          open={popup3}
          onClose={() => setPopup3(false)}
          closeOnDocumentClick
        >
          <div className="popup-modal">
            <div className="popup-title">
              B???n ch???c ch???n?
            </div>
            <div className="popup-content">
              <button type="button"
                className="btn btn-danger"
                onClick={() => {
                  if (!courseSemesters.selectedCourseSemester) {
                    return;
                  }
                  dispatch(addNotification("Kh??a h???c theo k???", `???? b??? x??a kh???i h??? th???ng`));
                  dispatch(deleteCourseSemester(courseSemesters.selectedCourseSemester.id));
                  dispatch(clearSelectedCourseSemester());
                  setPopup3(false);
                }}>X??a
              </button>
            </div>
          </div>
        </Popup>


        <Popup
          className="popup-modal"
          open={popup1}
          onClose={() => setPopup1(false)}
          closeOnDocumentClick
        >
          <div className="popup-modal">
            <div className="popup-title">
              B???n ch???c ch???n?
            </div>
            <div className="popup-content">
              <button type="button"
                className="btn btn-danger"
                onClick={() => {
                  if (!mytypes.selectedMytype) {
                    return;
                  }
                  dispatch(addNotification("Th??? lo???i", ` ${mytypes.selectedMytype.name} ???? b??? x??a kh???i h??? th???ng`));
                  dispatch(removeMytype(mytypes.selectedMytype.id));
                  dispatch(clearSelectedMytype());
                  setPopup1(false);
                }}>X??a
              </button>
            </div>
          </div>
        </Popup>


        <Popup
          className="popup-modal"
          open={popup}
          onClose={() => setPopup(false)}
          closeOnDocumentClick
        >
          <div className="popup-modal">
            <div className="popup-title">
              B???n ch???c ch???n?
            </div>
            <div className="popup-content">
              <button type="button"
                className="btn btn-danger"
                onClick={() => {
                  if (!courses.selectedCourse) {
                    return;
                  }
                  dispatch(addNotification("Kh??a h???c", ` ${courses.selectedCourse.name} ???? b??? x??a kh???i h??? th???ng`));
                  dispatch(deleteCourse(courses.selectedCourse.id));
                  dispatch(clearSelectedCourse());
                  setPopup(false);
                }}>X??a
              </button>
            </div>
          </div>
        </Popup>
      </Fragment >
    );
  }
  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Kh??a h???c</h1>
      <p className="mb-4">Th??ng tin chung</p>
      <div className="row">
        <TopCard title="T???NG S??? KH??A H???C" text={`${numberItemsCount}`} icon="box" class="primary" />
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh s??ch kh??a h???c</h6>
            </div>
            <div className="card-body">
              <CoursesList
                onSelect={onCourseSelect}
              />
            </div>
          </div>
        </div>
      </div>


      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh s??ch kh??a h???c theo h???c k???</h6>
            </div>
            <div className="card-body">
              <CoursesSemesterList
                onSelect={onCourseSemesterSelect}
              />
            </div>
          </div>
        </div>
      </div>



      <Popup
        className="popup-modal"
        open={popup3}
        onClose={() => setPopup3(false)}
        closeOnDocumentClick
      >
        <div className="popup-modal">
          <div className="popup-title">
            B???n ch???c ch???n?
          </div>
          <div className="popup-content">
            <button type="button"
              className="btn btn-danger"
              onClick={() => {
                if (!courseSemesters.selectedCourseSemester) {
                  return;
                }
                dispatch(addNotification("Kh??a h???c theo k???", `???? b??? x??a kh???i h??? th???ng`));
                dispatch(removeCourseSemester(courseSemesters.selectedCourseSemester.id));
                dispatch(clearSelectedCourseSemester());
                setPopup3(false);
              }}>X??a
            </button>
          </div>
        </div>
      </Popup>


      <Popup
        className="popup-modal"
        open={popup}
        onClose={() => setPopup(false)}
        closeOnDocumentClick
      >
        <div className="popup-modal">
          <div className="popup-title">
            B???n ch???c ch???n?
          </div>
          <div className="popup-content">
            <button type="button"
              className="btn btn-danger"
              onClick={() => {
                if (!courses.selectedCourse) {
                  return;
                }
                dispatch(addNotification("Kh??a h???c", ` ${courses.selectedCourse.name} ???? b??? x??a kh???i h??? th???ng`));
                dispatch(removeCourse(courses.selectedCourse.id));
                dispatch(clearSelectedCourse());
                setPopup(false);
              }}>X??a
            </button>
          </div>
        </div>
      </Popup>
    </Fragment >
  );
};

export default Courses;
