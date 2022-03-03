import React, { Fragment, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import TopCard from "../../common/components/TopCard";
import { IProductState, IStateType } from "../../store/models/root.interface";
import ProductList from "../Teachers/TeachersList";
import { IOrder } from "../../store/models/order.interface";

const Home: React.FC = () => {
  const products: IProductState = useSelector((state: IStateType) => state.products);
  const numberItemsCount: number = products.products.length;
  const totalPrice: number = products.products.reduce((prev, next) => prev + ((next.price * next.amount) || 0), 0);
  const totalProductAmount: number = products.products.reduce((prev, next) => prev + (next.amount || 0), 0);

  const orders: IOrder[] = useSelector((state: IStateType) => state.orders.orders);
  const totalOrderAmount: number = orders.reduce((prev, next) => prev + next.amount, 0);

  const dispatch: Dispatch<any> = useDispatch();
  dispatch(updateCurrentPath("Trang chủ", ""));

  return (
    <Fragment>
      <h1 className="h3 mb-2 text-gray-800">Trang chủ</h1>
      <p className="mb-4">Thông tin chung</p>

      <div className="row">
        <TopCard title="TỔNG SỐ GIÁO VIÊN" text={`${numberItemsCount}`} icon="user" class="primary" />
        <TopCard title="TỔNG SỐ LỚP" text={`${totalProductAmount}`} icon="warehouse" class="danger" />
        <TopCard title="TỔNG SỐ HỌC VIÊN" text={totalOrderAmount.toString()} icon="user" class="danger" />
      </div>

      <div className="row">
        <TopCard title="TỔNG SỐ CUỘC THI" text={totalPrice.toString()} icon="box" class="primary" />
      </div>

      <div className="row">

        <div className="col-xl-6 col-lg-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-green">Danh sách giáo viên</h6>
            </div>
            <div className="card-body">
              <ProductList />
            </div>
          </div>

        </div>
      </div>

    </Fragment>
  );
};

export default Home;
