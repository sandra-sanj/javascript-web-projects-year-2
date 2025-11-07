CREATE USER 'cats'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON `wskcats`.* TO 'cats'@'localhost';
FLUSH PRIVILEGES;
