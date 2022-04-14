import React, { useState } from "react";
import { IMyClass } from "../../store/models/myclass.interface";

const data = [
{
  "name": "CM-2",
  "amount": "6"
},
{
  "name": "CM-3",
  "amount": "6"
}
]

export type myclassListProps = {
  onSelect?: (myclass: IMyClass) => void;
  children?: React.ReactNode;
};

function SigupOfCourseList(props: myclassListProps): JSX.Element  {


  const [checkSigup, setCheckSigup] = useState(false)

  function getDisabledClass(): string {
    return checkSigup ? "disabled" : "";
  }

  const myclassElements: (JSX.Element | null)[] = data.map((class_item, index) => {
    if (!class_item) { return null; }
    return (<tr className={`table-row`}
      key={`class_${index}`}>
      <th scope="row">{index + 1}</th>
      <td>{class_item.name}</td>
      <td>{class_item.amount}</td>
      <td><button className={`btn btn-warning left-margin`}
      >
        Xem chi tiết</button> </td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên khóa học</th>
            <th scope="col">Thể loại</th>
            <th scope="col">Trình độ</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {myclassElements}
        </tbody>
      </table>
    </div>

  );
}

export default SigupOfCourseList;
