# Sleep Tracker Application

A web application for tracking sleep patterns with user authentication.

## Automatic Setup

1. **Prerequisites**:
   - Install XAMPP (https://www.apachefriends.org/)
   - Make sure Apache and MySQL services are running

2. **Quick Start**:
   - Copy the entire project folder to `C:\xampp\htdocs\`
   - Open your web browser
   - Go to `http://localhost/PHP_PROJECT-main/setup.php`
   - The setup script will automatically:
     - Create required databases
     - Create necessary tables
     - Set up foreign key relationships
   - After successful setup, click the link to go to the login page

3. **Using the Application**:
   - Register a new account
   - Log in with your credentials
   - Start tracking your sleep patterns

## Manual Setup (if needed)

If the automatic setup fails, you can manually:
1. Create databases `login_system` and `sleep_tracker`
2. Import the SQL files from:
   - `login_system/database.sql`
   - `pages/backend/update_database.sql`

## Troubleshooting

If you encounter any issues:
1. Check if XAMPP services are running
2. Verify database credentials in `config/db.php`
3. Check file permissions
4. Look for error messages in the browser console
