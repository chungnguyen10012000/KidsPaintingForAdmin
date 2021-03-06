import React, { Fragment, Dispatch, useState, useEffect } from "react";
import CalendarForm from "./CalendarForm";
import CalendarList from "./CalendarList";
import TopCard from "../../common/components/TopCard";
import "./Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentPath } from "../../store/actions/root.actions";
import { IScheduleState, IStateType, IRootPageStateType, IScheduleItemState } from "../../store/models/root.interface";
import Popup from "reactjs-popup";
import {
    clearSelectedSchedule, setModificationState,
    changeSelectedSchedule
} from "../../store/actions/schedule.actions";
import { addNotification } from "../../store/actions/notifications.action";
import { ScheduleModificationStatus, ISchedule } from "../../store/models/schedule.interface";
import { ScheduleItemModificationStatus, IScheduleItem } from "../../store/models/schedule_item.interface";
import { changeSelectedScheduleItem, clearSelectedScheduleItem, setModificationStateItem } from "../../store/actions/schedule_item.actions";
import CalendarItemForm from "./CalendarItemForm";
import CalendarItemList from "./CalendarItemList";
import { getSchedule } from "../../common/service/schedule/getSchedule";
import { deleteSchedule } from "../../common/service/schedule/deleteSchedule";
import { getScheduleItem } from "../../common/service/schedule_item/getScheduleItem";
import { deleteScheduleItem } from "../../common/service/schedule_item/deleteScheduleItem";
import { getLessonTime } from "../../common/service/lesson_time/getLessonTime";

type role = {
    id: string;
};

