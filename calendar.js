/**
 * Calendar module for MHT CET Study Tracker
 * Handles calendar display and event management
 */

const CalendarModule = (function() {
    // Current date for the calendar
    let currentMonth = new Date();
    let selectedDate = new Date();
    let selectedEvent = null;
    
    /**
     * Initialize the calendar module
     */
    function init() {
        attachButtonHandlers();
        renderCalendar();
        loadUpcomingEvents();
    }
    
    /**
     * Attach button click handlers
     */
    function attachButtonHandlers() {
        // Calendar navigation
        document.getElementById('prev-month').addEventListener('click', function() {
            previousMonth();
        });
        
        document.getElementById('next-month').addEventListener('click', function() {
            nextMonth();
        });
        
        document.getElementById('today-btn').addEventListener('click', function() {
            goToToday();
        });
        
        // Event management
        document.getElementById('add-event-btn').addEventListener('click', function() {
            openEventModal();
        });
        
        document.getElementById('close-event-modal').addEventListener('click', function() {
            document.getElementById('event-modal').classList.add('hidden');
        });
        
        document.getElementById('event-form').addEventListener('submit', function(e) {
            e.preventDefault();
            saveEvent();
        });
        
        document.getElementById('delete-event').addEventListener('click', function() {
            deleteEvent();
        });
    }
    
    /**
     * Render the calendar for the current month
     */
    function renderCalendar() {
        // Update month display
        const monthNames = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];
        
        const monthYear = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
        document.getElementById('current-month').textContent = monthYear;
        
        // Get first day of the month
        const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        
        // Calculate days from previous month to include
        const dayOfWeek = firstDay.getDay(); // 0 = Sunday, 6 = Saturday
        
        // Calculate days from next month to include
        const totalDays = 42; // 6 rows of 7 days
        const daysFromCurrentMonth = lastDay.getDate();
        const daysFromPreviousMonth = dayOfWeek;
        const daysFromNextMonth = totalDays - daysFromCurrentMonth - daysFromPreviousMonth;
        
        // Get events for display
        const events = Storage.getCalendarEvents();
        
        // Clear the grid
        const calendarGrid = document.getElementById('calendar-grid');
        calendarGrid.innerHTML = '';
        
        // Add days from previous month
        const prevMonth = new Date(currentMonth);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        const prevMonthLastDay = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate();
        
        for (let i = prevMonthLastDay - daysFromPreviousMonth + 1; i <= prevMonthLastDay; i++) {
            const dayDate = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), i);
            addDayToCalendar(calendarGrid, i, dayDate, true, events);
        }
        
        // Add days from current month
        for (let i = 1; i <= daysFromCurrentMonth; i++) {
            const dayDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            addDayToCalendar(calendarGrid, i, dayDate, false, events);
        }
        
        // Add days from next month
        const nextMonth = new Date(currentMonth);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        
        for (let i = 1; i <= daysFromNextMonth; i++) {
            const dayDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i);
            addDayToCalendar(calendarGrid, i, dayDate, true, events);
        }
    }
    
    /**
     * Add a day cell to the calendar grid
     * @param {HTMLElement} grid - Calendar grid element
     * @param {number} day - Day number
     * @param {Date} date - Full date object
     * @param {boolean} isOtherMonth - Whether the day is from another month
     * @param {Array} events - Calendar events
     */
    function addDayToCalendar(grid, day, date, isOtherMonth, events) {
        // Create day cell
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        
        // Check if date is today
        const today = new Date();
        const isToday = date.getDate() === today.getDate() &&
                        date.getMonth() === today.getMonth() &&
                        date.getFullYear() === today.getFullYear();
        
        // Check if date is selected
        const isSelected = date.getDate() === selectedDate.getDate() &&
                          date.getMonth() === selectedDate.getMonth() &&
                          date.getFullYear() === selectedDate.getFullYear();
        
        // Find events for this day
        const dayEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getDate() === date.getDate() &&
                   eventDate.getMonth() === date.getMonth() &&
                   eventDate.getFullYear() === date.getFullYear();
        });
        
        // Create day content
        let contentClass = 'calendar-day-content';
        if (isOtherMonth) contentClass += ' is-other-month';
        if (isToday) contentClass += ' is-today';
        if (isSelected) contentClass += ' is-selected';
        if (dayEvents.length > 0) contentClass += ' has-event';
        
        dayCell.innerHTML = `
            <div class="${contentClass}" data-date="${date.toISOString()}">
                <div class="calendar-day-number">${day}</div>
                ${dayEvents.length > 0 ? `
                    <div class="mt-1 max-h-12 overflow-y-auto">
                        ${dayEvents.map(event => {
                            let eventClass = 'text-xs px-1 py-0.5 mt-0.5 rounded truncate';
                            
                            // Set color based on event type
                            if (event.type === 'mock') {
                                eventClass += ' bg-green-100 text-green-800';
                            } else if (event.type === 'revision') {
                                eventClass += ' bg-purple-100 text-purple-800';
                            } else if (event.type === 'deadline') {
                                eventClass += ' bg-red-100 text-red-800';
                            } else if (event.type === 'study') {
                                eventClass += ' bg-blue-100 text-blue-800';
                            } else {
                                eventClass += ' bg-gray-100 text-gray-800';
                            }
                            
                            return `<div class="${eventClass}" data-event-id="${event.id}">${event.title}</div>`;
                        }).join('')}
                    </div>
                ` : ''}
            </div>
        `;
        
        grid.appendChild(dayCell);
        
        // Add click handler for day
        const dayContent = dayCell.querySelector('.calendar-day-content');
        if (!isOtherMonth) {
            dayContent.addEventListener('click', function(e) {
                // If an event is clicked, show that event
                if (e.target.hasAttribute('data-event-id')) {
                    const eventId = e.target.getAttribute('data-event-id');
                    openEventModal(eventId);
                } else {
                    // Otherwise, set as selected date and open new event modal
                    selectedDate = new Date(date);
                    updateSelectedDay();
                    openEventModal();
                }
            });
        }
    }
    
    /**
     * Update the selected day highlight
     */
    function updateSelectedDay() {
        // Remove selected class from all days
        document.querySelectorAll('.calendar-day-content').forEach(day => {
            day.classList.remove('is-selected');
        });
        
        // Add selected class to the selected day
        const selectedDay = document.querySelector(`.calendar-day-content[data-date="${selectedDate.toISOString()}"]`);
        if (selectedDay) {
            selectedDay.classList.add('is-selected');
        }
    }
    
    /**
     * Go to the previous month
     */
    function previousMonth() {
        currentMonth.setMonth(currentMonth.getMonth() - 1);
        renderCalendar();
    }
    
    /**
     * Go to the next month
     */
    function nextMonth() {
        currentMonth.setMonth(currentMonth.getMonth() + 1);
        renderCalendar();
    }
    
    /**
     * Go to today's date
     */
    function goToToday() {
        currentMonth = new Date();
        selectedDate = new Date();
        renderCalendar();
        updateSelectedDay();
    }
    
    /**
     * Open the event modal
     * @param {string} eventId - Event ID to edit (optional)
     */
    function openEventModal(eventId = null) {
        const modal = document.getElementById('event-modal');
        const form = document.getElementById('event-form');
        const deleteBtn = document.getElementById('delete-event');
        const saveBtn = document.getElementById('save-event');
        
        // Reset form
        form.reset();
        
        // Hide delete button by default
        deleteBtn.classList.add('hidden');
        
        // Set modal title
        const modalTitle = modal.querySelector('h3');
        
        if (eventId) {
            // Editing existing event
            modalTitle.textContent = 'Edit Calendar Event';
            saveBtn.textContent = 'Update Event';
            deleteBtn.classList.remove('hidden');
            
            // Get event data
            const events = Storage.getCalendarEvents();
            const event = events.find(e => e.id === eventId);
            
            if (event) {
                // Store selected event
                selectedEvent = event;
                
                // Set form values
                document.getElementById('event-id').value = event.id;
                document.getElementById('event-title').value = event.title;
                
                // Set date
                const eventDate = new Date(event.date);
                document.getElementById('event-date').value = Utils.formatDateForInput(eventDate);
                
                // Set time if available
                if (event.time) {
                    document.getElementById('event-time').value = event.time;
                }
                
                // Set event type
                document.getElementById('event-type').value = event.type;
                
                // Set description if available
                if (event.description) {
                    document.getElementById('event-description').value = event.description;
                }
            }
        } else {
            // Adding new event
            modalTitle.textContent = 'Add Calendar Event';
            saveBtn.textContent = 'Save Event';
            
            // Clear selected event
            selectedEvent = null;
            
            // Set default date to selected date
            document.getElementById('event-date').value = Utils.formatDateForInput(selectedDate);
            document.getElementById('event-id').value = '';
        }
        
        // Show modal
        modal.classList.remove('hidden');
    }
    
    /**
     * Save or update an event
     */
    function saveEvent() {
        // Get form values
        const eventId = document.getElementById('event-id').value;
        const title = document.getElementById('event-title').value.trim();
        const dateInput = document.getElementById('event-date').value;
        const timeInput = document.getElementById('event-time').value;
        const type = document.getElementById('event-type').value;
        const description = document.getElementById('event-description').value.trim();
        
        // Validate inputs
        if (!title) {
            Utils.showAlert('Error', 'Please enter an event title', 'error');
            return;
        }
        
        if (!dateInput) {
            Utils.showAlert('Error', 'Please select a date', 'error');
            return;
        }
        
        // Create date from input
        const eventDate = new Date(dateInput);
        
        // Create event object
        const event = {
            title: title,
            date: eventDate.getTime(),
            time: timeInput,
            type: type,
            description: description
        };
        
        if (eventId) {
            // Update existing event
            event.id = eventId;
            Storage.updateCalendarEvent(eventId, event);
            Utils.showAlert('Success', 'Event updated successfully', 'success');
        } else {
            // Add new event
            Storage.addCalendarEvent(event);
            Utils.showAlert('Success', 'Event added successfully', 'success');
        }
        
        // Close modal
        document.getElementById('event-modal').classList.add('hidden');
        
        // Refresh calendar
        renderCalendar();
        loadUpcomingEvents();
        
        // Update dashboard
        Dashboard.updateUpcomingEvents();
    }
    
    /**
     * Delete an event
     */
    function deleteEvent() {
        const eventId = document.getElementById('event-id').value;
        
        if (!eventId) return;
        
        if (confirm('Are you sure you want to delete this event?')) {
            Storage.deleteCalendarEvent(eventId);
            
            // Close modal
            document.getElementById('event-modal').classList.add('hidden');
            
            // Refresh calendar
            renderCalendar();
            loadUpcomingEvents();
            
            // Update dashboard
            Dashboard.updateUpcomingEvents();
            
            Utils.showAlert('Success', 'Event deleted successfully', 'success');
        }
    }
    
    /**
     * Load and display upcoming events
     */
    function loadUpcomingEvents() {
        const events = Storage.getCalendarEvents();
        const now = new Date();
        
        // Filter upcoming events
        const upcomingEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= now;
        });
        
        // Sort by date (closest first)
        upcomingEvents.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        
        // Display events
        displayUpcomingEvents(upcomingEvents);
    }
    
    /**
     * Display upcoming events
     * @param {Array} events - Upcoming events to display
     */
    function displayUpcomingEvents(events) {
        const eventsList = document.getElementById('upcoming-events-list');
        const noEventsElement = document.getElementById('no-events');
        
        // Clear list
        eventsList.innerHTML = '';
        
        if (events.length === 0) {
            // Show empty state
            noEventsElement.classList.remove('hidden');
            return;
        }
        
        // Hide empty state
        noEventsElement.classList.add('hidden');
        
        // Add event items
        events.forEach(event => {
            const eventDate = new Date(event.date);
            const eventItem = document.createElement('li');
            eventItem.className = 'bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow';
            
            // Set icon based on event type
            let iconClass = 'fa-calendar-day';
            let bgColorClass = 'bg-blue-100';
            let textColorClass = 'text-blue-600';
            
            if (event.type === 'mock') {
                iconClass = 'fa-clipboard-check';
                bgColorClass = 'bg-green-100';
                textColorClass = 'text-green-600';
            } else if (event.type === 'revision') {
                iconClass = 'fa-book';
                bgColorClass = 'bg-purple-100';
                textColorClass = 'text-purple-600';
            } else if (event.type === 'deadline') {
                iconClass = 'fa-exclamation-circle';
                bgColorClass = 'bg-red-100';
                textColorClass = 'text-red-600';
            }
            
            eventItem.innerHTML = `
                <div class="flex items-start">
                    <div class="flex-shrink-0 w-10 h-10 ${bgColorClass} rounded-full flex items-center justify-center mr-3">
                        <i class="fas ${iconClass} ${textColorClass}"></i>
                    </div>
                    <div class="flex-1">
                        <div class="flex justify-between">
                            <div class="font-medium text-gray-800">${event.title}</div>
                            <div class="text-sm text-gray-500">${Utils.formatDate(eventDate)} ${event.time ? 'at ' + event.time : ''}</div>
                        </div>
                        ${event.description ? `<div class="text-sm text-gray-600 mt-1">${event.description}</div>` : ''}
                        <div class="mt-2 text-right">
                            <button class="text-blue-600 hover:text-blue-800 text-sm edit-event" data-id="${event.id}">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            eventsList.appendChild(eventItem);
            
            // Add edit event handler
            const editButton = eventItem.querySelector('.edit-event');
            editButton.addEventListener('click', function() {
                openEventModal(event.id);
            });
        });
    }
    
    // Public API
    return {
        init,
        renderCalendar,
        loadUpcomingEvents
    };
})();
