/**
 * Study Timer module for MHT CET Study Tracker
 * Handles Pomodoro timer and study session tracking
 */

const StudyTimer = (function() {
    // Timer state
    let timerRunning = false;
    let timerInterval = null;
    let timeRemaining = 25 * 60; // 25 minutes in seconds
    let currentMode = 'pomodoro';
    let sessionCount = 0;
    
    /**
     * Initialize the timer module
     */
    function init() {
        attachButtonHandlers();
        loadSavedSessions();
        updateTimerDisplay();
        updateSessionsUI();
    }
    
    /**
     * Attach button click handlers
     */
    function attachButtonHandlers() {
        // Timer control buttons
        document.getElementById('start-timer').addEventListener('click', startTimer);
        document.getElementById('pause-timer').addEventListener('click', pauseTimer);
        document.getElementById('reset-timer').addEventListener('click', resetTimer);
        
        // Timer mode buttons
        document.getElementById('pomodoro-btn').addEventListener('click', function() {
            setTimerMode('pomodoro');
        });
        
        document.getElementById('short-break-btn').addEventListener('click', function() {
            setTimerMode('shortBreak');
        });
        
        document.getElementById('long-break-btn').addEventListener('click', function() {
            setTimerMode('longBreak');
        });
        
        // Manual time entry
        document.getElementById('add-manual-time').addEventListener('click', function() {
            openManualTimeModal();
        });
        
        document.getElementById('close-time-modal').addEventListener('click', function() {
            document.getElementById('manual-time-modal').classList.add('hidden');
        });
        
        document.getElementById('manual-time-form').addEventListener('submit', function(e) {
            e.preventDefault();
            addManualTime();
        });
    }
    
    /**
     * Start the timer
     */
    function startTimer() {
        if (timerRunning) return;
        
        timerRunning = true;
        
        // Show pause button, hide start button
        document.getElementById('start-timer').classList.add('hidden');
        document.getElementById('pause-timer').classList.remove('hidden');
        
        // Start the interval
        timerInterval = setInterval(updateTimer, 1000);
        
        // Log activity
        Storage.logActivity('Started timer', { mode: currentMode });
    }
    
    /**
     * Pause the timer
     */
    function pauseTimer() {
        if (!timerRunning) return;
        
        timerRunning = false;
        
        // Show start button, hide pause button
        document.getElementById('start-timer').classList.remove('hidden');
        document.getElementById('pause-timer').classList.add('hidden');
        
        // Clear the interval
        clearInterval(timerInterval);
        
        // Log activity
        Storage.logActivity('Paused timer', { mode: currentMode, timeRemaining });
    }
    
    /**
     * Reset the timer
     */
    function resetTimer() {
        // Clear the interval if running
        if (timerRunning) {
            clearInterval(timerInterval);
            timerRunning = false;
            
            // Show start button, hide pause button
            document.getElementById('start-timer').classList.remove('hidden');
            document.getElementById('pause-timer').classList.add('hidden');
        }
        
        // Reset time based on current mode
        setTimerMode(currentMode, true);
        
        // Log activity
        Storage.logActivity('Reset timer', { mode: currentMode });
    }
    
    /**
     * Set the timer mode
     * @param {string} mode - Timer mode ('pomodoro', 'shortBreak', 'longBreak')
     * @param {boolean} reset - Whether to reset the timer
     */
    function setTimerMode(mode, reset = false) {
        // Return if already in this mode and not reset
        if (mode === currentMode && !reset) return;
        
        // Stop timer if running
        if (timerRunning) {
            clearInterval(timerInterval);
            timerRunning = false;
            
            // Show start button, hide pause button
            document.getElementById('start-timer').classList.remove('hidden');
            document.getElementById('pause-timer').classList.add('hidden');
        }
        
        // Update current mode
        currentMode = mode;
        
        // Set time based on mode
        switch (mode) {
            case 'pomodoro':
                timeRemaining = 25 * 60; // 25 minutes
                document.getElementById('timer-label').textContent = 'FOCUS TIME';
                document.getElementById('timer-label').className = 'text-sm text-blue-600 font-medium';
                break;
            case 'shortBreak':
                timeRemaining = 5 * 60; // 5 minutes
                document.getElementById('timer-label').textContent = 'SHORT BREAK';
                document.getElementById('timer-label').className = 'text-sm text-green-600 font-medium';
                break;
            case 'longBreak':
                timeRemaining = 15 * 60; // 15 minutes
                document.getElementById('timer-label').textContent = 'LONG BREAK';
                document.getElementById('timer-label').className = 'text-sm text-purple-600 font-medium';
                break;
        }
        
        // Update UI
        updateTimerDisplay();
        
        // Update active button styles
        document.querySelectorAll('.pomodoro-mode').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.getElementById(`${mode}-btn`).classList.add('active');
        
        // Log activity if not reset
        if (!reset) {
            Storage.logActivity('Changed timer mode', { mode });
        }
    }
    
    /**
     * Update the timer each second
     */
    function updateTimer() {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimerDisplay();
        } else {
            // Timer finished
            clearInterval(timerInterval);
            timerRunning = false;
            
            // Show start button, hide pause button
            document.getElementById('start-timer').classList.remove('hidden');
            document.getElementById('pause-timer').classList.add('hidden');
            
            // Play alarm sound
            playAlarmSound();
            
            // Show notification
            showTimerNotification();
            
            // If pomodoro finished, record the session
            if (currentMode === 'pomodoro') {
                recordSession();
                sessionCount++;
                document.getElementById('session-count').textContent = sessionCount;
                
                // After 4 pomodoros, suggest a long break
                if (sessionCount % 4 === 0) {
                    setTimerMode('longBreak');
                } else {
                    setTimerMode('shortBreak');
                }
            } else {
                // If break finished, go back to pomodoro
                setTimerMode('pomodoro');
            }
        }
    }
    
    /**
     * Update the timer display
     */
    function updateTimerDisplay() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        
        // Format with leading zeros
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        
        // Update display
        document.getElementById('timer-display').textContent = `${formattedMinutes}:${formattedSeconds}`;
    }
    
    /**
     * Play an alarm sound when timer finishes
     */
    function playAlarmSound() {
        try {
            // Create audio element
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
            audio.play();
        } catch (error) {
            console.error('Error playing sound:', error);
        }
    }
    
    /**
     * Show a notification when timer finishes
     */
    function showTimerNotification() {
        let message = '';
        
        if (currentMode === 'pomodoro') {
            message = 'Pomodoro session completed! Take a break.';
        } else if (currentMode === 'shortBreak') {
            message = 'Break finished. Ready to focus again?';
        } else if (currentMode === 'longBreak') {
            message = 'Long break finished. Ready for another session?';
        }
        
        Utils.showAlert('Timer Finished', message, 'info', 5000);
        
        // Try to show a browser notification if supported
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('MHT CET Study Timer', {
                body: message,
                icon: '/favicon.ico'
            });
        } else if ('Notification' in window && Notification.permission !== 'denied') {
            Notification.requestPermission();
        }
    }
    
    /**
     * Record a completed pomodoro session
     */
    function recordSession() {
        // Create session object
        const session = {
            id: Utils.generateUUID(),
            timestamp: Date.now(),
            duration: 25, // minutes
            subject: 'General', // Default subject
            topic: 'Pomodoro Session',
            notes: ''
        };
        
        // Save to storage
        Storage.addStudySession(session);
        
        // Update UI
        updateSessionsUI();
        
        // Update dashboard
        Dashboard.updateTimeSpentToday();
    }
    
    /**
     * Open the manual time entry modal
     */
    function openManualTimeModal() {
        const modal = document.getElementById('manual-time-modal');
        modal.classList.remove('hidden');
        
        // Reset form
        document.getElementById('manual-time-form').reset();
        
        // Set default values
        document.getElementById('hours-input').value = 0;
        document.getElementById('minutes-input').value = 30;
    }
    
    /**
     * Add manually entered study time
     */
    function addManualTime() {
        // Get form values
        const subject = document.getElementById('subject-select').value;
        const topic = document.getElementById('topic-input').value.trim();
        const hours = parseInt(document.getElementById('hours-input').value, 10) || 0;
        const minutes = parseInt(document.getElementById('minutes-input').value, 10) || 0;
        const notes = document.getElementById('notes-input').value.trim();
        
        // Validate inputs
        if (!subject) {
            Utils.showAlert('Error', 'Please select a subject', 'error');
            return;
        }
        
        if (hours === 0 && minutes === 0) {
            Utils.showAlert('Error', 'Please enter a valid study time', 'error');
            return;
        }
        
        // Calculate total minutes
        const totalMinutes = (hours * 60) + minutes;
        
        // Create session object
        const session = {
            id: Utils.generateUUID(),
            timestamp: Date.now(),
            duration: totalMinutes,
            subject: subject,
            topic: topic || 'General Study',
            notes: notes
        };
        
        // Save to storage
        Storage.addStudySession(session);
        
        // Close modal
        document.getElementById('manual-time-modal').classList.add('hidden');
        
        // Update UI
        updateSessionsUI();
        
        // Update dashboard
        Dashboard.updateTimeSpentToday();
        
        // Show success message
        Utils.showAlert('Success', 'Study time added successfully', 'success');
    }
    
    /**
     * Load saved study sessions
     */
    function loadSavedSessions() {
        const sessions = Storage.getStudySessions();
        
        // Count sessions for today
        const today = Utils.getTodayTimestamps();
        const todaySessions = sessions.filter(session => {
            return session.timestamp >= today.start && session.timestamp <= today.end;
        });
        
        // Update session count
        sessionCount = todaySessions.filter(session => session.topic === 'Pomodoro Session').length;
        document.getElementById('session-count').textContent = sessionCount;
    }
    
    /**
     * Update the sessions UI
     */
    function updateSessionsUI() {
        const sessions = Storage.getStudySessions();
        
        // Get today's timestamps
        const today = Utils.getTodayTimestamps();
        
        // Filter sessions for today
        const todaySessions = sessions.filter(session => {
            return session.timestamp >= today.start && session.timestamp <= today.end;
        }).sort((a, b) => b.timestamp - a.timestamp); // Sort by most recent first
        
        // Calculate total time per subject
        const subjectTotals = {
            Physics: 0,
            Chemistry: 0,
            Mathematics: 0,
            General: 0
        };
        
        let totalMinutes = 0;
        
        todaySessions.forEach(session => {
            const subject = session.subject || 'General';
            subjectTotals[subject] += session.duration || 0;
            totalMinutes += session.duration || 0;
        });
        
        // Update total time
        document.getElementById('total-time-today').textContent = Utils.formatDuration(totalMinutes);
        
        // Update subject breakdown
        document.getElementById('physics-time').textContent = Utils.formatDuration(subjectTotals.Physics);
        document.getElementById('chemistry-time').textContent = Utils.formatDuration(subjectTotals.Chemistry);
        document.getElementById('mathematics-time').textContent = Utils.formatDuration(subjectTotals.Mathematics);
        document.getElementById('general-time').textContent = Utils.formatDuration(subjectTotals.General);
        
        // Display sessions
        displayTodaySessions(todaySessions);
        
        // Update weekly chart
        updateWeeklySummary();
    }
    
    /**
     * Display today's study sessions
     * @param {Array} sessions - Today's study sessions
     */
    function displayTodaySessions(sessions) {
        const sessionsList = document.getElementById('sessions-list');
        const noSessionsElement = document.getElementById('no-sessions');
        
        // Clear list
        sessionsList.innerHTML = '';
        
        if (sessions.length === 0) {
            // Show empty state
            noSessionsElement.classList.remove('hidden');
            return;
        }
        
        // Hide empty state
        noSessionsElement.classList.add('hidden');
        
        // Create session items
        sessions.forEach(session => {
            const sessionTime = new Date(session.timestamp);
            const sessionItem = document.createElement('div');
            sessionItem.className = 'bg-gray-50 rounded p-3';
            
            // Set icon based on subject
            let iconClass = 'fa-book';
            let iconColor = 'text-blue-600';
            
            if (session.subject === 'Physics') {
                iconClass = 'fa-atom';
                iconColor = 'text-blue-600';
            } else if (session.subject === 'Chemistry') {
                iconClass = 'fa-flask';
                iconColor = 'text-green-600';
            } else if (session.subject === 'Mathematics') {
                iconClass = 'fa-calculator';
                iconColor = 'text-purple-600';
            }
            
            sessionItem.innerHTML = `
                <div class="flex justify-between items-start">
                    <div class="flex items-start">
                        <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                            <i class="fas ${iconClass} ${iconColor}"></i>
                        </div>
                        <div>
                            <div class="font-medium">${session.subject} - ${session.topic}</div>
                            <div class="text-xs text-gray-500">${Utils.formatTime(sessionTime)}</div>
                        </div>
                    </div>
                    <div class="text-sm font-bold">${Utils.formatDuration(session.duration)}</div>
                </div>
                ${session.notes ? `
                <div class="mt-2 text-sm text-gray-600 pl-11">
                    ${session.notes}
                </div>
                ` : ''}
            `;
            
            sessionsList.appendChild(sessionItem);
        });
    }
    
    /**
     * Update weekly study summary chart
     */
    function updateWeeklySummary() {
        const sessions = Storage.getStudySessions();
        const weekDates = Utils.getCurrentWeekDates();
        const dayNames = Utils.getDayNames();
        
        // Initialize data array with zeros
        const weeklyData = [0, 0, 0, 0, 0, 0, 0]; // Sun to Sat
        
        // Populate data
        sessions.forEach(session => {
            const sessionDate = new Date(session.timestamp);
            
            // Check if session is in current week
            for (let i = 0; i < weekDates.length; i++) {
                if (Utils.isSameDay(sessionDate, weekDates[i])) {
                    weeklyData[i] += session.duration / 60; // Convert to hours
                    break;
                }
            }
        });
        
        // Get canvas and destroy existing chart if any
        const ctx = document.getElementById('weekly-study-chart').getContext('2d');
        
        // Get existing chart instance
        const existingChart = Chart.getChart(ctx);
        if (existingChart) {
            existingChart.destroy();
        }
        
        // Create new chart
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dayNames,
                datasets: [{
                    label: 'Hours Studied',
                    data: weeklyData.map(minutes => Math.round(minutes * 10) / 10), // Round to 1 decimal
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.7)', // Sunday
                        'rgba(16, 185, 129, 0.7)', // Monday
                        'rgba(139, 92, 246, 0.7)', // Tuesday
                        'rgba(239, 68, 68, 0.7)',  // Wednesday
                        'rgba(245, 158, 11, 0.7)', // Thursday
                        'rgba(6, 182, 212, 0.7)',  // Friday
                        'rgba(236, 72, 153, 0.7)'  // Saturday
                    ],
                    borderColor: [
                        'rgba(59, 130, 246, 1)',
                        'rgba(16, 185, 129, 1)',
                        'rgba(139, 92, 246, 1)',
                        'rgba(239, 68, 68, 1)',
                        'rgba(245, 158, 11, 1)',
                        'rgba(6, 182, 212, 1)',
                        'rgba(236, 72, 153, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Hours'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + 'h';
                            }
                        }
                    }
                }
            }
        });
        
        // Update summary stats
        updateWeeklySummaryStats(weeklyData);
    }
    
    /**
     * Update weekly summary statistics
     * @param {Array} weeklyData - Weekly hours data
     */
    function updateWeeklySummaryStats(weeklyData) {
        const dayNames = Utils.getDayNames();
        
        // Calculate total hours
        const totalHours = weeklyData.reduce((sum, hours) => sum + hours, 0);
        document.getElementById('week-total').textContent = `${Math.round(totalHours)}h`;
        
        // Calculate daily average
        const average = totalHours / 7;
        document.getElementById('daily-average').textContent = `${Math.round(average * 10) / 10}h`;
        
        // Find most productive day
        let maxHours = 0;
        let maxDayIndex = -1;
        
        weeklyData.forEach((hours, index) => {
            if (hours > maxHours) {
                maxHours = hours;
                maxDayIndex = index;
            }
        });
        
        if (maxDayIndex >= 0 && maxHours > 0) {
            document.getElementById('most-productive-day').textContent = dayNames[maxDayIndex];
        } else {
            document.getElementById('most-productive-day').textContent = 'N/A';
        }
        
        // Calculate weekly goal progress (goal: 40 hours)
        const weeklyGoal = 40; // hours
        const goalPercentage = Math.min(100, Math.round((totalHours / weeklyGoal) * 100));
        document.getElementById('weekly-goal-status').textContent = `${goalPercentage}%`;
    }
    
    // Public API
    return {
        init,
        updateSessionsUI
    };
})();
