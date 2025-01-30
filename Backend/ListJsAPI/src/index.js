const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

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
app.get('/', (req, res) => {
    const query = `
        SELECT lists.list_name, list_contents.content
        FROM lists
        LEFT JOIN list_contents ON lists.list_id = list_contents.list_id;
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err });
        }

        const lists = {};
        results.forEach(row => {
            if (!lists[row.list_name]) {
                lists[row.list_name] = [];
            }
            if (row.content) {
                lists[row.list_name].push(row.content);
            }
        });

        res.json(lists);
    });
});

// Get specific list by name
app.get('/:list_name', (req, res) => {
    const listName = req.params.list_name;

    const query = `
        SELECT lists.list_name, list_contents.content
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

        const listContents = results.map(row => row.content).filter(content => content !== null);
        res.json({ list_name: listName, contents: listContents });
    });
});

// Create a new list and add its contents
app.post('/lists', (req, res) => {
    const { list_name, contents } = req.body; // Expecting { list_name: "Groceries", contents: ["Milk", "Eggs"] }

    if (!list_name || !Array.isArray(contents) || contents.length === 0) {
        return res.status(400).json({ error: "Invalid request body. Ensure list_name is a string and contents is a non-empty array." });
    }

    // Insert new list into `lists` table
    const insertListQuery = `INSERT INTO lists (list_name) VALUES (?)`;

    db.query(insertListQuery, [list_name], (err, result) => {
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
                res.json({ message: 'List and contents added successfully', list_id, list_name, contents });
            });
        } else {
            res.json({ message: 'List added successfully (no contents)', list_id, list_name });
        }
    });
});

// Delete a list by name (removes both list and its contents)
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
