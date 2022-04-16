import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IMyClassState } from "../../store/models/root.interface";


function MyClassWasTeachList(): JSX.Element {

    const myClass: IMyClassState = useSelector((state: IStateType) => state.myclass);

    const myclassElements: (JSX.Element | null)[] = myClass.myclass.map(class_item => {
        if (!class_item) { return null; }
        return (<tr className={`table-row`}
            key={`class_${class_item.id}`}>
            <th scope="row">{class_item.id}</th>
            <td>{class_item.name}</td>
            <td>{class_item.course}</td>
            <td>{class_item.amount}</td>
            <td>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
                <span className="fa fa-star"></span>
            </td>
        </tr>);
    });


    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên lớp</th>
                        <th scope="col">Thuộc khóa học</th>
                        <th scope="col">Số lượng tối đa học sinh</th>
                        <th scope="col">Học viên đánh giá</th>
                    </tr>
                </thead>
                <tbody>
                    {myclassElements}
                </tbody>
            </table>
        </div>

    );
}

export default MyClassWasTeachList;
