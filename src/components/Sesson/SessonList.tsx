import React from "react";
import { useSelector } from "react-redux";
import { IStateType, ISessonState } from "../../store/models/root.interface";
import { ISesson } from "../../store/models/sesson.interface";

export type sessonListProps = {
  onSelect?: (sesson: ISesson) => void;
  children?: React.ReactNode;
};

function SessonList(props: sessonListProps): JSX.Element  {
  const sesson: ISessonState = useSelector((state: IStateType) => state.sessons);

  const sessonElements: (JSX.Element | null)[] = sesson.sessons.map(class_item => {
    if (!class_item) { return null; }
    return (<tr className={`table-row ${(sesson.selectedSesson && sesson.selectedSesson.id === class_item.id) ? "selected" : ""}`}
      onClick={() => {
        if(props.onSelect) props.onSelect(class_item);
      }}
      key={`class_${class_item.id}`}>
      <th scope="row">{class_item.id}</th>
      <td>{class_item.name}</td>
      <td>{class_item.startTime}</td>
      <td>{class_item.currentDay}</td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên buổi học</th>
            <th scope="col">Thơi gian học</th>
            <th scope="col">Ngày học</th>
          </tr>
        </thead>
        <tbody>
          {sessonElements}
        </tbody>
      </table>
    </div>

  );
}

export default SessonList;
