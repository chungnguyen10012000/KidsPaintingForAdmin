import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { IStateType, IContestState } from "../../store/models/root.interface";

type role = {
    id: string;
};

function ContestEnd(): JSX.Element {

    const { id } = useParams<role>()
    let history = useHistory();

    const contests: IContestState = useSelector((state: IStateType) => state.contest);

    const productElements: (JSX.Element | null)[] = contests.contest.map(contest_item => {
        if (!contest_item) { return null; }
        return (<tr className={`table-row`}
            key={`contest_${contest_item.id}`}>
            <th scope="row">{contest_item.id}</th>
            <td>{contest_item.name}</td>
            <td>{contest_item.type}</td>
            <td>{contest_item.level}</td>
            <td>{contest_item.amount}</td>
            <td>{contest_item.hasBeginDate}</td>
            <td>{contest_item.hasExpiryDate}</td>
            <td>
                <button className="btn btn-success btn-blue" onClick={() => {
                    history.push({
                        pathname: `/${id}/contest-detail`,
                        state: { body: contest_item.description }
                    })
                }}>
                    <i className="fas fa fa-info-circle"></i>
                </button>
            </td>
        </tr>);
    });


    return (
        <div className="table-responsive portlet">
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên cuộc thi</th>
                        <th scope="col">Thể loại</th>
                        <th scope="col">Cấp độ</th>
                        <th scope="col">Số lượng tối đa tham gia</th>
                        <th scope="col">Thời gian bắt đầu</th>
                        <th scope="col">Thời gian kết thúc</th>
                        <th scope="col">Xem chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {productElements}
                </tbody>
            </table>
        </div>

    );
}

export default ContestEnd;
