import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IClassState } from "../../store/models/root.interface";
import { IClass } from "../../store/models/class.interface";

export type classListProps = {
  onSelect?: (_class: IClass) => void;
  children?: React.ReactNode;
};

function ClassListForKid(props: classListProps): JSX.Element  {
  const myClass: IClassState = useSelector((state: IStateType) => state.class);

  const classElements: (JSX.Element | null)[] = myClass.class.map(class_item => {
    if (!class_item) { return null; }
    return (<tr className={`table-row ${(myClass.selectedClass && myClass.selectedClass.id === class_item.id) ? "selected" : ""}`}
      onClick={() => {
        if(props.onSelect) props.onSelect(class_item);
      }}
      key={`class_${class_item.id}`}>
      <th scope="row">{class_item.id}</th>
      <td>{class_item.name}</td>
      <td>{class_item.amount}</td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên lớp</th>
            <th scope="col">Số lượng tối đa học sinh</th>
          </tr>
        </thead>
        <tbody>
          {classElements}
        </tbody>
      </table>
    </div>

  );
}

export default ClassListForKid;
