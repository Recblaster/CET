/**
 * Utility functions for MHT CET Study Tracker
 */

const Utils = {
    /**
     * Format a date in a user-friendly format
     * @param {Date} date - The date to format
     * @param {boolean} includeYear - Whether to include the year
     * @returns {string} - Formatted date string
     */
    formatDate: function(date, includeYear = true) {
        if (!date) return '';
        const options = { 
            month: 'short', 
            day: 'numeric',
            year: includeYear ? 'numeric' : undefined
        };
        return date.toLocaleDateString('en-US', options);
    },

    /**
     * Format time in 12-hour format with AM/PM
     * @param {Date} date - The date to extract time from
     * @returns {string} - Formatted time string
     */
    formatTime: function(date) {
        if (!date) return '';
        
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12; // Convert to 12-hour format
        
        // Add leading zeros to minutes if needed
        const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
        
        return `${hours12}:${minutesStr} ${ampm}`;
    },

    /**
     * Format date and time together
     * @param {Date} date - The date to format
     * @returns {string} - Formatted date and time string
     */
    formatDateTime: function(date) {
        if (!date) return '';
        return `${this.formatDate(date)} at ${this.formatTime(date)}`;
    },
    
    /**
     * Format duration in hours and minutes
     * @param {number} minutes - Total minutes
     * @returns {string} - Formatted duration string
     */
    formatDuration: function(minutes) {
        if (!minutes && minutes !== 0) return '';
        
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        
        if (hours === 0) {
            return `${mins}m`;
        } else if (mins === 0) {
            return `${hours}h`;
        } else {
            return `${hours}h ${mins}m`;
        }
    },
    
    /**
     * Calculate days between two dates
     * @param {Date} startDate - The start date
     * @param {Date} endDate - The end date
     * @returns {number} - Number of days between dates
     */
    daysBetween: function(startDate, endDate) {
        if (!startDate || !endDate) return 0;
        
        // Reset time component for accurate day calculation
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        
        const end = new Date(endDate);
        end.setHours(0, 0, 0, 0);
        
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays;
    },
    
    /**
     * Get the percentage completed
     * @param {number} completed - Number of completed items
     * @param {number} total - Total number of items
     * @returns {number} - Percentage completed (0-100)
     */
    calculatePercentage: function(completed, total) {
        if (!total || total === 0) return 0;
        return Math.round((completed / total) * 100);
    },
    
    /**
     * Create a UUID for unique identifiers
     * @returns {string} - UUID string
     */
    generateUUID: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    
    /**
     * Show an alert message to the user
     * @param {string} title - Alert title
     * @param {string} message - Alert message
     * @param {string} type - Alert type ('success', 'error', 'info')
     * @param {number} duration - Duration in milliseconds
     */
    showAlert: function(title, message, type = 'info', duration = 3000) {
        const alertEl = document.getElementById('alert-message');
        const titleEl = document.getElementById('alert-title');
        const textEl = document.getElementById('alert-text');
        
        // Set content
        titleEl.textContent = title;
        textEl.textContent = message;
        
        // Set type
        alertEl.className = `fixed top-5 right-5 max-w-xs bg-white rounded-lg shadow-md p-4 z-50 alert-${type}`;
        
        // Show alert
        alertEl.classList.add('alert-slide-in');
        alertEl.classList.remove('hidden', 'alert-slide-out');
        
        // Hide after duration
        setTimeout(() => {
            alertEl.classList.add('alert-slide-out');
            alertEl.classList.remove('alert-slide-in');
            
            // Hide completely after animation
            setTimeout(() => {
                alertEl.classList.add('hidden');
            }, 300);
        }, duration);
    },
    
    /**
     * Format the 12-hour clock display
     * @returns {string} - Current time in HH:MM:SS AM/PM format
     */
    formatClockDisplay: function() {
        // Create a date object with the current UTC time
        const now = new Date();
        
        // Convert to Indian Standard Time (UTC+5:30)
        const istTime = new Date(now.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000));
        
        const hours = istTime.getUTCHours();
        const minutes = istTime.getUTCMinutes();
        const seconds = istTime.getUTCSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        // Convert to 12-hour format
        const hours12 = hours % 12 || 12;
        
        // Add leading zeros
        const hoursStr = hours12 < 10 ? `0${hours12}` : hours12;
        const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
        const secondsStr = seconds < 10 ? `0${seconds}` : seconds;
        
        return `${hoursStr}:${minutesStr}:${secondsStr} ${ampm} IST`;
    },
    
    /**
     * Format the date display
     * @returns {string} - Current date in format "Day, Month Date, Year"
     */
    formatDateDisplay: function() {
        // Create a date object with the current UTC time
        const now = new Date();
        
        // Convert to Indian Standard Time (UTC+5:30)
        const istTime = new Date(now.getTime() + (5 * 60 * 60 * 1000) + (30 * 60 * 1000));
        
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            timeZone: 'Asia/Kolkata'
        };
        
        return istTime.toLocaleDateString('en-IN', options);
    },
    
    /**
     * Get the current day's start and end timestamps
     * @returns {Object} - Object with start and end timestamps
     */
    getTodayTimestamps: function() {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        
        return {
            start: startOfDay.getTime(),
            end: endOfDay.getTime()
        };
    },
    
    /**
     * Get dates for the current week
     * @returns {Array} - Array of date objects for each day of the current week
     */
    getCurrentWeekDates: function() {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
        const weekDates = [];
        
        // Get Sunday of current week
        const sunday = new Date(now);
        sunday.setDate(now.getDate() - dayOfWeek);
        sunday.setHours(0, 0, 0, 0);
        
        // Generate all days of the week
        for (let i = 0; i < 7; i++) {
            const day = new Date(sunday);
            day.setDate(sunday.getDate() + i);
            weekDates.push(day);
        }
        
        return weekDates;
    },
    
    /**
     * Get short day names for display
     * @returns {Array} - Array of short day names
     */
    getDayNames: function() {
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    },
    
    /**
     * Check if two dates are on the same day
     * @param {Date} date1 - First date
     * @param {Date} date2 - Second date
     * @returns {boolean} - True if dates are on the same day
     */
    isSameDay: function(date1, date2) {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    },
    
    /**
     * Format to yyyy-mm-dd for input[type=date]
     * @param {Date} date - The date to format
     * @returns {string} - Formatted date string
     */
    formatDateForInput: function(date) {
        if (!date) return '';
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    },
    
    /**
     * Get time for input[type=time]
     * @param {Date} date - The date to extract time from
     * @returns {string} - Formatted time string for input
     */
    formatTimeForInput: function(date) {
        if (!date) return '';
        
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${hours}:${minutes}`;
    }
};
