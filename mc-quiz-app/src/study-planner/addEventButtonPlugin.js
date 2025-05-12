import {createEventsServicePlugin} from "@schedule-x/events-service";

/**
 * Custom plugin for "Add Event" button in schedule-x calendar header.
 */
class AddEventButtonPlugin {
    name = 'add-event-button-plugin';

    constructor() {
        this.eventsService = createEventsServicePlugin();
    }


    onRender($app) {
        console.log('--- $app ---', $app);


        if (document.getElementById('add-event-button')) return;
        const header = document.querySelector('.sx__calendar-header');
        if (!header) return;

        // create button
        const button = document.createElement('button');
        button.id = 'add-event-button';
        button.innerText = 'Add Event';
        button.style.fontSize = '14px';
        button.style.marginLeft = 'auto';
        button.style.padding = '12px 16px';
        button.style.backgroundColor = '#3498db';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.cursor = 'pointer';

        button.addEventListener('click', () => {
            const newEvent = {
                id: Date.now(),
                title: 'AI4EDU Deadline',
                start: '2025-03-19 04:00',
                end: '2025-03-19 05:00',
                description: 'Added via header button',
            };
            this.eventsService.add(newEvent);
        });
        header.appendChild(button);
    }
}

export default AddEventButtonPlugin;
