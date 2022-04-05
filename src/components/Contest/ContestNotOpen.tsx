import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IContestState } from "../../store/models/root.interface";

function ContestNotOpen(): JSX.Element {
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
                    </tr>
                </thead>
                <tbody>
                    {productElements}
                </tbody>
            </table>
        </div>

    );
}

export default ContestNotOpen;
