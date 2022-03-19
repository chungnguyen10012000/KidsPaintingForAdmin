import { ILevelState, IActionBase } from "../models/root.interface";
import { ADD_LEVEL, CHANGE_LEVEL_PENDING_EDIT, EDIT_LEVEL, REMOVE_LEVEL,
    CLEAR_LEVEL_PENDING_EDIT, SET_MODIFICATION_STATE, CHANGE_LEVEL_AMOUNT} from "../actions/levels.actions";
import { ILevel, LevelModificationStatus } from "../models/levels.interface";



const initialState: ILevelState = {
    modificationState: LevelModificationStatus.None,
    selectedLevel: null,
    levels: [{
        levelId: 1, levelName: "5-9 tuổi"
    }]
};

function levelsReducer(state: ILevelState = initialState, action: IActionBase): ILevelState {
    switch (action.type) {
        case ADD_LEVEL: {
            let maxId: number = Math.max.apply(Math, state.levels.map(function(o) { return o.levelId; }));
            action.level.levelId = maxId + 1;
            return { ...state, levels: [...state.levels, action.level]};
        }
        case EDIT_LEVEL: {
            const foundIndex: number = state.levels.findIndex(pr => pr.levelId === action.level.levelId);
            let levels: ILevel[] = state.levels;
            levels[foundIndex] = action.level;
            return { ...state, levels: levels };
        }
        case REMOVE_LEVEL: {
            return { ...state, levels: state.levels.filter(pr => pr.levelId !== action.levelId) };
        }
        case CHANGE_LEVEL_PENDING_EDIT: {
            return { ...state, selectedLevel: action.level };
        }
        case CLEAR_LEVEL_PENDING_EDIT: {
            return { ...state, selectedLevel: null };
        }
        case SET_MODIFICATION_STATE: {
            return { ...state, modificationState: action.value };
        }
        case CHANGE_LEVEL_AMOUNT: {
            const foundIndex: number = state.levels.findIndex(pr => pr.levelId === action.id);
            let levels: ILevel[] = state.levels;
            levels[foundIndex].levelId = levels[foundIndex].levelId - action.amount;
            return { ...state, levels: levels };
        }
        default:
            return state;
    }
}


export default levelsReducer;