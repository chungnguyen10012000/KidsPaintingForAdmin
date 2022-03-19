import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IStateType, IMytypeState } from "../../store/models/root.interface";
import { IMytype } from "../../store/models/mytypes.interface";

export type mytypeListProps = {
  onSelect?: (mytype: IMytype) => void;
  children?: React.ReactNode;
};

function TypeList(props: mytypeListProps): JSX.Element  {
  const mytypes: IMytypeState = useSelector((state: IStateType) => state.mytypes);

  const [data, setData] = useState<IMytype[]>([])

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/typeArt')
    .then(res => res.json())
    .then(x => {
      setData(x)
    })
  })

  const mytypeElements: (JSX.Element | null)[] = data.map(mytype => {
    if (!mytype) { return null; }
    return (<tr className={`table-row ${(mytypes.selectedMytype && mytypes.selectedMytype.typeId === mytype.typeId) ? "selected" : ""}`}
      onClick={() => {
        if(props.onSelect) props.onSelect(mytype);
      }}
      key={`mytype_${mytype.typeId}`}>
      <th scope="row">{mytype.typeId}</th>
      <td>{mytype.typeName}</td>
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
    </div>

  );
}

export default TypeList;
