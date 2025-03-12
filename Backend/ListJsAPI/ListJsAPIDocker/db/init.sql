CREATE DATABASE weblist;

USE weblist;

CREATE TABLE lists (
    list_id INT AUTO_INCREMENT PRIMARY KEY,
    list_name VARCHAR(255) NOT NULL
);

CREATE TABLE list_contents (
    content_id INT AUTO_INCREMENT PRIMARY KEY,
    list_id INT NOT NULL,
    content VARCHAR(255) NOT NULL,
    FOREIGN KEY (list_id) REFERENCES lists(list_id)
);

INSERT INTO lists (list_name) VALUES ('Groceries');
INSERT INTO list_contents (list_id, content) VALUES
(1, 'Apples'),
(1, 'Milk'),
(1, 'Bread');