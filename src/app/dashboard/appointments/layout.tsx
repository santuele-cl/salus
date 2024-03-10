"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    title: "Meeting with Client",
    start: moment()
      .set({ year: 2024, month: 3, date: 10, hour: 10, minute: 0 })
      .toDate(),
    end: moment()
      .set({ year: 2024, month: 3, date: 10, hour: 11, minute: 0 })
      .toDate(),
    resourceId: "room1",
  },
  {
    title: "Team Stand-up",
    start: moment()
      .set({ year: 2024, month: 3, date: 11, hour: 9, minute: 30 })
      .toDate(),
    end: moment()
      .set({ year: 2024, month: 3, date: 11, hour: 10, minute: 0 })
      .toDate(),
    resourceId: "room2",
  },
  {
    title: "Lunch Break",
    start: moment()
      .set({ year: 2024, month: 3, date: 12, hour: 12, minute: 0 })
      .toDate(),
    end: moment()
      .set({ year: 2024, month: 3, date: 12, hour: 13, minute: 0 })
      .toDate(),
    resourceId: "room3",
  },
];

const MyCalendar = () => (
  <div>
    <Calendar
      localizer={localizer}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      defaultView="week"
      views={["month", "week", "day"]}
      style={{ height: "800px" }}
    />
  </div>
);

export default MyCalendar;
