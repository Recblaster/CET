/**
 * Storage module for MHT CET Study Tracker
 * Handles data persistence using localStorage
 */

const Storage = (function() {
    // Storage keys
    const KEYS = {
        USER_DATA: 'mht_cet_user_data',
        COUNTDOWN_DATES: 'mht_cet_countdown_dates',
        STUDY_SESSIONS: 'mht_cet_study_sessions',
        MOCK_TESTS: 'mht_cet_mock_tests',
        SYLLABUS_PROGRESS: 'mht_cet_syllabus_progress',
        STUDY_PLAN_PROGRESS: 'mht_cet_study_plan_progress',
        CALENDAR_EVENTS: 'mht_cet_calendar_events',
        ERROR_TRACKER: 'mht_cet_error_tracker',
        ACTIVITY_LOG: 'mht_cet_activity_log',
        APP_TITLE: 'mht_cet_app_title'
    };
    
    // Default data structure
    const defaultData = {
        userData: {
            lastSaved: Date.now()
        },
        countdownDates: {
            startDate: null,
            examDate: null
        },
        appTitle: {
            title: "MHT CET Study Tracker",
            subtitle: "Your 5-Day PYQ Preparation Plan"
        },
        studySessions: [],
        mockTests: [],
        syllabusProgress: {
            physics: {
                topics: {}
            },
            chemistry: {
                topics: {}
            },
            mathematics: {
                topics: {}
            }
        },
        studyPlanProgress: {
            day1: [],
            day2: [],
            day3: [], 
            day4: [],
            day5: []
        },
        calendarEvents: [],
        errorTracker: [],
        activityLog: []
    };
    
    /**
     * Initialize storage with default values if not already set
     */
    function init() {
        // Set defaults if storage is empty
        Object.keys(KEYS).forEach(key => {
            const storageKey = KEYS[key];
            if (!localStorage.getItem(storageKey)) {
                const dataKey = key.toLowerCase();
                if (defaultData[dataKey]) {
                    localStorage.setItem(storageKey, JSON.stringify(defaultData[dataKey]));
                }
            }
        });
    }
    
    /**
     * Get data from localStorage
     * @param {string} key - Storage key
     * @returns {*} - Parsed data from storage or null
     */
    function get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error(`Error getting data for ${key}:`, error);
            return null;
        }
    }
    
    /**
     * Save data to localStorage
     * @param {string} key - Storage key
     * @param {*} data - Data to save
     * @returns {boolean} - True if saved successfully
     */
    function save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(`Error saving data for ${key}:`, error);
            return false;
        }
    }
    
    /**
     * Save all data to localStorage
     * @returns {boolean} - True if all data saved successfully
     */
    function saveAll() {
        try {
            // Update last saved timestamp
            const userData = get(KEYS.USER_DATA) || defaultData.userData;
            userData.lastSaved = Date.now();
            save(KEYS.USER_DATA, userData);
            
            Utils.showAlert('Success', 'Your progress has been saved', 'success');
            
            // Log activity
            logActivity('Saved progress');
            
            return true;
        } catch (error) {
            console.error('Error saving all data:', error);
            Utils.showAlert('Error', 'Failed to save your progress', 'error');
            return false;
        }
    }
    
    /**
     * Export all data for sharing
     * @returns {string} - Encoded data string
     */
    function exportData() {
        try {
            const exportData = {};
            
            // Export all data except activity log
            Object.keys(KEYS).forEach(key => {
                if (key !== 'ACTIVITY_LOG') {
                    const storageKey = KEYS[key];
                    exportData[storageKey] = get(storageKey);
                }
            });
            
            // Convert to JSON and encode
            const jsonData = JSON.stringify(exportData);
            return btoa(jsonData);
        } catch (error) {
            console.error('Error exporting data:', error);
            return null;
        }
    }
    
    /**
     * Import data from shared string
     * @param {string} encodedData - Encoded data string
     * @returns {boolean} - True if import was successful
     */
    function importData(encodedData) {
        try {
            // Decode and parse data
            const jsonData = atob(encodedData);
            const importData = JSON.parse(jsonData);
            
            // Import each data set
            Object.keys(importData).forEach(key => {
                save(key, importData[key]);
            });
            
            // Log activity
            logActivity('Imported shared data');
            
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }
    
    /**
     * Log user activity
     * @param {string} action - Description of the action
     * @param {Object} details - Additional details (optional)
     */
    function logActivity(action, details = {}) {
        try {
            const activities = get(KEYS.ACTIVITY_LOG) || [];
            
            // Add new activity entry
            activities.unshift({
                id: Utils.generateUUID(),
                timestamp: Date.now(),
                action: action,
                details: details
            });
            
            // Limit to 100 most recent activities
            if (activities.length > 100) {
                activities.length = 100;
            }
            
            save(KEYS.ACTIVITY_LOG, activities);
        } catch (error) {
            console.error('Error logging activity:', error);
        }
    }
    
    /**
     * Get countdown dates
     * @returns {Object} - Start and exam dates
     */
    function getCountdownDates() {
        return get(KEYS.COUNTDOWN_DATES) || defaultData.countdownDates;
    }
    
    /**
     * Save countdown dates
     * @param {Date} startDate - Start date
     * @param {Date} examDate - Exam date
     */
    function saveCountdownDates(startDate, examDate) {
        const dates = {
            startDate: startDate ? startDate.getTime() : null,
            examDate: examDate ? examDate.getTime() : null
        };
        
        save(KEYS.COUNTDOWN_DATES, dates);
        logActivity('Updated exam countdown dates');
    }
    
    /**
     * Get syllabus progress
     * @returns {Object} - Syllabus progress data
     */
    function getSyllabusProgress() {
        return get(KEYS.SYLLABUS_PROGRESS) || defaultData.syllabusProgress;
    }
    
    /**
     * Update topic completion status
     * @param {string} subject - Subject name
     * @param {string} topicId - Topic ID
     * @param {boolean} completed - Completion status
     */
    function updateTopicStatus(subject, topicId, completed) {
        const progress = getSyllabusProgress();
        
        // Ensure subject exists
        if (!progress[subject]) {
            progress[subject] = { topics: {} };
        }
        
        // Update topic status
        progress[subject].topics[topicId] = {
            completed: completed,
            timestamp: Date.now()
        };
        
        save(KEYS.SYLLABUS_PROGRESS, progress);
        logActivity('Updated topic status', { subject, topicId, completed });
    }
    
    /**
     * Get study plan progress
     * @returns {Object} - Study plan progress data
     */
    function getStudyPlanProgress() {
        return get(KEYS.STUDY_PLAN_PROGRESS) || defaultData.studyPlanProgress;
    }
    
    /**
     * Update study plan task status
     * @param {string} day - Day identifier (day1, day2, etc.)
     * @param {string} taskId - Task ID
     * @param {boolean} completed - Completion status
     * @param {number} planNumber - Plan number (1 or 2), defaults to 1
     */
    function updateStudyPlanTask(day, taskId, completed, planNumber = 1) {
        const progress = getStudyPlanProgress();
        
        // Create the appropriate key for the plan (e.g. day1 or plan2_day1)
        const dayKey = planNumber === 1 ? day : `plan${planNumber}_${day}`;
        
        // Find task in the array or add it
        if (!progress[dayKey]) {
            progress[dayKey] = [];
        }
        
        // Check if task exists
        const taskIndex = progress[dayKey].findIndex(task => task.id === taskId);
        
        if (taskIndex >= 0) {
            // Update existing task
            progress[dayKey][taskIndex] = {
                id: taskId,
                completed: completed,
                timestamp: Date.now()
            };
        } else {
            // Add new task
            progress[dayKey].push({
                id: taskId,
                completed: completed,
                timestamp: Date.now()
            });
        }
        
        save(KEYS.STUDY_PLAN_PROGRESS, progress);
        logActivity('Updated study plan task', { day, taskId, completed });
    }
    
    /**
     * Get study sessions
     * @returns {Array} - Study session data
     */
    function getStudySessions() {
        return get(KEYS.STUDY_SESSIONS) || [];
    }
    
    /**
     * Add a study session
     * @param {Object} session - Study session details
     */
    function addStudySession(session) {
        const sessions = getStudySessions();
        
        // Add ID and timestamp if not provided
        const newSession = {
            id: session.id || Utils.generateUUID(),
            timestamp: session.timestamp || Date.now(),
            ...session
        };
        
        sessions.push(newSession);
        save(KEYS.STUDY_SESSIONS, sessions);
        logActivity('Added study session', { subject: session.subject, duration: session.duration });
        
        return newSession;
    }
    
    /**
     * Get mock tests
     * @returns {Array} - Mock test data
     */
    function getMockTests() {
        return get(KEYS.MOCK_TESTS) || [];
    }
    
    /**
     * Add a mock test
     * @param {Object} test - Mock test details
     */
    function addMockTest(test) {
        const tests = getMockTests();
        
        // Add ID if not provided
        const newTest = {
            id: test.id || Utils.generateUUID(),
            ...test
        };
        
        tests.push(newTest);
        save(KEYS.MOCK_TESTS, tests);
        logActivity('Scheduled mock test', { name: test.name, date: test.date });
        
        return newTest;
    }
    
    /**
     * Update a mock test
     * @param {string} testId - Test ID
     * @param {Object} updates - Fields to update
     */
    function updateMockTest(testId, updates) {
        const tests = getMockTests();
        const index = tests.findIndex(test => test.id === testId);
        
        if (index >= 0) {
            tests[index] = { ...tests[index], ...updates };
            save(KEYS.MOCK_TESTS, tests);
            logActivity('Updated mock test', { testId, updates });
            return true;
        }
        
        return false;
    }
    
    /**
     * Delete a mock test
     * @param {string} testId - Test ID
     */
    function deleteMockTest(testId) {
        const tests = getMockTests();
        const filtered = tests.filter(test => test.id !== testId);
        
        if (filtered.length < tests.length) {
            save(KEYS.MOCK_TESTS, filtered);
            logActivity('Deleted mock test', { testId });
            return true;
        }
        
        return false;
    }
    
    /**
     * Get calendar events
     * @returns {Array} - Calendar event data
     */
    function getCalendarEvents() {
        return get(KEYS.CALENDAR_EVENTS) || [];
    }
    
    /**
     * Add a calendar event
     * @param {Object} event - Event details
     */
    function addCalendarEvent(event) {
        const events = getCalendarEvents();
        
        // Add ID if not provided
        const newEvent = {
            id: event.id || Utils.generateUUID(),
            ...event
        };
        
        events.push(newEvent);
        save(KEYS.CALENDAR_EVENTS, events);
        logActivity('Added calendar event', { title: event.title, date: event.date });
        
        return newEvent;
    }
    
    /**
     * Update a calendar event
     * @param {string} eventId - Event ID
     * @param {Object} updates - Fields to update
     */
    function updateCalendarEvent(eventId, updates) {
        const events = getCalendarEvents();
        const index = events.findIndex(event => event.id === eventId);
        
        if (index >= 0) {
            events[index] = { ...events[index], ...updates };
            save(KEYS.CALENDAR_EVENTS, events);
            logActivity('Updated calendar event', { eventId, updates });
            return true;
        }
        
        return false;
    }
    
    /**
     * Delete a calendar event
     * @param {string} eventId - Event ID
     */
    function deleteCalendarEvent(eventId) {
        const events = getCalendarEvents();
        const filtered = events.filter(event => event.id !== eventId);
        
        if (filtered.length < events.length) {
            save(KEYS.CALENDAR_EVENTS, filtered);
            logActivity('Deleted calendar event', { eventId });
            return true;
        }
        
        return false;
    }
    
    /**
     * Get error tracker data
     * @returns {Array} - Error tracker data
     */
    function getErrorTracker() {
        return get(KEYS.ERROR_TRACKER) || [];
    }
    
    /**
     * Add an error entry
     * @param {Object} error - Error details
     */
    function addErrorEntry(error) {
        const errors = getErrorTracker();
        
        // Add ID and timestamp if not provided
        const newError = {
            id: error.id || Utils.generateUUID(),
            timestamp: error.timestamp || Date.now(),
            ...error
        };
        
        errors.push(newError);
        save(KEYS.ERROR_TRACKER, errors);
        logActivity('Added error entry', { subject: error.subject, topic: error.topic });
        
        return newError;
    }
    
    /**
     * Delete an error entry
     * @param {string} errorId - Error ID
     */
    function deleteErrorEntry(errorId) {
        const errors = getErrorTracker();
        const filtered = errors.filter(error => error.id !== errorId);
        
        if (filtered.length < errors.length) {
            save(KEYS.ERROR_TRACKER, filtered);
            logActivity('Deleted error entry', { errorId });
            return true;
        }
        
        return false;
    }
    
    /**
     * Get recent activities
     * @param {number} limit - Maximum number of activities to return
     * @returns {Array} - Recent activity data
     */
    function getRecentActivities(limit = 10) {
        const activities = get(KEYS.ACTIVITY_LOG) || [];
        return activities.slice(0, limit);
    }
    
    /**
     * Get app title and subtitle
     * @returns {Object} - App title and subtitle
     */
    function getAppTitle() {
        return get(KEYS.APP_TITLE) || defaultData.appTitle;
    }
    
    /**
     * Save app title and subtitle
     * @param {Object} titleData - Object with title and subtitle
     */
    function saveAppTitle(titleData) {
        save(KEYS.APP_TITLE, titleData);
        logActivity('Updated app title');
    }
    
    // Initialize storage on module load
    init();
    
    // Public API
    return {
        KEYS,
        saveAll,
        exportData,
        importData,
        logActivity,
        getCountdownDates,
        saveCountdownDates,
        getSyllabusProgress,
        updateTopicStatus,
        getStudyPlanProgress,
        updateStudyPlanTask,
        getStudySessions,
        addStudySession,
        getMockTests,
        addMockTest,
        updateMockTest,
        deleteMockTest,
        getCalendarEvents,
        addCalendarEvent,
        updateCalendarEvent,
        deleteCalendarEvent,
        getErrorTracker,
        addErrorEntry,
        deleteErrorEntry,
        getRecentActivities,
        getAppTitle,
        saveAppTitle
    };
})();
