/**
 * Resources module for MHT CET Study Tracker
 * Handles study resources links and functionality
 */

const Resources = (function() {
    /**
     * Initialize the resources module
     */
    function init() {
        attachButtonHandlers();
    }
    
    /**
     * Attach button click handlers
     */
    function attachButtonHandlers() {
        // Reference books toggle
        document.getElementById('show-books-btn').addEventListener('click', function() {
            const booksSection = document.getElementById('reference-books');
            booksSection.classList.toggle('hidden');
            
            // Change button text based on visibility
            if (booksSection.classList.contains('hidden')) {
                this.innerHTML = 'View List <i class="fas fa-arrow-right ml-1"></i>';
            } else {
                this.innerHTML = 'Hide List <i class="fas fa-arrow-up ml-1"></i>';
            }
        });
        
        // Test series toggle
        document.getElementById('show-test-series-btn').addEventListener('click', function() {
            const testSeriesSection = document.getElementById('test-series-options');
            testSeriesSection.classList.toggle('hidden');
            
            // Change button text based on visibility
            if (testSeriesSection.classList.contains('hidden')) {
                this.innerHTML = 'View Options <i class="fas fa-arrow-right ml-1"></i>';
            } else {
                this.innerHTML = 'Hide Options <i class="fas fa-arrow-up ml-1"></i>';
            }
        });
        
        // Formula sheets download
        document.getElementById('download-formulas-btn').addEventListener('click', function() {
            downloadFormulaSheets();
        });
        
        // Make sure all external links open in a new tab
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            if (!link.hasAttribute('target')) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }
    
    /**
     * Handle formula sheets download
     */
    function downloadFormulaSheets() {
        // Show options in a modal
        const modalHtml = `
            <div id="formula-sheets-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                <div class="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-bold text-gray-800">Formula Sheets</h3>
                        <button id="close-formula-modal" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="space-y-4">
                        <p class="text-gray-600">Select a subject to download formula sheets:</p>
                        <div class="space-y-3">
                            <div class="p-3 border rounded-lg hover:bg-blue-50 cursor-pointer transition">
                                <a href="https://drive.google.com/drive/folders/1CwQfF-ZZmYvzC8Wcp3W8bLKk_E21WTBv?usp=sharing" target="_blank" class="flex items-center text-blue-600">
                                    <i class="fas fa-atom text-lg mr-3"></i>
                                    <div>
                                        <div class="font-medium">Physics Formula Sheets</div>
                                        <div class="text-sm text-gray-600">Complete collection of physics formulas for MHT CET</div>
                                    </div>
                                </a>
                            </div>
                            <div class="p-3 border rounded-lg hover:bg-green-50 cursor-pointer transition">
                                <a href="https://drive.google.com/drive/folders/1M7c1X7GVQiPkg1Rku9lzlB9CvzHiPeju?usp=sharing" target="_blank" class="flex items-center text-green-600">
                                    <i class="fas fa-flask text-lg mr-3"></i>
                                    <div>
                                        <div class="font-medium">Chemistry Formula Sheets</div>
                                        <div class="text-sm text-gray-600">Important reactions and formulas for Chemistry</div>
                                    </div>
                                </a>
                            </div>
                            <div class="p-3 border rounded-lg hover:bg-purple-50 cursor-pointer transition">
                                <a href="https://drive.google.com/drive/folders/12zaTTiTR27EOqoOPB7wqZ3Rx8AZ7fzbf?usp=sharing" target="_blank" class="flex items-center text-purple-600">
                                    <i class="fas fa-calculator text-lg mr-3"></i>
                                    <div>
                                        <div class="font-medium">Mathematics Formula Sheets</div>
                                        <div class="text-sm text-gray-600">Comprehensive math formulas and shortcuts</div>
                                    </div>
                                </a>
                            </div>
                            <div class="p-3 border rounded-lg hover:bg-yellow-50 cursor-pointer transition">
                                <a href="https://drive.google.com/drive/folders/1YD-SSrpG0fZA7TNYHbON971mZ9lBZmTj?usp=sharing" target="_blank" class="flex items-center text-yellow-600">
                                    <i class="fas fa-file-download text-lg mr-3"></i>
                                    <div>
                                        <div class="font-medium">Complete Formula Package</div>
                                        <div class="text-sm text-gray-600">Download all formula sheets in a single package</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 pt-4 border-t text-sm text-gray-500">
                        <p>Note: These links will take you to Google Drive for downloading the formula sheets.</p>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to body
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHtml;
        document.body.appendChild(modalContainer.firstChild);
        
        // Add close event listener
        document.getElementById('close-formula-modal').addEventListener('click', function() {
            document.getElementById('formula-sheets-modal').remove();
        });
        
        // Log activity
        Storage.logActivity('Viewed formula sheets');
    }
    
    // Public API
    return {
        init
    };
})();
