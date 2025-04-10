I'll help you run the files from the start. Here's a step-by-step guide:
First, let's make sure you have the necessary software installed:
XAMPP (which includes Apache and MySQL)
A web browser
A code editor (like VS Code)
Here's how to run the project:
Start XAMPP:
Open XAMPP Control Panel
Start Apache and MySQL services
Set up the databases:
Open your web browser and go to http://localhost/phpmyadmin
Create two databases:
login_system
sleep_tracker
Import the database schemas:
In phpMyAdmin, select the login_system database
Click on "Import" tab
Choose the file PHP_PROJECT-main/login_system/database.sql
Click "Go" to import
Then select the sleep_tracker database
Click on "Import" tab
Choose the file PHP_PROJECT-main/pages/backend/update_database.sql
Click "Go" to import
Place the project files:
Copy the entire PHP_PROJECT-main folder to your XAMPP's htdocs directory
The typical path is: C:\xampp\htdocs\PHP_PROJECT-main
Access the project:
Open your web browser
Go to http://localhost/PHP_PROJECT-main/login_system/login.html
Test the registration and login:
Click on "Sign-up" to create a new account
Fill in your details (name, email, password)
After registration, you can log in with your credentials
Upon successful login, you'll be redirected to the main site
