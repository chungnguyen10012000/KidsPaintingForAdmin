import React, { Fragment, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { IUserState, IStateType, IMyClassState, ICourseState, IContestState, IBlogState} from "../../store/models/root.interface";
import MyClassListForKid from "../MyClass/MyClassListForKid";
import { useParams } from "react-router";

type role = {
  id: string;
};

const Home: React.FC = () => {

  const { id } = useParams<role>()
  //console.log(id)

  const users: IUserState = useSelector((state: IStateType) => state.users);
  const blogs: IBlogState = useSelector((state: IStateType) => state.blogs);
  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  const classs: IMyClassState = useSelector((state: IStateType) => state.myclass);
  const contests: IContestState = useSelector((state: IStateType) => state.contest);
  const numberTeacherCount: number = users.users.length;
  const numberCoursesCount: number = courses.courses.length;
  const numberClassCount: number = classs.myclass.length;
  const numberContestCount: number = contests.contest.length;
  const numberBlogAcceptCount: number = blogs.blogs.length;

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Trang chủ", ""));

  if (id === "teacher"){
    return (
      <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Trang chủ</h1>
      <p className="mb-4">Thông tin chung</p>

      <div className="row">
        <TopCard title="TỔNG SỐ LỚP" text={`${numberTeacherCount}`} icon="user" class="primary" />
        <TopCard title="TỔNG SỐ CUỘC THI" text={`${numberCoursesCount}`} icon="warehouse" class="danger" />
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
