import React, { Fragment, Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { IStateType, ICourseState, IContestState, IFeedBackState, IUserState, IEmployeeState, IBlogState} from "../../store/models/root.interface";
import { useParams } from "react-router";
import { getBlog } from "../../store/actions/blog/getBlog";
import { getCourse } from "../../store/actions/course/getCourse";
import { getContest } from "../../store/actions/contest/getContest";
import { getAdmin } from "../../store/actions/users/getAdmin";
import { getFeedback } from "../../store/actions/feedback/getFeedback";

type role = {
  id: string;
};

const Home: React.FC = () => {

  const { id } = useParams<role>()
  //console.log(id)

  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(getBlog())
  }, [dispatch])

  useEffect(() => {
    dispatch(getCourse())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFeedback())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getContest())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAdmin())
  }, [dispatch])

  const feedbacks: IFeedBackState = useSelector((state: IStateType) => state.feedbacks);
  const blogs: IBlogState = useSelector((state: IStateType) => state.blogs);
  const courses: ICourseState = useSelector((state: IStateType) => state.courses);
  const contests: IContestState = useSelector((state: IStateType) => state.contest);
  const teachers: IUserState = useSelector((state: IStateType) => state.users);
  const employees: IEmployeeState = useSelector((state: IStateType) => state.employees);

  
  dispatch(updateCurrentPath("Trang chủ", ""));


  const numberTeacherCount: number = teachers.users.length;
  const numberEmployeeCount: number = employees.employees.length;
  const numberCoursesCount: number = courses.courses.length;
  const numberContestCount: number = contests.contest.length;
  const numberFeedbackAcceptCount: number = feedbacks.feedbacks.length;
  const numberBlogAcceptCount: number = blogs.blogs.length;

  if (id === "teacher"){
    return (
      <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Trang chủ</h1>
      <p className="mb-4">Thông tin chung</p>

      <div className="row">
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
        <TopCard title="TỔNG SỐ CUỘC THI" text={`${numberContestCount}`} icon="box" class="primary" />
        <TopCard title="TỔNG SỐ PHẢN HỒI" text={`${numberFeedbackAcceptCount}`} icon="warehouse" class="danger" />
        <TopCard title="TỔNG SỐ BLOG" text={`${numberBlogAcceptCount}`} icon="warehouse" class="danger" />  
      </div>

    </Fragment>
  );
};

export default Home;