const Calendar: React.FC = () => {

    const dispatch: Dispatch<any> = useDispatch();
    const schedules: IScheduleState = useSelector((state: IStateType) => state.schedules);
    const scheduleItems: IScheduleItemState = useSelector((state: IStateType) => state.scheduleItems);
    const path: IRootPageStateType = useSelector((state: IStateType) => state.root.page);
    const numberItemsCount: number = schedules.schedules.length;
    const numberItemsCount1: number = scheduleItems.scheduleItems.length;
    const [popup, setPopup] = useState(false);
    const [popup1, setPopup1] = useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");

    const handleChange = (event: any) => {
        setSearchTerm(event.target.value);
    };
    console.log(searchTerm)

    useEffect(() => {
        dispatch(getSchedule())
    }, [ dispatch]);

    useEffect(() => {
        dispatch(getScheduleItem())
    }, [ dispatch]);

    useEffect(() => {
        dispatch(getLessonTime())
    }, [dispatch]);

    useEffect(() => {
        dispatch(clearSelectedSchedule());
        dispatch(clearSelectedScheduleItem());
        dispatch(updateCurrentPath("L???ch", "Danh s??ch"));
    }, [path.area, dispatch]);

    function onScheduleSelect(schedule: ISchedule): void {
        dispatch(changeSelectedSchedule(schedule));
        dispatch(setModificationState(ScheduleModificationStatus.None));
    }

    function onScheduleItemSelect(schedule: IScheduleItem): void {
        dispatch(changeSelectedScheduleItem(schedule));
        dispatch(setModificationStateItem(ScheduleItemModificationStatus.None));
    }

    function onScheduleRemove() {
        if (schedules.selectedSchedule) {
            setPopup(true);
        }
    }

    function onScheduleItemRemove() {
        if (scheduleItems.selectedScheduleItem) {
            setPopup1(true);
        }
    }
    const [isCheckOpen1, setIsCheckOpen1] = useState(false)
    const [isCheckOpen2, setIsCheckOpen2] = useState(false)
    const [isCheckOpen3, setIsCheckOpen3] = useState(false)
    const [isCheckOpen4, setIsCheckOpen4] = useState(false)

    return (
        <Fragment>
            <h1 className="h3 mb-2 text-gray-800">L???ch </h1>
            <p className="mb-4">Th??ng tin chung</p>
            <div className="row">
                <TopCard title="T???NG S??? L???CH CHUNG" text={`${numberItemsCount}`} icon="box" class="primary" />
                <TopCard title="T???NG S??? L???CH CHI TI???T" text={`${numberItemsCount1}`} icon="box" class="primary" />
                <div className="col-xl-6 col-md-6 mb-4">
                    <div className="card-body">
                        <input
                            type="text"
                            placeholder="T??m ki???m"
                            value={searchTerm}
                            onChange={handleChange}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <button className="btn btn-success btn-green btn-create" onClick={() => {
                        dispatch(setModificationState(ScheduleModificationStatus.Create))
                        setIsCheckOpen1(!isCheckOpen1)
                    }}
                    >
                        <i className="fas fa fa-plus"></i>
                        Th??m l???ch h???c chung
                    </button>
                </div>

                {((schedules.modificationState === ScheduleModificationStatus.Create) && isCheckOpen1 === true) ?
                    <CalendarForm /> : null}
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh s??ch l???ch chung</h6>
                            <div className="header-buttons">
                                <button className="btn btn-success btn-blue" onClick={() => {
                                    dispatch(setModificationState(ScheduleModificationStatus.Edit))
                                    if (schedules.selectedSchedule){
                                        setIsCheckOpen2(!isCheckOpen2)
                                    }
                                }}>
                                    <i className="fas fa fa-pen"></i>
                                    Ch???nh s???a
                                </button>
                                <button className="btn btn-success btn-red" onClick={() => onScheduleRemove()}>
                                    <i className="fas fa fa-times"></i>
                                    X??a
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <CalendarList
                                onSelect={onScheduleSelect}
                            />
                        </div>
                    </div>
                </div>
                {((schedules.modificationState === ScheduleModificationStatus.Edit && schedules.selectedSchedule && isCheckOpen2 === true)) ?
                    <CalendarForm /> : null}
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <button className="btn btn-success btn-green btn-create" onClick={() => {
                        dispatch(setModificationStateItem(ScheduleItemModificationStatus.Create))
                        setIsCheckOpen3(!isCheckOpen3)
                    }}
                    >
                        <i className="fas fa fa-plus"></i>
                        Th??m l???ch h???c chi ti???t
                    </button>
                </div>

                {((scheduleItems.modificationState === ScheduleItemModificationStatus.Create) && isCheckOpen3 === true) ?
                    <CalendarItemForm /> : null}
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-green">Danh s??ch l???ch chi ti???t</h6>
                            <div className="header-buttons">
                                <button className="btn btn-success btn-blue btn-y" onClick={() => {
                                    dispatch(setModificationStateItem(ScheduleItemModificationStatus.Edit))
                                    if (scheduleItems.selectedScheduleItem){
                                        setIsCheckOpen4(!isCheckOpen4)
                                    }
                                }}>
                                    <i className="fas fa fa-pen"></i>
                                    Ch???nh s???a
                                </button>
                                <button className="btn btn-success btn-red btn-z" onClick={() => onScheduleItemRemove()}>
                                    <i className="fas fa fa-times"></i>
                                    X??a
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <CalendarItemList
                                onSelect={onScheduleItemSelect}
                            />
                        </div>
                    </div>
                </div>
                {((scheduleItems.modificationState === ScheduleItemModificationStatus.Edit && scheduleItems.selectedScheduleItem && isCheckOpen4 === true)) ?
                    <CalendarItemForm /> : null}
            </div> 

            <Popup
                className="popup-modal"
                open={popup}
                onClose={() => setPopup(false)}
                closeOnDocumentClick
            >
                <div className="popup-modal">
                    <div className="popup-title">
                        B???n ch???c ch???n?
                    </div>
                    <div className="popup-content">
                        <button type="button"
                            className="btn btn-danger"
                            onClick={() => {
                                if (!schedules.selectedSchedule) {
                                    return;
                                }
                                dispatch(addNotification("L???ch", ` ${schedules.selectedSchedule.name} ???? b??? x??a kh???i h??? th???ng`));
                                dispatch(deleteSchedule(schedules.selectedSchedule.id));
                                dispatch(clearSelectedSchedule());
                                setPopup(false);
                            }}>X??a
                        </button>
                    </div>
                </div>
            </Popup>


            <Popup
                className="popup-modal"
                open={popup1}
                onClose={() => setPopup1(false)}
                closeOnDocumentClick
            >
                <div className="popup-modal">
                    <div className="popup-title">
                        B???n ch???c ch???n?
                    </div>
                    <div className="popup-content">
                        <button type="button"
                            className="btn btn-danger"
                            onClick={() => {
                                if (!scheduleItems.selectedScheduleItem) {
                                    return;
                                }
                                dispatch(addNotification("L???ch", ` ???? b??? x??a kh???i h??? th???ng`));
                                dispatch(deleteScheduleItem(scheduleItems.selectedScheduleItem.id));
                                dispatch(clearSelectedScheduleItem());
                                setPopup1(false);
                            }}>X??a
                        </button>
                    </div>
                </div>
            </Popup>
        </Fragment >
    );
};

export default Calendar;
