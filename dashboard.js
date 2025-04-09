/**
 * Dashboard module for MHT CET Study Tracker
 * Handles dashboard-related functionality
 */

const Dashboard = (function() {
    /**
     * Initialize the dashboard
     */
    function init() {
        updateOverallProgress();
        updateSubjectProgress();
        updateTimeSpentToday();
        updateRecentActivity();
        updateUpcomingEvents();
    }
    
    /**
     * Update overall progress display
     */
    function updateOverallProgress() {
        // Get study plan progress data
        const progress = Storage.getStudyPlanProgress();
        
        // Count total tasks and completed tasks
        let totalTasks = 0;
        let completedTasks = 0;
        
        for (let day = 1; day <= 5; day++) {
            const dayKey = `day${day}`;
            
            if (progress[dayKey]) {
                totalTasks += 6; // Each day has 6 tasks
                
                progress[dayKey].forEach(task => {
                    if (task.completed) {
                        completedTasks++;
                    }
                });
            }
        }
        
        // Update task count
        document.getElementById('total-tasks').textContent = totalTasks;
        document.getElementById('completed-tasks').textContent = completedTasks;
        
        // Calculate percentage
        const percentage = Utils.calculatePercentage(completedTasks, totalTasks);
        
        // Update progress circle
        const progressCircle = document.getElementById('progress-circle');
        const circumference = 2 * Math.PI * 60; // 60 is the radius of the circle
        
        // Calculate stroke-dashoffset based on percentage
        const offset = circumference - (percentage / 100) * circumference;
        progressCircle.style.strokeDasharray = circumference;
        progressCircle.style.strokeDashoffset = offset;
        
        // Update percentage text
        document.getElementById('progress-percentage').textContent = `${percentage}%`;
    }
    
    /**
     * Update subject progress display
     */
    function updateSubjectProgress() {
        // Get syllabus progress data
        const syllabusProgress = Storage.getSyllabusProgress();
        
        // Update progress for each subject
        updateSubject('physics', syllabusProgress.physics);
        updateSubject('chemistry', syllabusProgress.chemistry);
        updateSubject('mathematics', syllabusProgress.mathematics);
    }
    
    /**
     * Update progress for a specific subject
     * @param {string} subject - Subject name
     * @param {Object} progress - Subject progress data
     */
    function updateSubject(subject, progress) {
        // Get subject topics from syllabus data
        const subjectData = subject === 'physics' ? SyllabusData.physics :
                            subject === 'chemistry' ? SyllabusData.chemistry :
                            SyllabusData.mathematics;
        
        // Count total topics and completed topics
        let totalTopics = 0;
        let completedTopics = 0;
        
        // Class 11 topics
        subjectData.class11.forEach(unit => {
            unit.topics.forEach(topic => {
                totalTopics++;
                
                if (progress && progress.topics && progress.topics[topic.id] && progress.topics[topic.id].completed) {
                    completedTopics++;
                }
            });
        });
        
        // Class 12 topics
        subjectData.class12.forEach(unit => {
            unit.topics.forEach(topic => {
                totalTopics++;
                
                if (progress && progress.topics && progress.topics[topic.id] && progress.topics[topic.id].completed) {
                    completedTopics++;
                }
            });
        });
        
        // Calculate percentage
        const percentage = Utils.calculatePercentage(completedTopics, totalTopics);
        
        // Update UI elements
        document.getElementById(`${subject}-badge`).textContent = `${percentage}%`;
        document.getElementById(`${subject}-badge`).className = getBadgeColorClass(percentage);
        document.getElementById(`${subject}-progress`).style.width = `${percentage}%`;
        document.getElementById(`${subject}-completed`).textContent = completedTopics;
        document.getElementById(`${subject}-total`).textContent = totalTopics;
    }
    
    /**
     * Get badge color class based on percentage
     * @param {number} percentage - Completion percentage
     * @returns {string} - CSS class for badge
     */
    function getBadgeColorClass(percentage) {
        let baseClass = 'text-sm font-medium px-2 py-1 rounded-full ';
        
        if (percentage < 30) {
            return baseClass + 'bg-red-100 text-red-800';
        } else if (percentage < 60) {
            return baseClass + 'bg-yellow-100 text-yellow-800';
        } else if (percentage < 90) {
            return baseClass + 'bg-blue-100 text-blue-800';
        } else {
            return baseClass + 'bg-green-100 text-green-800';
        }
    }
    
    /**
     * Update time spent today display
     */
    function updateTimeSpentToday() {
        // Get study sessions data
        const sessions = Storage.getStudySessions();
        
        // Get today's timestamps
        const today = Utils.getTodayTimestamps();
        
        // Filter sessions for today
        const todaySessions = sessions.filter(session => {
            return session.timestamp >= today.start && session.timestamp <= today.end;
        });
        
        // Calculate total minutes
        let totalMinutes = 0;
        
        todaySessions.forEach(session => {
            totalMinutes += session.duration || 0;
        });
        
        // Update display
        document.getElementById('time-today').textContent = Utils.formatDuration(totalMinutes);
        
        // Update progress bar (based on 9 hours goal = 540 minutes)
        const goalMinutes = 540;
        const progressPercentage = Math.min(100, Math.round((totalMinutes / goalMinutes) * 100));
        document.getElementById('time-progress-bar').style.width = `${progressPercentage}%`;
    }
    
    /**
     * Update recent activity display
     */
    function updateRecentActivity() {
        // Get recent activities
        const activities = Storage.getRecentActivities(5);
        const activityList = document.getElementById('recent-activity-list');
        
        // Clear list
        activityList.innerHTML = '';
        
        if (activities.length === 0) {
            // Show empty state
            activityList.innerHTML = `
                <li class="text-center text-gray-500 py-6">
                    No recent activity
                </li>
            `;
            return;
        }
        
        // Add activity items
        activities.forEach(activity => {
            const activityDate = new Date(activity.timestamp);
            const timeAgo = getTimeAgo(activityDate);
            
            const activityItem = document.createElement('li');
            activityItem.className = 'flex items-start pb-3 border-b';
            activityItem.innerHTML = `
                <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <i class="fas fa-check text-blue-600 text-sm"></i>
                </div>
                <div class="flex-1">
                    <div class="text-sm font-medium">${activity.action}</div>
                    <div class="text-xs text-gray-500">${timeAgo}</div>
                </div>
            `;
            
            activityList.appendChild(activityItem);
        });
    }
    
    /**
     * Update upcoming events display
     */
    function updateUpcomingEvents() {
        // Get calendar events
        const allEvents = Storage.getCalendarEvents();
        
        // Filter upcoming events (events that haven't happened yet)
        const now = new Date();
        const upcomingEvents = allEvents.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= now;
        });
        
        // Sort by date (closest first)
        upcomingEvents.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        
        // Get up to 3 upcoming events
        const nextEvents = upcomingEvents.slice(0, 3);
        
        // Update dashboard upcoming events
        const eventsList = document.getElementById('upcoming-events-list-dash');
        
        // Clear list
        eventsList.innerHTML = '';
        
        if (nextEvents.length === 0) {
            // Show empty state
            eventsList.innerHTML = `
                <li class="text-center text-gray-500 pt-4">No upcoming events found.</li>
            `;
            return;
        }
        
        // Add event items
        nextEvents.forEach(event => {
            const eventDate = new Date(event.date);
            const eventItem = document.createElement('li');
            eventItem.className = 'flex items-start border-b pb-3 mb-3 last:border-b-0 last:pb-0 last:mb-0';
            
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
                <div class="flex-shrink-0 w-8 h-8 ${bgColorClass} rounded-full flex items-center justify-center mr-3">
                    <i class="fas ${iconClass} ${textColorClass} text-sm"></i>
                </div>
                <div class="flex-1">
                    <div class="text-sm font-medium">${event.title}</div>
                    <div class="text-xs text-gray-500">${Utils.formatDate(eventDate)} ${event.time ? 'at ' + event.time : ''}</div>
                </div>
            `;
            
            eventsList.appendChild(eventItem);
        });
    }
    
    /**
     * Get relative time string
     * @param {Date} date - Date to compare with now
     * @returns {string} - Relative time string
     */
    function getTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHr = Math.floor(diffMin / 60);
        const diffDays = Math.floor(diffHr / 24);
        
        if (diffSec < 60) {
            return 'Just now';
        } else if (diffMin < 60) {
            return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
        } else if (diffHr < 24) {
            return `${diffHr} hour${diffHr !== 1 ? 's' : ''} ago`;
        } else if (diffDays < 7) {
            return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
        } else {
            return Utils.formatDate(date);
        }
    }
    
    // Public API
    return {
        init,
        updateOverallProgress,
        updateSubjectProgress,
        updateTimeSpentToday,
        updateRecentActivity,
        updateUpcomingEvents
    };
})();
