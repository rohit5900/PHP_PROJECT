// Sleep tracking functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let sleepData = [];
    let currentUser = null;

    // Check if user is logged in
    function checkLoginStatus() {
        fetch('../pages/backend/check_session.php')
            .then(response => response.json())
            .then(data => {
                if (data.loggedIn) {
                    currentUser = data.user;
                    loadSleepData();
                } else {
                    window.location.href = '../login_system/login.php';
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // Load sleep data for the current user
    function loadSleepData() {
        if (!currentUser) return;

        fetch('../pages/backend/get_sleep_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: currentUser.id })
        })
        .then(response => response.json())
        .then(data => {
            sleepData = data;
            updateCharts();
        })
        .catch(error => console.error('Error:', error));
    }

    // Handle sleep tracker form submission
    const trackerForm = document.getElementById('tracker-form');
    if (trackerForm) {
        trackerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                user_id: currentUser.id,
                sleep_time: document.getElementById('sleep-time').value,
                wake_time: document.getElementById('wake-time').value,
                quality: document.getElementById('sleep-quality').value,
                notes: document.getElementById('sleep-notes').value
            };

            fetch('../pages/backend/save_sleep_data.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Sleep data saved successfully!');
                    loadSleepData();
                    trackerForm.reset();
                } else {
                    alert('Error saving sleep data: ' + data.message);
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }

    // Update charts with sleep data
    function updateCharts() {
        if (!sleepData.length) return;

        // Prepare data for charts
        const dates = sleepData.map(entry => entry.day);
        const sleepHours = sleepData.map(entry => {
            const sleepTime = new Date('1970-01-01T' + entry.sleep_time);
            const wakeTime = new Date('1970-01-01T' + entry.wake_time);
            return (wakeTime - sleepTime) / (1000 * 60 * 60);
        });
        const qualityScores = sleepData.map(entry => entry.quality);

        // Update sleep duration chart
        const durationCtx = document.getElementById('sleep-duration-chart');
        if (durationCtx) {
            new Chart(durationCtx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'Sleep Duration (hours)',
                        data: sleepHours,
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Hours'
                            }
                        }
                    }
                }
            });
        }

        // Update sleep quality chart
        const qualityCtx = document.getElementById('sleep-quality-chart');
        if (qualityCtx) {
            new Chart(qualityCtx, {
                type: 'bar',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'Sleep Quality',
                        data: qualityScores,
                        backgroundColor: '#2ecc71',
                        borderColor: '#27ae60'
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10,
                            title: {
                                display: true,
                                text: 'Quality Score'
                            }
                        }
                    }
                }
            });
        }
    }

    // Initialize date and time inputs
    function initializeDateTimeInputs() {
        const today = new Date().toISOString().split('T')[0];
        const sleepTimeInput = document.getElementById('sleep-time');
        const wakeTimeInput = document.getElementById('wake-time');
        
        if (sleepTimeInput) {
            sleepTimeInput.value = '22:00';
        }
        if (wakeTimeInput) {
            wakeTimeInput.value = '06:00';
        }
    }

    // Initialize the application
    function init() {
        checkLoginStatus();
        initializeDateTimeInputs();
    }

    // Start the application
    init();
});
