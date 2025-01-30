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

--- example: INSERT INTO lists (list_name) VALUES ('Groceries');
--- example: INSERT INTO list_contents (list_id, content) VALUES
--- example: (1, 'Apples'),
--- example: (1, 'Milk'),
--- example: (1, 'Bread');

