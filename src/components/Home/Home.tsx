import React, { Fragment, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { IStateType, IMyClassState, ICourseState, IContestState, IFeedBackState, IUserState, IEmployeeState} from "../../store/models/root.interface";
import { useParams } from "react-router";

type role = {
  id: string;
};

const Home: React.FC = () => {

  const { id } = useParams<role>()
  //console.log(id)

  const blogs: IFeedBackState = useSelector((state: IStateType) => state.feedbacks);
  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  const classs: IMyClassState = useSelector((state: IStateType) => state.myclass);
  const contests: IContestState = useSelector((state: IStateType) => state.contest);
  const teachers: IUserState = useSelector((state: IStateType) => state.users);
  const employees: IEmployeeState = useSelector((state: IStateType) => state.employees);

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Trang chủ", ""));


  const numberTeacherCount: number = teachers.users.length;
  const numberEmployeeCount: number = employees.employees.length;
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
              
            </div>
          </div>

        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách lớp đã dạy</h6>
            </div>
            <div className="card-body">
              
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
        <TopCard title="TỔNG SỐ NHÂN VIÊN" text={`${numberEmployeeCount}`} icon="warehouse" class="danger" />
      </div>

      <div className="row">
        <TopCard title="TỔNG SỐ LỚP HỌC" text={`${numberClassCount}`} icon="warehouse" class="danger" /> 
        <TopCard title="TỔNG SỐ CUỘC THI" text={`${numberContestCount}`} icon="box" class="primary" />
        <TopCard title="TỔNG SỐ PHẢN HỒI" text={`${numberBlogAcceptCount}`} icon="warehouse" class="danger" /> 
      </div>

    </Fragment>
  );
};

export default Home;
