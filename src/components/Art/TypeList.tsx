import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IMytypeState } from "../../store/models/root.interface";
import { IMytype } from "../../store/models/mytypes.interface";

export type mytypeListProps = {
  onSelect?: (mytype: IMytype) => void;
  children?: React.ReactNode;
};

function TypeList(props: mytypeListProps): JSX.Element  {
  const mytypes: IMytypeState = useSelector((state: IStateType) => state.mytypes);


  const mytypeElements: (JSX.Element | null)[] = mytypes.mytypes.map( (mytype, index) => {
    if (!mytype) { return null; }
    return (<tr className={`table-row ${(mytypes.selectedMytype && mytypes.selectedMytype.id === mytype.id) ? "selected" : ""}`}
      onClick={() => {
        if(props.onSelect) props.onSelect(mytype);
      }}
      key={`mytype_${index}`}>
      <th scope="row">{index}</th>
      <td>{mytype.name}</td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên thể loại</th>
          </tr>
        </thead>
        <tbody>
          {mytypeElements}
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
