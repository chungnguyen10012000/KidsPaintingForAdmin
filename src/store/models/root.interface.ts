import { IProduct, ProductModificationStatus } from "./product.interface";
import { INotification } from "./notification.interface";
import { IUser, UserModificationStatus } from "./user.interface";
import { IOrder } from "./order.interface";
import { IAccount } from "./account.interface";
import { ICourse, CourseModificationStatus } from "./courses.interface";
import { IClass, ClassModificationStatus } from "./class.interface";
import { IContest, ContestModificationStatus } from "./contest.interface";
import { IMyClass, MyClassModificationStatus } from "./myclass.interface";
import { IMytype, MytypeModificationStatus } from "./mytypes.interface";
import { ILevel, LevelModificationStatus } from "./levels.interface";
import { IExercise, ExerciseModificationStatus } from "./exercise.interface";

export interface IRootPageStateType {
    area: string;
    subArea: string;
}

export interface IRootStateType {
    page: IRootPageStateType;
}
export interface IStateType {
    root: IRootStateType;
    products: IProductState;
    notifications: INotificationState;
    courses: ICourseState;
    class: IClassState;
    myclass: IMyClassState;
    contest: IContestState;
    users: IUserState;
    orders: IOrdersState;
    account: IAccount;
    mytypes: IMytypeState;
    levels: ILevelState;
    exercises: IExerciseState;
}

export interface IExerciseState {
    exercises: IExercise[];
    selectedExercise: IExercise | null;
    modificationState: ExerciseModificationStatus;
}

export interface ILevelState {
    levels: ILevel[];
    selectedLevel: ILevel | null;
    modificationState: LevelModificationStatus;
}

export interface IMytypeState {
    mytypes: IMytype[];
    selectedMytype: IMytype | null;
    modificationState: MytypeModificationStatus;
}

export interface IMyClassState {
    myclass: IMyClass[];
    selectedMyClass: IMyClass | null;
    modificationState: MyClassModificationStatus;
}

export interface IContestState {
    contest: IContest[];
    selectedContest: IContest | null;
    modificationState: ContestModificationStatus;
}

export interface IClassState {
    class: IClass[];
    selectedClass: IClass | null;
    modificationState: ClassModificationStatus;
}

export interface ICourseState {
    courses: ICourse[];
    selectedCourse: ICourse | null;
    modificationState: CourseModificationStatus;
}

export interface IProductState {
    products: IProduct[];
    selectedProduct: IProduct | null;
    modificationState: ProductModificationStatus;
}

export interface IActionBase {
    type: string;
    [prop: string]: any;
}

export interface IOrdersState {
    orders: IOrder[];
}

export interface INotificationState {
    notifications: INotification[];
}

export interface IUserState {
    users: IUser[];
    admins: IUser[];
    selectedUser: IUser | null;
    modificationState: UserModificationStatus;
}