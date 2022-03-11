import { IExerciseState, IActionBase } from "../models/root.interface";
import { ADD_EXERCISE, CHANGE_EXERCISE_PENDING_EDIT, EDIT_EXERCISE, REMOVE_EXERCISE,
    CLEAR_EXERCISE_PENDING_EDIT, SET_MODIFICATION_STATE, CHANGE_EXERCISE_AMOUNT} from "../actions/exercise.actions";
import { IExercise, ExerciseModificationStatus } from "../models/exercise.interface";



const initialState: IExerciseState = {
    modificationState: ExerciseModificationStatus.None,
    selectedExercise: null,
    exercises: [{
        id: 1, name: "Vẽ con mèo", body: '...', maxSubmit: 3, weight: 10
    }]
};

function exercisesReducer(state: IExerciseState = initialState, action: IActionBase): IExerciseState {
    switch (action.type) {
        case ADD_EXERCISE: {
            let maxId: number = Math.max.apply(Math, state.exercises.map(function(o) { return o.id; }));
            action.exercise.id = maxId + 1;
            return { ...state, exercises: [...state.exercises, action.exercise]};
        }
        case EDIT_EXERCISE: {
            const foundIndex: number = state.exercises.findIndex(pr => pr.id === action.exercise.id);
            let exercises: IExercise[] = state.exercises;
            exercises[foundIndex] = action.exercise;
            return { ...state, exercises: exercises };
        }
        case REMOVE_EXERCISE: {
            return { ...state, exercises: state.exercises.filter(pr => pr.id !== action.id) };
        }
        case CHANGE_EXERCISE_PENDING_EDIT: {
            return { ...state, selectedExercise: action.exercise };
        }
        case CLEAR_EXERCISE_PENDING_EDIT: {
            return { ...state, selectedExercise: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        case CHANGE_EXERCISE_AMOUNT: {
            const foundIndex: number = state.exercises.findIndex(pr => pr.id === action.id);
            let exercises: IExercise[] = state.exercises;
            exercises[foundIndex].id = exercises[foundIndex].id - action.amount;
            return { ...state, exercises: exercises };
        }
        default:
            return state;
    }
}


export default exercisesReducer;