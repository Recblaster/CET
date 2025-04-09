/**
 * Subjects module for MHT CET Study Tracker
 * Handles syllabus and subjects progress tracking
 */

const Subjects = (function() {
    /**
     * Initialize the subjects module
     */
    function init() {
        attachSubjectTabHandlers();
        loadSyllabusContent();
        attachTopicCompletionHandlers();
    }
    
    /**
     * Attach handlers to subject tabs
     */
    function attachSubjectTabHandlers() {
        const subjectTabs = document.querySelectorAll('.subject-tab');
        
        subjectTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get subject name
                const subject = this.getAttribute('data-subject');
                
                // Switch to that subject
                switchToSubject(subject);
            });
        });
    }
    
    /**
     * Switch to a specific subject tab
     * @param {string} subject - Subject name (physics, chemistry, mathematics)
     */
    function switchToSubject(subject) {
        // Remove active class from all tabs
        document.querySelectorAll('.subject-tab').forEach(tab => {
            tab.classList.remove('active');
            tab.querySelector('a').classList.remove('border-blue-600', 'text-blue-600');
            tab.querySelector('a').classList.add('text-gray-500');
        });
        
        // Add active class to selected tab
        const selectedTab = document.querySelector(`.subject-tab[data-subject="${subject}"]`);
        if (selectedTab) {
            selectedTab.classList.add('active');
            selectedTab.querySelector('a').classList.add('border-blue-600', 'text-blue-600');
            selectedTab.querySelector('a').classList.remove('text-gray-500');
        }
        
        // Hide all subject content
        document.querySelectorAll('.subject-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Show selected subject content
        const selectedContent = document.getElementById(`${subject}-content`);
        if (selectedContent) {
            selectedContent.classList.add('active');
        }
    }
    
    /**
     * Load syllabus content for all subjects
     */
    function loadSyllabusContent() {
        // Load physics syllabus
        loadSubjectSyllabus('physics', SyllabusData.physics);
        
        // Load chemistry syllabus
        loadSubjectSyllabus('chemistry', SyllabusData.chemistry);
        
        // Load mathematics syllabus
        loadSubjectSyllabus('mathematics', SyllabusData.mathematics);
    }
    
    /**
     * Load syllabus for a specific subject
     * @param {string} subject - Subject name
     * @param {Object} syllabusData - Subject syllabus data
     */
    function loadSubjectSyllabus(subject, syllabusData) {
        // Load Class 11 topics
        const class11Container = document.getElementById(`${subject}-11-topics`);
        loadTopics(subject, syllabusData.class11, class11Container);
        
        // Load Class 12 topics
        const class12Container = document.getElementById(`${subject}-12-topics`);
        loadTopics(subject, syllabusData.class12, class12Container);
    }
    
    /**
     * Load topics for a subject class
     * @param {string} subject - Subject name
     * @param {Array} units - Array of units
     * @param {HTMLElement} container - Container element to add topics to
     */
    function loadTopics(subject, units, container) {
        // Clear loading message
        container.innerHTML = '';
        
        // Get saved progress
        const syllabusProgress = Storage.getSyllabusProgress();
        const subjectProgress = syllabusProgress[subject] || { topics: {} };
        
        // Create accordion for each unit
        units.forEach(unit => {
            const unitElement = document.createElement('div');
            unitElement.className = 'mb-4 last:mb-0';
            
            // Calculate unit progress
            let totalTopics = unit.topics.length;
            let completedTopics = 0;
            
            unit.topics.forEach(topic => {
                if (subjectProgress.topics[topic.id] && subjectProgress.topics[topic.id].completed) {
                    completedTopics++;
                }
            });
            
            const unitPercentage = Utils.calculatePercentage(completedTopics, totalTopics);
            
            // Create unit header
            unitElement.innerHTML = `
                <div class="bg-gray-100 p-3 rounded-t font-medium flex justify-between items-center cursor-pointer unit-header">
                    <div>${unit.unit}</div>
                    <div class="flex items-center">
                        <span class="text-sm mr-2 ${getProgressColorClass(unitPercentage)}">${unitPercentage}%</span>
                        <i class="fas fa-chevron-down text-gray-500 unit-toggle"></i>
                    </div>
                </div>
                <div class="border border-t-0 rounded-b p-3 unit-content">
                    <div class="space-y-2">
                        <!-- Topics will be added here -->
                    </div>
                </div>
            `;
            
            const topicsContainer = unitElement.querySelector('.unit-content .space-y-2');
            
            // Add topics to unit
            unit.topics.forEach(topic => {
                const topicElement = document.createElement('div');
                topicElement.className = 'flex items-center p-2 rounded topic-item';
                
                // Check if topic is completed
                const isCompleted = subjectProgress.topics[topic.id] && subjectProgress.topics[topic.id].completed;
                
                topicElement.innerHTML = `
                    <input type="checkbox" class="topic-checkbox" id="${topic.id}" 
                        data-subject="${subject}" data-topic-id="${topic.id}" ${isCompleted ? 'checked' : ''}>
                    <label for="${topic.id}" class="ml-2 flex-grow cursor-pointer">${topic.name}</label>
                    <span class="text-xs text-gray-500 ml-2">Weight: ${topic.weightage}</span>
                `;
                
                topicsContainer.appendChild(topicElement);
            });
            
            // Add click event to toggle unit content
            const unitHeader = unitElement.querySelector('.unit-header');
            const unitContent = unitElement.querySelector('.unit-content');
            const unitToggle = unitElement.querySelector('.unit-toggle');
            
            unitHeader.addEventListener('click', function() {
                unitContent.classList.toggle('hidden');
                unitToggle.classList.toggle('rotate-180');
            });
            
            container.appendChild(unitElement);
        });
    }
    
    /**
     * Get progress color class based on percentage
     * @param {number} percentage - Completion percentage
     * @returns {string} - CSS class for text color
     */
    function getProgressColorClass(percentage) {
        if (percentage < 30) {
            return 'text-red-600';
        } else if (percentage < 70) {
            return 'text-yellow-600';
        } else if (percentage < 100) {
            return 'text-blue-600';
        } else {
            return 'text-green-600';
        }
    }
    
    /**
     * Attach handlers to topic checkboxes
     */
    function attachTopicCompletionHandlers() {
        // Use event delegation for topic checkboxes
        document.addEventListener('change', function(e) {
            if (e.target.classList.contains('topic-checkbox')) {
                const subject = e.target.getAttribute('data-subject');
                const topicId = e.target.getAttribute('data-topic-id');
                const completed = e.target.checked;
                
                // Update storage
                Storage.updateTopicStatus(subject, topicId, completed);
                
                // Update UI
                updateSubjectProgress(subject);
                Dashboard.updateSubjectProgress();
                
                // Log activity
                if (completed) {
                    Storage.logActivity('Completed topic', { subject, topicId });
                } else {
                    Storage.logActivity('Uncompleted topic', { subject, topicId });
                }
            }
        });
    }
    
    /**
     * Update progress display for a subject
     * @param {string} subject - Subject name
     */
    function updateSubjectProgress(subject) {
        // Get subject data
        const subjectData = subject === 'physics' ? SyllabusData.physics :
                           subject === 'chemistry' ? SyllabusData.chemistry :
                           SyllabusData.mathematics;
        
        // Get progress data
        const syllabusProgress = Storage.getSyllabusProgress();
        const subjectProgress = syllabusProgress[subject] || { topics: {} };
        
        // Count total and completed topics
        let totalTopics = 0;
        let completedTopics = 0;
        
        // Class 11 topics
        subjectData.class11.forEach(unit => {
            unit.topics.forEach(topic => {
                totalTopics++;
                
                if (subjectProgress.topics[topic.id] && subjectProgress.topics[topic.id].completed) {
                    completedTopics++;
                }
            });
        });
        
        // Class 12 topics
        subjectData.class12.forEach(unit => {
            unit.topics.forEach(topic => {
                totalTopics++;
                
                if (subjectProgress.topics[topic.id] && subjectProgress.topics[topic.id].completed) {
                    completedTopics++;
                }
            });
        });
        
        // Update unit headers (recalculate for each unit)
        updateUnitHeaders(subject, subjectData.class11, subjectProgress);
        updateUnitHeaders(subject, subjectData.class12, subjectProgress);
    }
    
    /**
     * Update unit headers with progress percentage
     * @param {string} subject - Subject name
     * @param {Array} units - Array of units
     * @param {Object} subjectProgress - Subject progress data
     */
    function updateUnitHeaders(subject, units, subjectProgress) {
        units.forEach(unit => {
            // Calculate unit progress
            let totalTopics = unit.topics.length;
            let completedTopics = 0;
            
            unit.topics.forEach(topic => {
                if (subjectProgress.topics[topic.id] && subjectProgress.topics[topic.id].completed) {
                    completedTopics++;
                }
            });
            
            const unitPercentage = Utils.calculatePercentage(completedTopics, totalTopics);
            
            // Find and update unit header
            const unitHeaders = document.querySelectorAll(`.unit-header`);
            
            for (let i = 0; i < unitHeaders.length; i++) {
                if (unitHeaders[i].firstElementChild.textContent === unit.unit) {
                    const percentageSpan = unitHeaders[i].querySelector('span');
                    if (percentageSpan) {
                        percentageSpan.textContent = `${unitPercentage}%`;
                        percentageSpan.className = `text-sm mr-2 ${getProgressColorClass(unitPercentage)}`;
                    }
                    break;
                }
            }
        });
    }
    
    // Public API
    return {
        init,
        switchToSubject,
        updateSubjectProgress
    };
})();
