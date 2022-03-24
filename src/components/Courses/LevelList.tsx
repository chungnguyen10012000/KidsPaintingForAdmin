import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IStateType, ILevelState } from "../../store/models/root.interface";
import { ILevel } from "../../store/models/levels.interface";

export type levelListProps = {
  onSelect?: (level: ILevel) => void;
  children?: React.ReactNode;
};

function TypeList(props: levelListProps): JSX.Element  {

  const [data, setData] = useState<ILevel[]>([])



  //console.log('data',data)
  
  const levels: ILevelState = useSelector((state: IStateType) => state.levels);

  const levelElements: (JSX.Element | null)[] = levels.levels.map(level => {
    if (!level) { return null; }
    return (<tr className={`table-row ${(levels.selectedLevel && levels.selectedLevel.levelId === level.levelId) ? "selected" : ""}`}
      onClick={() => {
        if(props.onSelect) props.onSelect(level);
      }}
      key={`level_${level.levelId}`}>
      <th scope="row">{level.levelId}</th>
      <td>{level.levelName}</td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Mức độ</th>
          </tr>
        </thead>
        <tbody>
          {levelElements}
        </tbody>
      </table>
    </div>

  );
}

export default TypeList;
