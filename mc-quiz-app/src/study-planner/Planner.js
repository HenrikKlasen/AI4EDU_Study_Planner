import "./Planner.css";
import {ScheduleXCalendar, useCalendarApp} from "@schedule-x/react";
import {createViewWeek, createViewMonthGrid, createViewDay} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/calendar.css";
import {createEventModalPlugin} from "@schedule-x/event-modal";

const Planner = ({ goHome }) => {
//function Planner() {
    console.log("Planner component rendered");

    const calendar = useCalendarApp({
    views: [
        createViewWeek(),
        createViewMonthGrid(),
        createViewDay()
    ],
    events: [
        {
          id: 1,
          title: "Dummy Event",
          start: "2025-03-18 00:00",
          end: "2025-03-18 03:00",
          description: "Do your AI4Edu project!!!"
        }
    ],
    selectedDate: "2025-03-18",
    plugins: [
        createEventModalPlugin()
    ]
  });

  return (
      <div className="Planner">
          <ScheduleXCalendar calendarApp={calendar}/>
      </div>
  );
}

export default Planner;