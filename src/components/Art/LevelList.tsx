import React from "react";
import { useSelector } from "react-redux";
import { IStateType, ILevelState } from "../../store/models/root.interface";
import { ILevel } from "../../store/models/levels.interface";

export type levelListProps = {
  onSelect?: (level: ILevel) => void;
  children?: React.ReactNode;
};

function TypeList(props: levelListProps): JSX.Element  {




  //console.log('data',data)
  
  const levels: ILevelState = useSelector((state: IStateType) => state.levels);

  const levelElements: (JSX.Element | null)[] = levels.levels.map((level, index) => {
    if (!level) { return null; }
    return (<tr className={`table-row ${(levels.selectedLevel && levels.selectedLevel.id === level.id) ? "selected" : ""}`}
      onClick={() => {
        if(props.onSelect) props.onSelect(level);
      }}
      key={`level_${level.id}`}>
      <th scope="row">{index}</th>
      <td>{level.name}</td>
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
      <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="">Previous</a></li>
                    <li className="page-item"><a className="page-link" href="">1</a></li>
                    <li className="page-item"><a className="page-link" href="">2</a></li>
                    <li className="page-item"><a className="page-link" href="">3</a></li>
                    <li className="page-item"><a className="page-link" href="">Next</a></li>
                  </ul>
                </nav>
    </div>

  );
}

export default TypeList;
