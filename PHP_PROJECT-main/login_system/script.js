document.addEventListener('DOMContentLoaded', function() {
    const signInForm = document.getElementById('sign-in-form');
    const signUpForm = document.getElementById('sign-up-form');
    const toggleButton = document.getElementById('toggleButton');
    const signIn = document.getElementById('sign-in');
    const signUp = document.getElementById('sign-up');

    // Get redirect URL from query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirect') || '../pages/tracker.php';

    // Toggle between sign-in and sign-up forms
    toggleButton.addEventListener('click', function() {
        if (signIn.style.display === 'none') {
            signIn.style.display = 'block';
            signUp.style.display = 'none';
            toggleButton.textContent = 'Sign-up';
        } else {
            signIn.style.display = 'none';
            signUp.style.display = 'block';
            toggleButton.textContent = 'Sign-in';
        }
    });

    // Handle sign-in form submission
    signInForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('logEmail').value;
        const password = document.getElementById('logPassword').value;

        try {
            const response = await fetch('login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            console.log('Login response:', data); // Debug log
            
            if (data.success) {
                alert('Login successful!');
                // Use the redirect URL from the server response or fallback to main.php
                const redirectUrl = data.redirect || '../pages/tracker.php';
                window.location.href = redirectUrl;
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login');
        }
    });

    // Handle sign-up form submission
    signUpForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;

        try {
            const response = await fetch('register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();
            
            if (data.success) {
                alert('Registration successful! Please login.');
                // Switch to sign-in form
                signIn.style.display = 'block';
                signUp.style.display = 'none';
                toggleButton.textContent = 'Sign-up';
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during registration');
        }
    });
});