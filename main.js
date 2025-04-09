/**
 * Main JavaScript file for MHT CET Study Tracker
 * Handles initialization and main functionality
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load app title from storage
    loadAppTitle();
});

/**
 * Initialize the application
 */
function initApp() {
    // Update the clock and date
    updateClockAndDate();
    
    // Initialize countdown timer
    initCountdown();
    
    // Initialize tabs
    initTabs();
    
    // Initialize all modules
    Dashboard.init();
    StudyPlan.init();
    Subjects.init();
    MockTests.init();
    StudyTimer.init();
    Analytics.init();
    CalendarModule.init();
    Resources.init();
    
    // Load saved data
    loadUserData();
    
    // Show welcome message
    setTimeout(() => {
        Utils.showAlert('Welcome', 'Your MHT CET Study Tracker is ready!', 'info');
    }, 1000);
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Tab navigation
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Tab links (buttons that switch tabs)
    document.querySelectorAll('.tab-link-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab-link');
            const subject = this.getAttribute('data-subject');
            
            switchTab(tabId);
            
            // If switching to subjects tab with a specific subject
            if (tabId === 'subjects' && subject) {
                Subjects.switchToSubject(subject);
            }
        });
    });
    
    // Save data button
    document.getElementById('save-data-btn').addEventListener('click', function() {
        Storage.saveAll();
    });
    
    // Share button
    document.getElementById('share-btn').addEventListener('click', function() {
        openShareModal();
    });
    
    // Close share modal
    document.getElementById('close-share-modal').addEventListener('click', function() {
        document.getElementById('share-modal').classList.add('hidden');
    });
    
    // Copy share link
    document.getElementById('copy-link').addEventListener('click', function() {
        const linkInput = document.getElementById('share-link');
        linkInput.select();
        document.execCommand('copy');
        
        Utils.showAlert('Copied', 'Link copied to clipboard', 'success', 1500);
    });
    
    // Print button
    document.getElementById('print-btn').addEventListener('click', function() {
        window.print();
    });
    
    // Make app title editable
    document.getElementById('app-title-container').addEventListener('click', function() {
        editAppTitle();
    });
    
    // Countdown container (to open date selection modal)
    document.getElementById('countdown-container').addEventListener('click', function() {
        openDateSelectionModal();
    });
    
    // Close date selection modal
    document.getElementById('close-modal').addEventListener('click', function() {
        document.getElementById('date-modal').classList.add('hidden');
    });
    
    // Cancel date selection
    document.getElementById('cancel-date').addEventListener('click', function() {
        document.getElementById('date-modal').classList.add('hidden');
    });
    
    // Submit date form
    document.getElementById('date-form').addEventListener('submit', function(e) {
        e.preventDefault();
        saveExamDates();
    });
}

/**
 * Update the clock and date display
 */
function updateClockAndDate() {
    // Update clock display
    const clockElement = document.getElementById('clock');
    clockElement.textContent = Utils.formatClockDisplay();
    
    // Update date display
    const dateElement = document.getElementById('date');
    dateElement.textContent = Utils.formatDateDisplay();
    
    // Update every second
    setTimeout(updateClockAndDate, 1000);
}

/**
 * Initialize countdown timer
 */
function initCountdown() {
    const dates = Storage.getCountdownDates();
    updateCountdown(dates);
    
    // Update countdown every minute
    setInterval(() => {
        const dates = Storage.getCountdownDates();
        updateCountdown(dates);
    }, 60000);
    
    // Set current date as default in date selection form
    const today = new Date();
    document.getElementById('start-date').valueAsDate = today;
    
    // Set default exam date to 30 days later
    const defaultExamDate = new Date();
    defaultExamDate.setDate(today.getDate() + 30);
    document.getElementById('end-date').valueAsDate = defaultExamDate;
}

/**
 * Update countdown display
 * @param {Object} dates - Start and exam dates
 */
function updateCountdown(dates) {
    const countdownElement = document.getElementById('countdown');
    
    if (!dates || !dates.examDate) {
        countdownElement.textContent = 'N/A';
        return;
    }
    
    const now = new Date();
    const examDate = new Date(dates.examDate);
    
    // Calculate days left
    const daysLeft = Utils.daysBetween(now, examDate);
    
    // Update countdown display
    countdownElement.textContent = daysLeft;
    
    // Style differently if less than 7 days
    if (daysLeft <= 7) {
        countdownElement.classList.add('text-red-600');
    } else {
        countdownElement.classList.remove('text-red-600');
    }
}

/**
 * Initialize tab functionality
 */
function initTabs() {
    // Show dashboard tab by default
    switchTab('dashboard');
}

/**
 * Switch to a specific tab
 * @param {string} tabId - ID of the tab to switch to
 */
function switchTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from tab items
    document.querySelectorAll('.tab-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to selected tab item
    const selectedTabItem = document.querySelector(`.tab-item[data-tab="${tabId}"]`);
    if (selectedTabItem) {
        selectedTabItem.classList.add('active');
    }
    
    // Log tab change
    Storage.logActivity('Viewed tab', { tab: tabId });
}

