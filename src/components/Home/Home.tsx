import React, { Fragment, Dispatch, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { IUserState, IStateType, IMyClassState, ICourseState, IContestState, IFeedBackState} from "../../store/models/root.interface";
import MyClassListForKid from "../MyClass/MyClassListForKid";
import { useParams } from "react-router";
import { getDomain, getRestApiWithToken } from "../../common/util/RestAPI.util";
import { RestApiAuth } from "../../common/components/RestApiAuth";
import { Page } from "../../common/util/User.util";

type role = {
  id: string;
};

const Home: React.FC = () => {

  const { id } = useParams<role>()
  //console.log(id)

  const users: IUserState = useSelector((state: IStateType) => state.users);
  const blogs: IFeedBackState = useSelector((state: IStateType) => state.feedbacks);
  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  const classs: IMyClassState = useSelector((state: IStateType) => state.myclass);
  const contests: IContestState = useSelector((state: IStateType) => state.contest);

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Trang chủ", ""));

  const [totalTeacher, setTotalTeacher] = useState<number>(0)
  
  useEffect(() => {
    let pathUsers = getDomain('user?role=ROLE_TEACHER')
    let token: string | null = localStorage.getItem('access_token');
    if (token != null && id !== 'teacher') {
      getRestApiWithToken(pathUsers, token)
        .then(res => {
          return RestApiAuth(res);
        })
        .then( (data: Page) => {
          setTotalTeacher(data.totalItems)
        })
        .catch(() => {
          setTotalTeacher(0)
        })
      }
  }, [])

  const numberTeacherCount: number = totalTeacher;
  const numberCoursesCount: number = courses.courses.length;
  const numberClassCount: number = classs.myclass.length;
  const numberContestCount: number = contests.contest.length;
  const numberBlogAcceptCount: number = blogs.feedbacks.length;

  if (id === "teacher"){
    return (
      <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Trang chủ</h1>
      <p className="mb-4">Thông tin chung</p>

      <div className="row">
        <TopCard title="TỔNG SỐ LỚP" text={`${numberClassCount}`} icon="user" class="primary" />
        <TopCard title="TỔNG SỐ CUỘC THI" text={`${numberContestCount}`} icon="warehouse" class="danger" />
      </div>

      <div className="row">

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách lớp</h6>
            </div>
            <div className="card-body">
              <MyClassListForKid />
            </div>
          </div>

        </div>
      </div>

    </Fragment>
    )
  }



  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Trang chủ</h1>
      <p className="mb-4">Thông tin chung</p>

      <div className="row">
        <TopCard title="TỔNG SỐ GIÁO VIÊN" text={`${numberTeacherCount}`} icon="user" class="primary" />
        <TopCard title="TỔNG SỐ KHÓA HỌC" text={`${numberCoursesCount}`} icon="warehouse" class="danger" />
      </div>

      <div className="row">
        <TopCard title="TỔNG SỐ LỚP HỌC" text={`${numberClassCount}`} icon="warehouse" class="danger" /> 
        <TopCard title="TỔNG SỐ CUỘC THI" text={`${numberContestCount}`} icon="box" class="primary" />
      </div>
      <div className="row">
        <TopCard title="TỔNG SỐ PHẢN HỒI" text={`${numberBlogAcceptCount}`} icon="warehouse" class="danger" /> 
      </div>

    </Fragment>
  );
};

export default Home;
