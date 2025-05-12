import "./Planner.css";
import {ScheduleXCalendar, useCalendarApp} from "@schedule-x/react";
import {createViewWeek, createViewMonthGrid, createViewDay} from "@schedule-x/calendar";
import "@schedule-x/theme-default/dist/calendar.css";
import {createEventModalPlugin} from "@schedule-x/event-modal";
import {createEventsServicePlugin} from "@schedule-x/events-service";
import AddEventButtonPlugin from "./addEventButtonPlugin";

/**
 * Calculate the start and end times for an event based on a base date and index. Placeholder for "real" study plan algorithm, every event is from 00:00
 * plus duration and is one day later than the event before.
 * @param baseDateStr first day
 * @param index id
 * @param hours duration of study session
 * @returns {{start: string, end: string}} start and end in correct format for schedule-x
 */
function calculateEventTimes(baseDateStr, index, hours = 1) {
    const baseDate = new Date(baseDateStr);
    const eventDate = new Date(baseDate);
    eventDate.setDate(baseDate.getDate() + index);

    const start = new Date(eventDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setHours(start.getHours() + hours);

    const formatDateTime = (date) => {
        const pad = (n) => String(n).padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
    };

    return {
        start: formatDateTime(start),
        end: formatDateTime(end)
    };
}

const Planner = () => {
    const savedStudyPlan = localStorage.getItem('studyPlan');
    const studyPlan = savedStudyPlan ? JSON.parse(savedStudyPlan) : [];

    const events = studyPlan.map((entry, index) => {
        const { start, end } = calculateEventTimes('2025-03-17', index, entry.hours || 1);

        return {
            id: entry.id ?? index + 1,
            title: `${entry.topic}${entry.material ? ' (' + entry.material + ')' : ''}`,
            start: entry.start ?? start,
            end: entry.end ?? end,
            description: `Study for ${entry.topic}, using ${entry.material}. Estimated time: ${entry.hours} hours`
        };
    });


    console.log("Planner component rendered");
    console.log("Saved studyPlan:", savedStudyPlan);
    console.log("Raw studyPlan:", studyPlan);
    console.log("Converted events:", events);

    const eventsService =  createEventsServicePlugin();
    const addEventButton = new AddEventButtonPlugin();

    const calendar = useCalendarApp({
    views: [
        createViewWeek(),
        createViewMonthGrid(),
        createViewDay()
    ],
    events: events,
    selectedDate: "2025-03-18",
    plugins: [
        createEventModalPlugin(),
        eventsService,
        addEventButton
    ]
    });

    addEventButton.eventsService = eventsService;


  return (
      <div className="Planner">
          <ScheduleXCalendar calendarApp={calendar}/>
      </div>
  );
}

export default Planner;