/**
 * Open date selection modal
 */
function openDateSelectionModal() {
    const modal = document.getElementById('date-modal');
    modal.classList.remove('hidden');
    
    // Populate with current values
    const dates = Storage.getCountdownDates();
    
    if (dates.startDate) {
        document.getElementById('start-date').valueAsDate = new Date(dates.startDate);
    }
    
    if (dates.examDate) {
        document.getElementById('end-date').valueAsDate = new Date(dates.examDate);
    }
}

/**
 * Save exam dates from form
 */
function saveExamDates() {
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    
    const startDate = startDateInput.valueAsDate;
    const examDate = endDateInput.valueAsDate;
    
    if (!examDate) {
        Utils.showAlert('Error', 'Please select an exam date', 'error');
        return;
    }
    
    // Validate dates
    if (startDate >= examDate) {
        Utils.showAlert('Error', 'Exam date must be after start date', 'error');
        return;
    }
    
    // Save dates
    Storage.saveCountdownDates(startDate, examDate);
    
    // Update countdown
    updateCountdown({ startDate: startDate.getTime(), examDate: examDate.getTime() });
    
    // Close modal
    document.getElementById('date-modal').classList.add('hidden');
    
    // Show success message
    Utils.showAlert('Success', 'Exam date updated successfully', 'success');
}

/**
 * Open share modal
 */
function openShareModal() {
    const modal = document.getElementById('share-modal');
    modal.classList.remove('hidden');
    
    // Generate share link
    const shareData = Storage.exportData();
    const shareUrl = `${window.location.origin}${window.location.pathname}?data=${shareData}`;
    
    // Set share link in input
    document.getElementById('share-link').value = shareUrl;
}

/**
 * Load user data from URL if available
 */
function loadUserData() {
    const urlParams = new URLSearchParams(window.location.search);
    const importData = urlParams.get('data');
    
    if (importData) {
        try {
            const success = Storage.importData(importData);
            
            if (success) {
                Utils.showAlert('Success', 'Study data imported successfully', 'success');
                
                // Reload the page without the query parameter
                const url = new URL(window.location.href);
                url.search = '';
                window.history.replaceState({}, document.title, url.toString());
                
                // Refresh all modules
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                Utils.showAlert('Error', 'Failed to import data', 'error');
            }
        } catch (error) {
            console.error('Error importing data:', error);
            Utils.showAlert('Error', 'Invalid data format', 'error');
        }
    }
}

/**
 * Load app title and subtitle from storage
 */
function loadAppTitle() {
    const titleData = Storage.getAppTitle();
    if (titleData) {
        const titleElement = document.getElementById('app-title');
        const subtitleElement = document.getElementById('app-subtitle');
        
        if (titleElement && titleData.title) {
            titleElement.textContent = titleData.title;
        }
        
        if (subtitleElement && titleData.subtitle) {
            subtitleElement.textContent = titleData.subtitle;
        }
    }
}

/**
 * Make the app title and subtitle editable
 */
function editAppTitle() {
    // Get the current title and subtitle elements
    const titleElement = document.getElementById('app-title');
    const subtitleElement = document.getElementById('app-subtitle');
    
    // Get the current values
    const currentTitle = titleElement.textContent;
    const currentSubtitle = subtitleElement.textContent;
    
    // Create a modal for editing
    const modalHtml = `
        <div id="title-edit-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-gray-800">Edit App Title</h3>
                    <button id="close-title-modal" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <form id="title-form" class="space-y-4">
                    <div>
                        <label for="app-title-input" class="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" id="app-title-input" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                               value="${currentTitle}" maxlength="30">
                    </div>
                    <div>
                        <label for="app-subtitle-input" class="block text-sm font-medium text-gray-700">Subtitle</label>
                        <input type="text" id="app-subtitle-input" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" 
                               value="${currentSubtitle}" maxlength="40">
                    </div>
                    <div class="flex justify-end space-x-3">
                        <button type="button" id="cancel-title-edit" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                            Cancel
                        </button>
                        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // Add modal to the document
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Add event listeners
    document.getElementById('close-title-modal').addEventListener('click', function() {
        document.getElementById('title-edit-modal').remove();
    });
    
    document.getElementById('cancel-title-edit').addEventListener('click', function() {
        document.getElementById('title-edit-modal').remove();
    });
    
    document.getElementById('title-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get the new values
        const newTitle = document.getElementById('app-title-input').value.trim();
        const newSubtitle = document.getElementById('app-subtitle-input').value.trim();
        
        // Validate
        if (!newTitle) {
            Utils.showAlert('Error', 'Title cannot be empty', 'error');
            return;
        }
        
        // Update the DOM
        titleElement.textContent = newTitle;
        subtitleElement.textContent = newSubtitle;
        
        // Save to local storage
        Storage.saveAppTitle({ 
            title: newTitle, 
            subtitle: newSubtitle 
        });
        
        // Close the modal
        document.getElementById('title-edit-modal').remove();
        
        // Show success message
        Utils.showAlert('Success', 'App title updated successfully', 'success');
    });
}
