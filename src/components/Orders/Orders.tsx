import React, { Fragment, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IOrder } from "../../store/models/order.interface";
import OrderList from "./OrderList";
import TopCard from "../../common/components/TopCard";
import OrderForm from "./OrderForm";
import ProductList from "../Products/ProductsList";
import { IProduct } from "../../store/models/product.interface";
import { changeSelectedProduct, clearSelectedProduct } from "../../store/actions/products.action";
import { IStateType } from "../../store/models/root.interface";

const Orders: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const orders: IOrder[] = useSelector((state: IStateType) => state.orders.orders);
    const totalSales: number = orders.reduce((prev, next) => prev + next.totalPrice, 0);
    const totalAmount: number = orders.reduce((prev, next) => prev + next.amount, 0);
    const totalClass: number = orders.reduce((prev, next) => prev + 1, 0);
    dispatch(updateCurrentPath("Lớp", "Danh sách"));
    dispatch(clearSelectedProduct());

    function selectProduct(product: IProduct): void {
        dispatch(changeSelectedProduct(product));
    }

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">Lớp</h1>
            <p className="mb-4">Thông tin chung</p>

            <div className="row">
                <TopCard title="TỔNG SỐ LỚP" text={totalClass.toString()} icon="donate" class="primary" />
                <TopCard title="TỔNG SỐ HỌC VIÊN" text={totalAmount.toString()} icon="calculator" class="danger" />
                <TopCard title="DOANH THU" text={`${totalSales} vnđ`} icon="dollar-sign" class="success" />
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách lớp</h6>
                            <div className="header-buttons">
                            </div>
                        </div>
                        <div className="card-body">
                            <OrderList />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <OrderForm />
                </div>
                <div className="col-md-6">
                    <div className="card card-bottom-list shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh sách giáo viên</h6>
                        </div>
                        <ProductList
                            onSelect={selectProduct}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Orders;