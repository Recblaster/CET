/**
 * Study Plan module for MHT CET Study Tracker
 * Handles study plan functionality
 */

const StudyPlan = (function() {
    // We only use Plan 1 as per user request
    
    // Study plan content for Plan 2
    const plan2Content = {
        day1: {
            title: "Day 1: Topic Analysis & Priority Setting",
            timeEstimate: "10 hours",
            colorClass: "text-blue-700",
            bgColorClass: "bg-blue-100",
            textColorClass: "text-blue-600",
            sessions: [
                {
                    title: "Morning (3 hours): Organization & Pattern Analysis",
                    tasks: [
                        "Download official MHT-CET syllabus and identify all core topics",
                        "Create a spreadsheet to track performance by topic across all 3 subjects",
                        "Analyze last 5 year paper patterns to identify topic weightage"
                    ]
                },
                {
                    title: "Afternoon (4 hours): Question Bank Creation",
                    tasks: [
                        "Collect MCQs from multiple sources (PYQs, coaching modules, etc.)",
                        "Sort by difficulty (easy, medium, hard) for each topic",
                        "Create flashcards for formula-intensive topics"
                    ]
                },
                {
                    title: "Evening (3 hours): Set Goals & Learning Path",
                    tasks: [
                        "Set daily topic targets for each subject",
                        "Align topics with available learning resources",
                        "Schedule daily small assessments (25-30 mins each)"
                    ]
                }
            ]
        },
        day2: {
            title: "Day 2: Physics Mastery Focus",
            timeEstimate: "10 hours",
            colorClass: "text-green-700",
            bgColorClass: "bg-green-100",
            textColorClass: "text-green-600",
            sessions: [
                {
                    title: "Morning (3 hours): Mechanics & Waves",
                    tasks: [
                        "Review core formulas with application examples",
                        "Solve 30 high-yield MCQs focusing on graph interpretations",
                        "Create summary sheets for key principles (Newton's Laws, Conservation)"
                    ]
                },
                {
                    title: "Afternoon (4 hours): Electromagnetism",
                    tasks: [
                        "Practice circuits and magnetic field problems (min. 25)",
                        "Categorize questions by calculation type vs. conceptual understanding",
                        "Create diagrams for field visualization techniques"
                    ]
                },
                {
                    title: "Evening (3 hours): Modern Physics & Optics",
                    tasks: [
                        "Tackle numerical problems in quantum physics and optics",
                        "Create error log for frequently misunderstood concepts",
                        "Take a 50-minute focused assessment on day's topics"
                    ]
                }
            ]
        },
        day3: {
            title: "Day 3: Chemistry Strategic Review",
            timeEstimate: "10 hours",
            colorClass: "text-purple-700",
            bgColorClass: "bg-purple-100", 
            textColorClass: "text-purple-600",
            sessions: [
                {
                    title: "Morning (3 hours): Organic Chemistry Mapping",
                    tasks: [
                        "Map reaction mechanisms with clear visualization",
                        "Practice reagent-based questions with systematic approach",
                        "Create mnemonic devices for reaction sequences"
                    ]
                },
                {
                    title: "Afternoon (4 hours): Physical & Inorganic Chemistry",
                    tasks: [
                        "Focus on equilibrium, thermodynamics, and electrochemistry calculations",
                        "Review periodic table trends with application examples",
                        "Create quick-reference charts for chemical properties"
                    ]
                },
                {
                    title: "Evening (3 hours): Mixed Review & Assessment",
                    tasks: [
                        "Take 3 mini-tests (20 mins each) with mixed topics",
                        "Analyze error patterns and categorize by concept",
                        "Create summary notes for challenging topics identified"
                    ]
                }
            ]
        },
        day4: {
            title: "Day 4: Mathematics Problem Solving",
            timeEstimate: "10 hours",
            colorClass: "text-yellow-700",
            bgColorClass: "bg-yellow-100",
            textColorClass: "text-yellow-800",
            sessions: [
                {
                    title: "Morning (4 hours): Calculus & Functions",
                    tasks: [
                        "Practice integration techniques with step-by-step approach",
                        "Review application problems (area, volume, etc.)",
                        "Create formula cards with application examples"
                    ]
                },
                {
                    title: "Afternoon (3 hours): Algebra & Coordinate Geometry",
                    tasks: [
                        "Focus on equation systems and 3D geometry problems",
                        "Practice graphical interpretations and transformations",
                        "Create visual guides for complex geometric concepts"
                    ]
                },
                {
                    title: "Evening (3 hours): Probability & Statistics",
                    tasks: [
                        "Tackle probability distribution problems systematically",
                        "Review combinatorial approaches to counting problems",
                        "Take a comprehensive 60-minute math assessment"
                    ]
                }
            ]
        },
        day5: {
            title: "Day 5: Integration & Full Assessment",
            timeEstimate: "10 hours",
            colorClass: "text-red-700",
            bgColorClass: "bg-red-100",
            textColorClass: "text-red-600",
            sessions: [
                {
                    title: "Morning (3 hours): Cross-disciplinary Review",
                    tasks: [
                        "Practice problems requiring knowledge from multiple subjects",
                        "Review error log and address persistent challenges",
                        "Focus on time-saving techniques for calculation-heavy problems"
                    ]
                },
                {
                    title: "Afternoon (4 hours): Full-length Mock Test",
                    tasks: [
                        "Take a full 3-hour MHT-CET mock exam under test conditions",
                        "Avoid any references or assistance during simulation",
                        "Replicate exact timing for Physics/Chemistry and Mathematics sections"
                    ]
                },
                {
                    title: "Evening (3 hours): Performance Analysis & Planning",
                    tasks: [
                        "Score and evaluate mock test performance by topic/concept",
                        "Identify remaining weaknesses and create targeted study plan",
                        "Organize final revision strategy based on performance metrics"
                    ]
                }
            ]
        }
    };
    
    /**
     * Initialize the study plan module
     */
    function init() {
        // Removed plan switcher as requested
        setupAccordionToggle();
        attachTaskCheckboxHandlers();
        updateDayProgress();
    }
    
    /**
     * Set up accordion toggle functionality
     */
    function setupAccordionToggle() {
        // Get all accordion toggle buttons
        const toggleButtons = document.querySelectorAll('.accordion-toggle');
        
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Find the content container
                const content = this.nextElementSibling;
                
                // Toggle the open class
                content.classList.toggle('open');
                
                // Rotate the icon
                const icon = this.querySelector('.accordion-icon');
                icon.classList.toggle('rotate-180');
            });
        });
        
        // Open first accordion by default
        if (toggleButtons.length > 0) {
            const firstContent = toggleButtons[0].nextElementSibling;
            firstContent.classList.add('open');
            const firstIcon = toggleButtons[0].querySelector('.accordion-icon');
            firstIcon.classList.add('rotate-180');
        }
    }
    
    /**
     * Attach event handlers to task checkboxes
     */
    function attachTaskCheckboxHandlers() {
        // Get all task checkboxes
        const checkboxes = document.querySelectorAll('.task-checkbox');
        
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const taskId = this.id;
                const day = this.getAttribute('data-day');
                const completed = this.checked;
                
                // Get plan number from the task ID
                const isPlan2 = taskId.startsWith('plan2-');
                const planNumber = isPlan2 ? 2 : 1;
                
                // Update storage
                Storage.updateStudyPlanTask('day' + day, taskId, completed, planNumber);
                
                // Update UI
                updateDayProgress();
                Dashboard.updateOverallProgress();
                
                // Log activity
                if (completed) {
                    Storage.logActivity('Completed study plan task', { day, taskId });
                } else {
                    Storage.logActivity('Uncompleted study plan task', { day, taskId });
                }
            });
        });
        
        // Load saved progress
        loadSavedProgress();
    }
    
    /**
     * Load saved progress from storage
     */
    function loadSavedProgress() {
        const progress = Storage.getStudyPlanProgress();
        
        // Process each day's tasks for Plan 1
        for (let day = 1; day <= 5; day++) {
            const dayKey = 'day' + day;
            
            if (progress[dayKey]) {
                progress[dayKey].forEach(task => {
                    const checkbox = document.getElementById(task.id);
                    
                    if (checkbox) {
                        checkbox.checked = task.completed;
                    }
                });
            }
        }
        
        // Process each day's tasks for Plan 2
        for (let day = 1; day <= 5; day++) {
            const dayKey = 'plan2_day' + day;
            
            if (progress[dayKey]) {
                progress[dayKey].forEach(task => {
                    const checkbox = document.getElementById(task.id);
                    
                    if (checkbox) {
                        checkbox.checked = task.completed;
                    }
                });
            }
        }
    }
    
    /**
     * Update progress display for each day
     */
    function updateDayProgress() {
        const progress = Storage.getStudyPlanProgress();
        
        // Process each day (always Plan 1)
        for (let day = 1; day <= 5; day++) {
            const dayKey = 'day' + day;
            
            // Count completed tasks
            let completedTasks = 0;
            
            if (progress[dayKey]) {
                progress[dayKey].forEach(task => {
                    if (task.completed) {
                        completedTasks++;
                    }
                });
            }
            
            // Calculate percentage - Plan 1 has 6 tasks per day
            const totalTasks = 6;
            const percentage = Utils.calculatePercentage(completedTasks, totalTasks);
            
            // Update UI
            updateDayProgressUI(day, completedTasks, percentage);
        }
    }
    
    /**
     * Update UI elements for day progress
     * @param {number} day - Day number (1-5)
     * @param {number} completedTasks - Number of completed tasks
     * @param {number} percentage - Completion percentage
     */
    function updateDayProgressUI(day, completedTasks, percentage) {
        // Update progress text in accordion header
        const progressSpan = document.querySelector(`.day-progress[data-day="${day}"]`);
        if (progressSpan) {
            progressSpan.textContent = `${percentage}%`;
            
            // Apply color based on progress
            progressSpan.className = 'text-sm mr-4 day-progress';
            
            if (percentage < 30) {
                progressSpan.classList.add('text-red-600');
            } else if (percentage < 70) {
                progressSpan.classList.add('text-yellow-600');
            } else if (percentage < 100) {
                progressSpan.classList.add('text-blue-600');
            } else {
                progressSpan.classList.add('text-green-600');
            }
        }
        
        // Update progress bar
        const progressBar = document.getElementById(`day${day}-progress-bar`);
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
        
        // Update tasks count
        const tasksCount = document.getElementById(`day${day}-tasks-count`);
        if (tasksCount) {
            // Plan 1 has 6 tasks per day
            const totalTasks = 6;
            tasksCount.textContent = `${completedTasks}/${totalTasks}`;
        }
    }
    
    /**
     * Set up plan switcher UI and event handlers
     */
    function setupPlanSwitcher() {
        // Check if the plan switcher already exists
        if (document.getElementById('plan-switcher')) {
            return;
        }
        
        // Add plan switcher UI to study-plan tab, right after the heading
        const studyPlanHeading = document.querySelector('#study-plan h2');
        
        if (!studyPlanHeading) {
            console.error('Study plan heading not found');
            return;
        }
        
        // Create plan switcher element
        const planSwitcherHtml = `
            <div id="plan-switcher" class="mb-6 bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row justify-between items-center">
                <div class="text-gray-700 mb-3 sm:mb-0">
                    <span class="font-medium">Select Study Plan:</span>
                </div>
                <div class="flex space-x-3">
                    <button id="plan1-btn" class="px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active">
                        Plan 1: PYQ Strategy
                    </button>
                    <button id="plan2-btn" class="px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Plan 2: Topic Mastery
                    </button>
                </div>
            </div>
        `;
        
        // Insert after heading
        studyPlanHeading.insertAdjacentHTML('afterend', planSwitcherHtml);
        
        // Style the active button
        document.getElementById('plan1-btn').classList.add('bg-blue-600', 'text-white');
        document.getElementById('plan2-btn').classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
        
        // Add event listeners for plan buttons
        document.getElementById('plan1-btn').addEventListener('click', function() {
            if (currentPlan === 1) return; // Already on Plan 1
            switchToPlan(1);
        });
        
        document.getElementById('plan2-btn').addEventListener('click', function() {
            if (currentPlan === 2) return; // Already on Plan 2
            switchToPlan(2);
        });
    }
    
    /**
     * Switch between study plans
     * @param {number} planNumber - Plan number (1 or 2)
     */
    function switchToPlan(planNumber) {
        currentPlan = planNumber;
        
        // Update button styles
        const plan1Btn = document.getElementById('plan1-btn');
        const plan2Btn = document.getElementById('plan2-btn');
        
        if (planNumber === 1) {
            plan1Btn.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
            plan1Btn.classList.add('bg-blue-600', 'text-white');
            
            plan2Btn.classList.remove('bg-blue-600', 'text-white');
            plan2Btn.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
        } else {
            plan2Btn.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
            plan2Btn.classList.add('bg-blue-600', 'text-white');
            
            plan1Btn.classList.remove('bg-blue-600', 'text-white');
            plan1Btn.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
        }
        
        // Get the container for the plan
        const planContainer = document.querySelector('#study-plan .bg-white.rounded-lg.shadow-md.mb-8');
        
        if (!planContainer) {
            console.error('Study plan container not found');
            return;
        }
        
        // Recreate the plan content
        if (planNumber === 1) {
            // Original plan is already in the HTML, just make sure it's showing
            const dayPlans = document.querySelectorAll('.day-plan');
            dayPlans.forEach(day => {
                if (day.classList.contains('hidden')) {
                    day.classList.remove('hidden');
                }
            });
        } else {
            // Replace with Plan 2 content
            renderPlan2();
        }
        
        // Log activity
        Storage.logActivity('Switched to study plan', { plan: planNumber });
    }
    
    /**
     * Render Plan 2 content
     */
    function renderPlan2() {
        // Get the container for the plan - update selector to match the HTML structure
        const planContainer = document.querySelector('#study-plan .bg-white.rounded-lg.shadow-md.mb-6');
        
        if (!planContainer) {
            console.error('Study plan container not found');
            return;
        }
        
        // Clear the container
        planContainer.innerHTML = '';
        
        // Generate HTML for Plan 2
        for (let day = 1; day <= 5; day++) {
            const dayKey = 'day' + day;
            const dayData = plan2Content[dayKey];
            
            const dayHtml = `
                <div class="p-6 border-b border-gray-200 day-plan" data-day="${day}">
                    <div class="flex flex-wrap justify-between items-center mb-4 gap-2">
                        <h4 class="text-lg font-bold ${dayData.colorClass}">${dayData.title}</h4>
                        <span class="text-xs font-semibold ${dayData.textColorClass} ${dayData.bgColorClass} px-2 py-1 rounded-full">
                            ${dayData.timeEstimate}
                        </span>
                    </div>
                    <div class="space-y-5 text-sm">
                        ${dayData.sessions.map(session => `
                            <div>
                                <h5 class="font-semibold text-gray-700 mb-2">${session.title}</h5>
                                <ul class="space-y-2 pl-1 list-none">
                                    ${session.tasks.map(task => `
                                        <li class="flex items-start">
                                            <input type="checkbox" class="task-checkbox mt-1" id="plan2-day${day}-task${session.tasks.indexOf(task)}" data-day="${day}">
                                            <label>${task}</label>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            planContainer.insertAdjacentHTML('beforeend', dayHtml);
        }
        
        // Re-attach checkbox event handlers
        attachTaskCheckboxHandlers();
    }
    
    // Public API
    return {
        init,
        updateDayProgress
    };
})();
