const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Change this
    database: 'weblist'  // Change this
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Get all lists and their contents
// example: curl.exe -X GET http://localhost:5000/
// Get all lists and their contents, sorted by last_changed in descending order
app.get('/', (req, res) => {
    const query = `
        SELECT lists.list_id, lists.list_name, lists.list_description, lists.creation_date, lists.last_changed, list_contents.content, list_contents.checked
        FROM lists
        LEFT JOIN list_contents ON lists.list_id = list_contents.list_id
        ORDER BY lists.last_changed DESC;
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }

        const lists = {};
        results.forEach(row => {
            if (!lists[row.list_name]) {
                lists[row.list_name] = {
                    list_id: row.list_id,
                    list_description: row.list_description,
                    creation_date: row.creation_date,
                    last_changed: row.last_changed,
                    contents: [],
                };
            }
            if (row.content) {
                lists[row.list_name].contents.push({
                    content: row.content,
                    checked: row.checked,
                });
            }
        });

        res.json(lists);
    });
});

// Get specific list by name
// example: curl.exe -X GET http://localhost:5000/Groceries
app.get('/:list_name', (req, res) => {
    const listName = req.params.list_name;

    const query = `
        SELECT lists.list_id, lists.list_name, lists.list_description, lists.creation_date, lists.last_changed, list_contents.content, list_contents.checked
        FROM lists
        LEFT JOIN list_contents ON lists.list_id = list_contents.list_id
        WHERE lists.list_name = ?;
    `;

    db.query(query, [listName], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'List not found' });
        }

        const listContents = results.map(row => ({
            content: row.content,
            checked: row.checked,
        })).filter(item => item.content !== null);

        res.json({
            list_id: results[0].list_id,
            list_name: results[0].list_name,
            list_description: results[0].list_description,
            creation_date: results[0].creation_date,
            last_changed: results[0].last_changed,
            contents: listContents,
        });
    });
});

// Create a new list and add its contents
// example: curl.exe -X POST http://localhost:5000/lists -H "Content-Type: application/json" -d '{\"list_name\": \"test\", \"list_description\": \"My test list\", \"contents\": [\"Milk\", \"Eggs\"]}'
app.post('/lists', (req, res) => {
    const { list_name, list_description, contents } = req.body; // Expecting { list_name: "Groceries", list_description: "My grocery list", contents: ["Milk", "Eggs"] }

    if (!list_name || !list_description || !Array.isArray(contents) || contents.length === 0) {
        return res.status(400).json({ error: "Invalid request body. Ensure list_name, list_description are strings and contents is a non-empty array." });
    }

    // Insert new list into `lists` table
    const insertListQuery = `INSERT INTO lists (list_name, list_description) VALUES (?, ?)`;

    db.query(insertListQuery, [list_name, list_description], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error: Unable to insert list', details: err });
        }

        const list_id = result.insertId;

        // Prepare the content insertion if there are items
        if (contents.length > 0) {
            const insertContentsQuery = `INSERT INTO list_contents (list_id, content) VALUES ?`;
            const contentValues = contents.map(content => [list_id, content]);

            db.query(insertContentsQuery, [contentValues], (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error: Unable to insert contents', details: err });
                }
                res.json({ message: 'List and contents added successfully', list_id, list_name, list_description, contents });
            });
        } else {
            res.json({ message: 'List added successfully (no contents)', list_id, list_name, list_description });
        }
    });
});

// Delete a list by name (removes both list and its contents)
// example: curl.exe -X DELETE http://localhost:5000/lists/test
app.delete('/lists/:list_name', (req, res) => {
    const listName = req.params.list_name;

    // First, get the list_id for the provided list_name
    const getListIdQuery = `SELECT list_id FROM lists WHERE list_name = ?`;

    db.query(getListIdQuery, [listName], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error: Unable to find list', details: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'List not found' });
        }

        const listId = results[0].list_id;

        // Delete contents of the list first
        const deleteContentsQuery = `DELETE FROM list_contents WHERE list_id = ?`;

        db.query(deleteContentsQuery, [listId], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Database error: Unable to delete list contents', details: err });
            }

            // Now, delete the list itself
            const deleteListQuery = `DELETE FROM lists WHERE list_id = ?`;

            db.query(deleteListQuery, [listId], (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error: Unable to delete list', details: err });
                }

                res.json({ message: `List "${listName}" and its contents have been deleted successfully` });
            });
        });
    });
});

//-----------------------------------------------------------------------------

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});