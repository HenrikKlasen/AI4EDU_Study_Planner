import "./Planner.css";
import {ScheduleXCalendar, useCalendarApp} from "@schedule-x/react";
import {createViewWeek, createViewMonthGrid, createViewDay} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/calendar.css";
import {createEventModalPlugin} from "@schedule-x/event-modal";

const Planner = () => {
    const savedStudyPlan = localStorage.getItem('studyPlan');
    const studyPlan = savedStudyPlan ? JSON.parse(savedStudyPlan) : [];
    const events = studyPlan.map((entry, index) => ({
        id: entry.id ?? index + 1,
        title: `${entry.topic}${entry.material ? ' (' + entry.material + ')' : ''}`,
        start: entry.start,
        end: entry.end,
        description: `Study for ${entry.topic}, using ${entry.material}. Estimated time: ${entry.hours} hours`
    }));

    console.log("Planner component rendered");
    console.log("Saved studyPlan:", savedStudyPlan);
    console.log("Raw studyPlan:", studyPlan);
    console.log("Converted events:", events);

    const calendar = useCalendarApp({
    views: [
        createViewWeek(),
        createViewMonthGrid(),
        createViewDay()
    ],
    events: events,
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