USE sleep_tracker;

ALTER TABLE sleep_tracker
ADD COLUMN user_id INT NOT NULL AFTER id,
ADD FOREIGN KEY (user_id) REFERENCES login_system.users(id); 