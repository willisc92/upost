import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import React from "react";
const localizer = momentLocalizer(moment);

export const MyCalendar = (props) => (
    <div className="calendar_container">
        <Calendar
            localizer={localizer}
            events={props.events}
            onSelectEvent={props.onSelectEvent}
            startAccessor="start"
            endAccessor="end"
            views={["month", "day", "week"]}
        />
    </div>
);
