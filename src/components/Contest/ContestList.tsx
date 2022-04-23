import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IContestState, IMytypeState, ILevelState } from "../../store/models/root.interface";
import { IContest } from "../../store/models/contest.interface";
import { useHistory } from "react-router-dom";

export type productListProps = {
  onSelect?: (product: IContest) => void;
  children?: React.ReactNode;
};

type Options = {
  name: string;
  value: any;
}

function ContestList(props: productListProps): JSX.Element  {

  let history = useHistory();
  
  const contests: IContestState = useSelector((state: IStateType) => state.contest);
  const mytypes: IMytypeState = useSelector((state: IStateType) => state.mytypes);
  const levels: ILevelState = useSelector((state: IStateType) => state.levels);

  let typeList: string[] = []

    contests.contest.map((contest_item) => {
        return mytypes.mytypes.forEach(element => {
            if (element.id === contest_item.art_type_id) {
                return typeList.push(element.name)
            }
        });
    })

    let levelList: string[] = []

    contests.contest.map((contest_item) => {
        return levels.levels.forEach(element => {
            if (element.id === contest_item.art_level_id) {
                return levelList.push(element.name)
            }
        });
    })


  const productElements: (JSX.Element | null)[] = contests.contest.map((contest_item, index) => {
    if (!contest_item) { return null; }
    return (
      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" key={index}>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-green">{contest_item.name}</h6>
                        <div className="header-buttons">
                        </div>
                    </div>
                    <img className="card-img-top" src={require('../../assets/img/contest/contest_1.png')} alt=""></img>
                    <div className="card-body">
                        <p className="card-text">Thể loại: {typeList[index]}</p>
                        <p className="card-text">Trình độ: {levelList[index]}</p>
                        <button 
                          className="btn btn-success"
                          onClick={() => {
                              history.push({
                                pathname: '/teacher/contest-grade',
                                state: { id: contest_item.id }
                              })
                            }
                          }
                        >Chấm bài</button>
                    </div>
                </div>
            </div>
    );
  });


  return (
        <>
          {productElements}
        </>
  );
}

export default ContestList;
