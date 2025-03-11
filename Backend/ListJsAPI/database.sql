CREATE TABLE lists (
    list_id INT AUTO_INCREMENT PRIMARY KEY,
    list_name VARCHAR(255) NOT NULL,
    list_description VARCHAR(255) NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_changed TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE list_contents (
    content_id INT AUTO_INCREMENT PRIMARY KEY,
    list_id INT NOT NULL,
    content VARCHAR(255) NOT NULL,
    checked BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (list_id) REFERENCES lists(list_id)
);

INSERT INTO lists (list_name, list_description) VALUES ('Groceries','My grocery list');

INSERT INTO list_contents (list_id, content) VALUES
(1, 'Apples'),
(1, 'Milk'),
(1, 'Bread');

INSERT INTO lists (list_name, list_description) VALUES ('Chores','My daily list of chores');

INSERT INTO list_contents (list_id, content) VALUES
(2, 'Clean room'),
(2, 'Empty trash'),
(2, 'Cook food');
