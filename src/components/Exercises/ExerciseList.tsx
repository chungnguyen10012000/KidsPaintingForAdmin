import React from "react";
import { useSelector } from "react-redux";
import { IStateType, IExerciseState } from "../../store/models/root.interface";
import { IExercise } from "../../store/models/exercise.interface";

export type productListProps = {
  onSelect?: (product: IExercise) => void;
  children?: React.ReactNode;
};

function ExerciseList(props: productListProps): JSX.Element  {
  const exercises: IExerciseState = useSelector((state: IStateType) => state.exercises);

  const productElements: (JSX.Element | null)[] = exercises.exercises.map(exercise_item => {
    if (!exercise_item) { return null; }
    return (<tr className={`table-row ${(exercises.selectedExercise&& exercises.selectedExercise.id === exercise_item.id) ? "selected" : ""}`}
      onClick={() => {
        if(props.onSelect) props.onSelect(exercise_item);
      }}
      key={`exercise_${exercise_item.id}`}>
      <th scope="row">{exercise_item.id}</th>
      <td>{exercise_item.name}</td>
      <td>{exercise_item.weight}</td>
      <td>{exercise_item.maxSubmit}</td>
    </tr>);
  });


  return (
    <div className="table-responsive portlet">
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên</th>
            <th scope="col">Tỉ lệ đánh giá</th>
            <th scope="col">Số lần nộp tối đa</th>
          </tr>
        </thead>
        <tbody>
          {productElements}
        </tbody>
      </table>
    </div>

  );
}

export default ExerciseList;
