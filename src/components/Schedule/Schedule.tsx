import { Dispatch, Fragment } from 'react';
import * as React from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';

import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-calendars/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-lists/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-splitbuttons/styles/material.css";
import "@syncfusion/ej2-react-schedule/styles/material.css";
import { useDispatch } from 'react-redux';
import { updateCurrentPath } from '../../store/actions/root.actions';


const data = [{
    Id: 1,
    Subject: 'Meeting',
    StartTime: new Date(2022, 2, 29, 10, 0),
    EndTime: new Date(2022, 2, 29, 12, 30),
    IsAllDay: false,
    Status: 'Completed',
    Priority: 'High'
}];

const Schedule: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();
    dispatch(updateCurrentPath("Thời khóa biểu", ""));
    return (
        <Fragment>
            <ScheduleComponent height='550px' selectedDate={new Date()} eventSettings={{ dataSource: data }}>
                
                <ViewsDirective>
                    <ViewDirective option='WorkWeek' startHour='10:00' endHour='18:00'/>
                    <ViewDirective option='Week' startHour='07:00' endHour='15:00'/>
                    <ViewDirective option='Month' showWeekend={false}/>
                </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>;
        </Fragment>
    )
}

export default Schedule;