/**
 * Analytics module for MHT CET Study Tracker
 * Handles performance analytics and error tracking
 */

const Analytics = (function() {
    // Chart instances
    let mockPerformanceChart = null;
    let physicsPerformanceChart = null;
    let chemistryPerformanceChart = null;
    let mathematicsPerformanceChart = null;
    
    /**
     * Initialize the analytics module
     */
    function init() {
        updatePerformanceCharts();
        setupErrorTracker();
    }
    
    /**
     * Update all performance charts
     */
    function updatePerformanceCharts() {
        updateMockTestPerformanceChart();
        updateSubjectPerformanceCharts();
        updatePerformanceStats();
    }
    
    /**
     * Update mock test performance chart
     */
    function updateMockTestPerformanceChart() {
        // Get mock test data
        const mockTests = Storage.getMockTests();
        
        // Filter completed tests
        const completedTests = mockTests.filter(test => test.status === 'completed' && test.results);
        
        // Sort by date
        completedTests.sort((a, b) => a.date - b.date);
        
        // Prepare chart data
        const labels = completedTests.map(test => {
            return Utils.formatDate(new Date(test.date), false);
        });
        
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Total Score',
                    data: completedTests.map(test => test.results?.total || 0),
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgb(59, 130, 246)',
                    borderWidth: 2,
                    tension: 0.1,
                    fill: true
                },
                {
                    label: 'Physics',
                    data: completedTests.map(test => test.results?.physics || 0),
                    backgroundColor: 'rgba(16, 185, 129, 0)',
                    borderColor: 'rgb(16, 185, 129)',
                    borderWidth: 2,
                    borderDash: [],
                    tension: 0.1
                },
                {
                    label: 'Chemistry',
                    data: completedTests.map(test => test.results?.chemistry || 0),
                    backgroundColor: 'rgba(245, 158, 11, 0)',
                    borderColor: 'rgb(245, 158, 11)',
                    borderWidth: 2,
                    borderDash: [],
                    tension: 0.1
                },
                {
                    label: 'Mathematics',
                    data: completedTests.map(test => test.results?.mathematics || 0),
                    backgroundColor: 'rgba(139, 92, 246, 0)',
                    borderColor: 'rgb(139, 92, 246)',
                    borderWidth: 2,
                    borderDash: [],
                    tension: 0.1
                }
            ]
        };
        
        // Get canvas context
        const ctx = document.getElementById('mock-performance-chart').getContext('2d');
        
        // Destroy existing chart if it exists
        if (mockPerformanceChart) {
            mockPerformanceChart.destroy();
        }
        
        // Create chart
        mockPerformanceChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    },
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Score'
                        }
                    }
                }
            }
        });
    }
    
    /**
     * Update subject-specific performance charts
     */
    function updateSubjectPerformanceCharts() {
        // Get mock test data
        const mockTests = Storage.getMockTests();
        
        // Filter completed tests
        const completedTests = mockTests.filter(test => test.status === 'completed' && test.results);
        
        // Sort by date
        completedTests.sort((a, b) => a.date - b.date);
        
        // Prepare data for each subject
        updateSubjectChart('physics', completedTests, 'rgb(16, 185, 129)');
        updateSubjectChart('chemistry', completedTests, 'rgb(245, 158, 11)');
        updateSubjectChart('mathematics', completedTests, 'rgb(139, 92, 246)');
    }
    
    /**
     * Update a specific subject performance chart
     * @param {string} subject - Subject name (lowercase)
     * @param {Array} tests - Mock tests data
     * @param {string} color - Chart color
     */
    function updateSubjectChart(subject, tests, color) {
        // Filter tests that have this subject
        const subjectTests = tests.filter(test => {
            const capitalizedSubject = subject.charAt(0).toUpperCase() + subject.slice(1);
            return test.subjects.includes(capitalizedSubject) && test.results && test.results[subject] !== null;
        });
        
        // Prepare chart data
        const labels = subjectTests.map(test => {
            return Utils.formatDate(new Date(test.date), false);
        });
        
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Score',
                    data: subjectTests.map(test => test.results[subject] || 0),
                    backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.2)'),
                    borderColor: color,
                    borderWidth: 2,
                    tension: 0.1,
                    fill: true
                }
            ]
        };
        
        // Get canvas context
        const ctx = document.getElementById(`${subject}-performance-chart`).getContext('2d');
        
        // Determine which chart to update
        let currentChart;
        if (subject === 'physics') {
            if (physicsPerformanceChart) physicsPerformanceChart.destroy();
            currentChart = physicsPerformanceChart;
        } else if (subject === 'chemistry') {
            if (chemistryPerformanceChart) chemistryPerformanceChart.destroy();
            currentChart = chemistryPerformanceChart;
        } else if (subject === 'mathematics') {
            if (mathematicsPerformanceChart) mathematicsPerformanceChart.destroy();
            currentChart = mathematicsPerformanceChart;
        }
        
        // Create or update chart
        const newChart = new Chart(ctx, {
            type: 'line',
            data: data,
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
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });
        
        // Update chart reference
        if (subject === 'physics') {
            physicsPerformanceChart = newChart;
        } else if (subject === 'chemistry') {
            chemistryPerformanceChart = newChart;
        } else if (subject === 'mathematics') {
            mathematicsPerformanceChart = newChart;
        }
    }
    
    /**
     * Update performance statistics
     */
    function updatePerformanceStats() {
        // Get mock test data
        const mockTests = Storage.getMockTests();
        
        // Filter completed tests
        const completedTests = mockTests.filter(test => test.status === 'completed' && test.results);
        
        // Update tests count
        document.getElementById('tests-count').textContent = completedTests.length;
        
        // Calculate average score
        let totalScore = 0;
        completedTests.forEach(test => {
            totalScore += test.results.total || 0;
        });
        
        const averageScore = completedTests.length > 0 ? Math.round(totalScore / completedTests.length) : 'N/A';
        document.getElementById('average-score').textContent = averageScore;
        
        // Calculate highest score
        let highestScore = 0;
        completedTests.forEach(test => {
            if (test.results.total > highestScore) {
                highestScore = test.results.total;
            }
        });
        
        document.getElementById('highest-score').textContent = completedTests.length > 0 ? highestScore : 'N/A';
        
        // Calculate recent trend
        if (completedTests.length >= 2) {
            // Get last two tests
            const sortedTests = [...completedTests].sort((a, b) => b.date - a.date);
            const lastTest = sortedTests[0];
            const previousTest = sortedTests[1];
            
            const lastScore = lastTest.results.total || 0;
            const previousScore = previousTest.results.total || 0;
            
            const difference = lastScore - previousScore;
            
            if (difference > 0) {
                document.getElementById('recent-trend').textContent = `+${difference}`;
                document.getElementById('recent-trend').className = 'text-2xl font-bold text-green-600';
            } else if (difference < 0) {
                document.getElementById('recent-trend').textContent = difference;
                document.getElementById('recent-trend').className = 'text-2xl font-bold text-red-600';
            } else {
                document.getElementById('recent-trend').textContent = '0';
                document.getElementById('recent-trend').className = 'text-2xl font-bold text-gray-600';
            }
        } else {
            document.getElementById('recent-trend').textContent = '-';
            document.getElementById('recent-trend').className = 'text-2xl font-bold text-gray-600';
        }
        
        // Update subject averages
        updateSubjectAverage('physics', completedTests);
        updateSubjectAverage('chemistry', completedTests);
        updateSubjectAverage('mathematics', completedTests);
    }
    
    /**
     * Update subject average score
     * @param {string} subject - Subject name
     * @param {Array} tests - Completed tests
     */
    function updateSubjectAverage(subject, tests) {
        // Filter tests that have this subject
        const subjectTests = tests.filter(test => {
            const capitalizedSubject = subject.charAt(0).toUpperCase() + subject.slice(1);
            return test.subjects.includes(capitalizedSubject) && test.results && test.results[subject] !== null;
        });
        
        // Calculate average
        let totalScore = 0;
        subjectTests.forEach(test => {
            totalScore += test.results[subject] || 0;
        });
        
        const average = subjectTests.length > 0 ? Math.round(totalScore / subjectTests.length) : 'N/A';
        document.getElementById(`${subject}-average`).textContent = average;
        
        // Calculate trend
        if (subjectTests.length >= 2) {
            // Get last two tests
            const sortedTests = [...subjectTests].sort((a, b) => b.date - a.date);
            const lastTest = sortedTests[0];
            const previousTest = sortedTests[1];
            
            const lastScore = lastTest.results[subject] || 0;
            const previousScore = previousTest.results[subject] || 0;
            
            const difference = lastScore - previousScore;
            
            if (difference > 0) {
                document.getElementById(`${subject}-trend`).textContent = `+${difference}`;
                document.getElementById(`${subject}-trend`).className = 'text-xl font-bold text-green-600';
            } else if (difference < 0) {
                document.getElementById(`${subject}-trend`).textContent = difference;
                document.getElementById(`${subject}-trend`).className = 'text-xl font-bold text-red-600';
            } else {
                document.getElementById(`${subject}-trend`).textContent = '0';
                document.getElementById(`${subject}-trend`).className = 'text-xl font-bold text-gray-600';
            }
        } else {
            document.getElementById(`${subject}-trend`).textContent = '-';
            document.getElementById(`${subject}-trend`).className = 'text-xl font-bold text-gray-600';
        }
    }
    
    /**
     * Set up error tracker functionality
     */
    function setupErrorTracker() {
        // Add error button
        document.getElementById('add-error-btn').addEventListener('click', function() {
            openErrorModal();
        });
        
        // Close error modal
        document.getElementById('close-error-modal').addEventListener('click', function() {
            document.getElementById('error-modal').classList.add('hidden');
        });
        
        // Error form submission
        document.getElementById('error-form').addEventListener('submit', function(e) {
            e.preventDefault();
            saveErrorEntry();
        });
        
        // Error search functionality
        document.getElementById('error-search').addEventListener('input', function() {
            filterErrors(this.value);
        });
        
        // Load errors
        loadErrorEntries();
    }
    
    /**
     * Open the error entry modal
     */
    function openErrorModal() {
        const modal = document.getElementById('error-modal');
        modal.classList.remove('hidden');
        
        // Reset form
        document.getElementById('error-form').reset();
    }
    
    /**
     * Save a new error entry
     */
    function saveErrorEntry() {
        // Get form values
        const subject = document.getElementById('error-subject').value;
        const topic = document.getElementById('error-topic').value.trim();
        const question = document.getElementById('error-question').value.trim();
        const mistake = document.getElementById('error-mistake').value.trim();
        const correct = document.getElementById('error-correct').value.trim();
        const source = document.getElementById('error-source').value.trim();
        
        // Validate inputs
        if (!subject) {
            Utils.showAlert('Error', 'Please select a subject', 'error');
            return;
        }
        
        if (!topic) {
            Utils.showAlert('Error', 'Please enter a topic', 'error');
            return;
        }
        
        if (!question) {
            Utils.showAlert('Error', 'Please describe the question or concept', 'error');
            return;
        }
        
        if (!mistake) {
            Utils.showAlert('Error', 'Please describe the mistake made', 'error');
            return;
        }
        
        if (!correct) {
            Utils.showAlert('Error', 'Please describe the correct approach', 'error');
            return;
        }
        
        // Create error entry
        const errorEntry = {
            id: Utils.generateUUID(),
            timestamp: Date.now(),
            subject: subject,
            topic: topic,
            question: question,
            mistake: mistake,
            correct: correct,
            source: source
        };
        
        // Save to storage
        Storage.addErrorEntry(errorEntry);
        
        // Close modal
        document.getElementById('error-modal').classList.add('hidden');
        
        // Refresh error list
        loadErrorEntries();
        
        // Show success message
        Utils.showAlert('Success', 'Error entry added successfully', 'success');
    }
    
    /**
     * Load error entries from storage
     */
    function loadErrorEntries() {
        const errors = Storage.getErrorTracker();
        
        // Sort by most recent first
        errors.sort((a, b) => b.timestamp - a.timestamp);
        
        // Display errors
        displayErrorEntries(errors);
    }
    
    /**
     * Display error entries
     * @param {Array} errors - Error entries to display
     */
    function displayErrorEntries(errors) {
        const tableContainer = document.getElementById('errors-table-container');
        const tableBody = document.getElementById('errors-table-body');
        const noErrorsElement = document.getElementById('no-errors');
        
        // Clear table
        tableBody.innerHTML = '';
        
        if (errors.length === 0) {
            // Show empty state
            noErrorsElement.classList.remove('hidden');
            tableContainer.classList.add('hidden');
            return;
        }
        
        // Hide empty state, show table
        noErrorsElement.classList.add('hidden');
        tableContainer.classList.remove('hidden');
        
        // Create error rows
        errors.forEach(error => {
            const date = new Date(error.timestamp);
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="error-subject">${error.subject}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="error-topic">${error.topic}</span>
                </td>
                <td class="px-6 py-4">
                    <span class="error-question">${error.question}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    ${Utils.formatDate(date)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button class="text-blue-600 hover:text-blue-800 view-error mr-3" data-id="${error.id}">
                        View
                    </button>
                    <button class="text-red-600 hover:text-red-800 delete-error" data-id="${error.id}">
                        Delete
                    </button>
                </td>
            `;
            
            tableBody.appendChild(row);
            
            // Add event listeners
            const viewBtn = row.querySelector('.view-error');
            const deleteBtn = row.querySelector('.delete-error');
            
            viewBtn.addEventListener('click', function() {
                viewErrorDetails(error.id);
            });
            
            deleteBtn.addEventListener('click', function() {
                deleteErrorEntry(error.id);
            });
        });
    }
    
    /**
     * View error details
     * @param {string} errorId - Error ID to view
     */
    function viewErrorDetails(errorId) {
        const errors = Storage.getErrorTracker();
        const error = errors.find(e => e.id === errorId);
        
        if (!error) return;
        
        // Create and show a modal with error details
        const modalHtml = `
            <div id="view-error-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                <div class="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-bold text-gray-800">Error Details</h3>
                        <button id="close-view-error-modal" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="space-y-4">
                        <div>
                            <div class="text-sm font-medium text-gray-500">Subject</div>
                            <div>${error.subject}</div>
                        </div>
                        <div>
                            <div class="text-sm font-medium text-gray-500">Topic</div>
                            <div>${error.topic}</div>
                        </div>
                        <div>
                            <div class="text-sm font-medium text-gray-500">Question/Concept</div>
                            <div>${error.question}</div>
                        </div>
                        <div>
                            <div class="text-sm font-medium text-gray-500">Mistake Made</div>
                            <div class="text-red-600">${error.mistake}</div>
                        </div>
                        <div>
                            <div class="text-sm font-medium text-gray-500">Correct Approach</div>
                            <div class="text-green-600">${error.correct}</div>
                        </div>
                        ${error.source ? `
                        <div>
                            <div class="text-sm font-medium text-gray-500">Source</div>
                            <div>${error.source}</div>
                        </div>
                        ` : ''}
                        <div>
                            <div class="text-sm font-medium text-gray-500">Date Added</div>
                            <div>${Utils.formatDateTime(new Date(error.timestamp))}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to body
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHtml;
        document.body.appendChild(modalContainer.firstChild);
        
        // Add close event listener
        document.getElementById('close-view-error-modal').addEventListener('click', function() {
            document.getElementById('view-error-modal').remove();
        });
    }
    
    /**
     * Delete an error entry
     * @param {string} errorId - Error ID to delete
     */
    function deleteErrorEntry(errorId) {
        if (confirm('Are you sure you want to delete this error entry?')) {
            Storage.deleteErrorEntry(errorId);
            loadErrorEntries();
            Utils.showAlert('Success', 'Error entry deleted', 'success');
        }
    }
    
    /**
     * Filter errors based on search term
     * @param {string} searchTerm - Term to search for
     */
    function filterErrors(searchTerm) {
        const errors = Storage.getErrorTracker();
        
        if (!searchTerm) {
            // If no search term, show all errors
            displayErrorEntries(errors);
            return;
        }
        
        // Convert search term to lowercase for case-insensitive search
        const term = searchTerm.toLowerCase();
        
        // Filter errors
        const filteredErrors = errors.filter(error => {
            return error.subject.toLowerCase().includes(term) ||
                   error.topic.toLowerCase().includes(term) ||
                   error.question.toLowerCase().includes(term) ||
                   error.mistake.toLowerCase().includes(term) ||
                   error.correct.toLowerCase().includes(term) ||
                   (error.source && error.source.toLowerCase().includes(term));
        });
        
        // Display filtered errors
        displayErrorEntries(filteredErrors);
    }
    
    // Public API
    return {
        init,
        updatePerformanceCharts
    };
})();
