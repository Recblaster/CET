/**
 * Mock Tests module for MHT CET Study Tracker
 * Handles mock test scheduling and results tracking
 */

const MockTests = (function() {
    /**
     * Initialize the mock tests module
     */
    function init() {
        attachButtonHandlers();
        loadMockTests();
        setupResultsCalculation();
    }
    
    /**
     * Attach button click handlers
     */
    function attachButtonHandlers() {
        // Schedule mock test button
        document.getElementById('schedule-mock-btn').addEventListener('click', function() {
            openMockTestModal();
        });
        
        // Close mock test modal
        document.getElementById('close-mock-modal').addEventListener('click', function() {
            document.getElementById('mock-test-modal').classList.add('hidden');
        });
        
        // Mock test form submission
        document.getElementById('mock-test-form').addEventListener('submit', function(e) {
            e.preventDefault();
            scheduleMockTest();
        });
        
        // Close results modal
        document.getElementById('close-results-modal').addEventListener('click', function() {
            document.getElementById('results-modal').classList.add('hidden');
        });
        
        // Results form submission
        document.getElementById('results-form').addEventListener('submit', function(e) {
            e.preventDefault();
            saveMockTestResults();
        });
    }
    
    /**
     * Open the mock test scheduling modal
     */
    function openMockTestModal() {
        const modal = document.getElementById('mock-test-modal');
        modal.classList.remove('hidden');
        
        // Set default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('test-date').valueAsDate = tomorrow;
        
        // Set default time
        document.getElementById('test-time').value = '09:00';
        
        // Reset form
        document.getElementById('mock-test-form').reset();
        
        // Set default subjects
        document.getElementById('physics-checkbox').checked = true;
        document.getElementById('chemistry-checkbox').checked = true;
        document.getElementById('mathematics-checkbox').checked = true;
        
        // Set default duration
        document.getElementById('test-duration').value = 90;
    }
    
    /**
     * Schedule a new mock test
     */
    function scheduleMockTest() {
        // Get form values
        const name = document.getElementById('test-name').value.trim();
        const dateInput = document.getElementById('test-date').value;
        const timeInput = document.getElementById('test-time').value;
        const duration = parseInt(document.getElementById('test-duration').value, 10);
        const notes = document.getElementById('test-notes').value.trim();
        
        // Get selected subjects
        const subjects = [];
        if (document.getElementById('physics-checkbox').checked) subjects.push('Physics');
        if (document.getElementById('chemistry-checkbox').checked) subjects.push('Chemistry');
        if (document.getElementById('mathematics-checkbox').checked) subjects.push('Mathematics');
        
        // Validate inputs
        if (!name) {
            Utils.showAlert('Error', 'Please enter a test name', 'error');
            return;
        }
        
        if (!dateInput) {
            Utils.showAlert('Error', 'Please select a date', 'error');
            return;
        }
        
        if (!timeInput) {
            Utils.showAlert('Error', 'Please select a time', 'error');
            return;
        }
        
        if (subjects.length === 0) {
            Utils.showAlert('Error', 'Please select at least one subject', 'error');
            return;
        }
        
        // Create date from inputs
        const testDate = new Date(`${dateInput}T${timeInput}`);
        
        // Check if date is in the past
        if (testDate < new Date()) {
            Utils.showAlert('Error', 'Test date cannot be in the past', 'error');
            return;
        }
        
        // Create mock test object
        const mockTest = {
            id: Utils.generateUUID(),
            name: name,
            date: testDate.getTime(),
            duration: duration,
            subjects: subjects,
            notes: notes,
            status: 'scheduled', // 'scheduled', 'completed', 'missed'
            results: null
        };
        
        // Save to storage
        Storage.addMockTest(mockTest);
        
        // Close modal
        document.getElementById('mock-test-modal').classList.add('hidden');
        
        // Refresh tests list
        loadMockTests();
        
        // Show success message
        Utils.showAlert('Success', 'Mock test scheduled successfully', 'success');
        
        // Update dashboard
        Dashboard.updateUpcomingEvents();
    }
    
    /**
     * Load mock tests from storage and display
     */
    function loadMockTests() {
        const tests = Storage.getMockTests();
        
        // Get current date
        const now = new Date();
        
        // Separate into upcoming and past tests
        const upcomingTests = tests.filter(test => {
            return test.date > now.getTime() || test.status === 'scheduled';
        });
        
        const pastTests = tests.filter(test => {
            return (test.date < now.getTime() && test.status !== 'scheduled') || test.status === 'completed';
        });
        
        // Sort by date
        upcomingTests.sort((a, b) => a.date - b.date);
        pastTests.sort((a, b) => b.date - a.date); // Reverse for past tests
        
        // Display upcoming tests
        displayUpcomingTests(upcomingTests);
        
        // Display past tests
        displayPastTests(pastTests);
    }
    
    /**
     * Display upcoming tests
     * @param {Array} tests - Array of upcoming tests
     */
    function displayUpcomingTests(tests) {
        const container = document.getElementById('upcoming-tests-list');
        const emptyState = document.getElementById('no-upcoming-tests');
        
        // Clear container
        container.innerHTML = '';
        
        if (tests.length === 0) {
            // Show empty state
            emptyState.classList.remove('hidden');
            return;
        }
        
        // Hide empty state
        emptyState.classList.add('hidden');
        
        // Display each test
        tests.forEach(test => {
            const testDate = new Date(test.date);
            const testCard = document.createElement('div');
            testCard.className = 'bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow mock-test-card';
            
            // Format subjects list
            const subjectsList = test.subjects.join(', ');
            
            testCard.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-medium text-lg">${test.name}</h4>
                        <div class="text-sm text-gray-600">${Utils.formatDateTime(testDate)}</div>
                        <div class="text-sm mt-1">
                            <span class="font-medium">Duration:</span> ${test.duration} minutes
                        </div>
                        <div class="text-sm">
                            <span class="font-medium">Subjects:</span> ${subjectsList}
                        </div>
                        ${test.notes ? `<div class="text-sm mt-1 text-gray-600">${test.notes}</div>` : ''}
                    </div>
                    <div class="flex space-x-2">
                        <button class="text-blue-600 hover:text-blue-800 edit-test" data-id="${test.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="text-red-600 hover:text-red-800 delete-test" data-id="${test.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
                <div class="mt-3 pt-3 border-t flex justify-between items-center">
                    <div class="text-sm">
                        <span class="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800">Scheduled</span>
                    </div>
                    <button class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 enter-results" data-id="${test.id}">
                        Enter Results
                    </button>
                </div>
            `;
            
            container.appendChild(testCard);
            
            // Add event listeners
            const editBtn = testCard.querySelector('.edit-test');
            const deleteBtn = testCard.querySelector('.delete-test');
            const resultsBtn = testCard.querySelector('.enter-results');
            
            editBtn.addEventListener('click', function() {
                Utils.showAlert('Coming Soon', 'Edit functionality will be available soon', 'info');
                // TODO: Implement edit functionality
            });
            
            deleteBtn.addEventListener('click', function() {
                deleteTest(test.id);
            });
            
            resultsBtn.addEventListener('click', function() {
                openResultsModal(test.id);
            });
        });
    }
    
    /**
     * Display past tests
     * @param {Array} tests - Array of past tests
     */
    function displayPastTests(tests) {
        const container = document.getElementById('past-tests-list');
        const emptyState = document.getElementById('no-past-tests');
        
        // Clear container
        container.innerHTML = '';
        
        if (tests.length === 0) {
            // Show empty state
            emptyState.classList.remove('hidden');
            return;
        }
        
        // Hide empty state
        emptyState.classList.add('hidden');
        
        // Display each test
        tests.forEach(test => {
            const testDate = new Date(test.date);
            const testCard = document.createElement('div');
            testCard.className = 'bg-white border rounded-lg p-4 shadow-sm mock-test-card';
            
            // Format scores
            const physicsScore = test.results?.physics || 'N/A';
            const chemistryScore = test.results?.chemistry || 'N/A';
            const mathematicsScore = test.results?.mathematics || 'N/A';
            const totalScore = test.results?.total || 'N/A';
            
            testCard.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <h4 class="font-medium text-lg">${test.name}</h4>
                        <div class="text-sm text-gray-600">${Utils.formatDateTime(testDate)}</div>
                        <div class="grid grid-cols-2 mt-2 gap-y-1 gap-x-4">
                            <div class="text-sm">
                                <span class="font-medium">Physics:</span> ${physicsScore}
                            </div>
                            <div class="text-sm">
                                <span class="font-medium">Chemistry:</span> ${chemistryScore}
                            </div>
                            <div class="text-sm">
                                <span class="font-medium">Mathematics:</span> ${mathematicsScore}
                            </div>
                            <div class="text-sm">
                                <span class="font-medium">Time Taken:</span> ${test.results?.timeTaken || 'N/A'} mins
                            </div>
                        </div>
                    </div>
                    <div class="text-center">
                        <div class="text-2xl font-bold ${getScoreColorClass(test.results?.total || 0)}">${totalScore}</div>
                        <div class="text-xs text-gray-600">Total Score</div>
                    </div>
                </div>
                ${test.results?.notes ? `
                <div class="mt-3 pt-3 border-t">
                    <div class="text-sm">
                        <span class="font-medium">Notes:</span> ${test.results.notes}
                    </div>
                </div>
                ` : ''}
            `;
            
            container.appendChild(testCard);
        });
    }
    
    /**
     * Delete a mock test
     * @param {string} testId - Test ID to delete
     */
    function deleteTest(testId) {
        if (confirm('Are you sure you want to delete this test?')) {
            Storage.deleteMockTest(testId);
            loadMockTests();
            Utils.showAlert('Success', 'Test deleted successfully', 'success');
            Dashboard.updateUpcomingEvents();
        }
    }
    
    /**
     * Open the results entry modal
     * @param {string} testId - Test ID to enter results for
     */
    function openResultsModal(testId) {
        const modal = document.getElementById('results-modal');
        modal.classList.remove('hidden');
        
        // Store test ID in hidden field
        document.getElementById('result-test-id').value = testId;
        
        // Reset form
        document.getElementById('results-form').reset();
        document.getElementById('total-score').value = '';
        
        // Get test data to pre-fill subjects
        const tests = Storage.getMockTests();
        const test = tests.find(t => t.id === testId);
        
        if (test) {
            // Enable/disable inputs based on subjects
            document.getElementById('physics-score').disabled = !test.subjects.includes('Physics');
            document.getElementById('chemistry-score').disabled = !test.subjects.includes('Chemistry');
            document.getElementById('mathematics-score').disabled = !test.subjects.includes('Mathematics');
            
            // Set default time taken to test duration
            document.getElementById('time-taken').value = test.duration;
            
            // If test already has results, pre-fill them
            if (test.results) {
                document.getElementById('physics-score').value = test.results.physics || '';
                document.getElementById('chemistry-score').value = test.results.chemistry || '';
                document.getElementById('mathematics-score').value = test.results.mathematics || '';
                document.getElementById('time-taken').value = test.results.timeTaken || test.duration;
                document.getElementById('result-notes').value = test.results.notes || '';
                
                // Update total
                updateTotalScore();
            }
        }
    }
    
    /**
     * Set up automatic calculation of total score
     */
    function setupResultsCalculation() {
        const physicsInput = document.getElementById('physics-score');
        const chemistryInput = document.getElementById('chemistry-score');
        const mathematicsInput = document.getElementById('mathematics-score');
        const totalInput = document.getElementById('total-score');
        
        // Calculate total when any score changes
        physicsInput.addEventListener('input', updateTotalScore);
        chemistryInput.addEventListener('input', updateTotalScore);
        mathematicsInput.addEventListener('input', updateTotalScore);
    }
    
    /**
     * Update total score from individual subject scores
     */
    function updateTotalScore() {
        const physicsInput = document.getElementById('physics-score');
        const chemistryInput = document.getElementById('chemistry-score');
        const mathematicsInput = document.getElementById('mathematics-score');
        const totalInput = document.getElementById('total-score');
        
        // Get values (default to 0 if empty or disabled)
        const physics = physicsInput.disabled || physicsInput.value === '' ? 0 : parseInt(physicsInput.value, 10);
        const chemistry = chemistryInput.disabled || chemistryInput.value === '' ? 0 : parseInt(chemistryInput.value, 10);
        const mathematics = mathematicsInput.disabled || mathematicsInput.value === '' ? 0 : parseInt(mathematicsInput.value, 10);
        
        // Calculate total
        const total = physics + chemistry + mathematics;
        
        // Update total input
        totalInput.value = total;
    }
    
    /**
     * Save mock test results
     */
    function saveMockTestResults() {
        // Get test ID
        const testId = document.getElementById('result-test-id').value;
        
        // Get form values
        const physicsScore = document.getElementById('physics-score').disabled ? null : 
            document.getElementById('physics-score').value === '' ? null : 
            parseInt(document.getElementById('physics-score').value, 10);
        
        const chemistryScore = document.getElementById('chemistry-score').disabled ? null : 
            document.getElementById('chemistry-score').value === '' ? null : 
            parseInt(document.getElementById('chemistry-score').value, 10);
        
        const mathematicsScore = document.getElementById('mathematics-score').disabled ? null : 
            document.getElementById('mathematics-score').value === '' ? null : 
            parseInt(document.getElementById('mathematics-score').value, 10);
        
        const totalScore = parseInt(document.getElementById('total-score').value, 10);
        const timeTaken = parseInt(document.getElementById('time-taken').value, 10);
        const notes = document.getElementById('result-notes').value.trim();
        
        // Validate inputs
        if ((physicsScore !== null && (isNaN(physicsScore) || physicsScore < 0 || physicsScore > 100)) ||
            (chemistryScore !== null && (isNaN(chemistryScore) || chemistryScore < 0 || chemistryScore > 100)) ||
            (mathematicsScore !== null && (isNaN(mathematicsScore) || mathematicsScore < 0 || mathematicsScore > 100))) {
            Utils.showAlert('Error', 'Scores must be between 0 and 100', 'error');
            return;
        }
        
        if (isNaN(timeTaken) || timeTaken <= 0) {
            Utils.showAlert('Error', 'Please enter a valid time taken', 'error');
            return;
        }
        
        // Create results object
        const results = {
            physics: physicsScore,
            chemistry: chemistryScore,
            mathematics: mathematicsScore,
            total: totalScore,
            timeTaken: timeTaken,
            notes: notes,
            submittedAt: Date.now()
        };
        
        // Update test in storage
        Storage.updateMockTest(testId, {
            status: 'completed',
            results: results
        });
        
        // Close modal
        document.getElementById('results-modal').classList.add('hidden');
        
        // Refresh tests list
        loadMockTests();
        
        // Show success message
        Utils.showAlert('Success', 'Test results saved successfully', 'success');
        
        // Update analytics
        Analytics.updatePerformanceCharts();
    }
    
    /**
     * Get CSS class for score display based on score value
     * @param {number} score - Test score
     * @returns {string} - CSS class
     */
    function getScoreColorClass(score) {
        if (score < 40) {
            return 'text-red-600';
        } else if (score < 60) {
            return 'text-yellow-600';
        } else if (score < 80) {
            return 'text-blue-600';
        } else {
            return 'text-green-600';
        }
    }
    
    // Public API
    return {
        init,
        loadMockTests
    };
})();
