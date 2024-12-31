const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // your MySQL root password
    database: 'truck_mate'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Add this endpoint to fetch complaints
app.get('/complaints', (req, res) => {
    const query = 'SELECT * FROM complaints';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Other routes...

app.post('/signup', (req, res) => {
    const { name, email, mobileNumber, nicNumber, password } = req.body;
    const query = 'INSERT INTO customer (name, email, mobileNumber, nicNumber, password) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, email, mobileNumber, nicNumber, password], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('Admin registered successfully!');
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM customer WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

app.get('/drivers', (req, res) => {
    const query = 'SELECT * FROM driver';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.delete('/drivers/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM driver WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('Driver deleted successfully!');
    });
});

app.put('/user/password', (req, res) => {
    const { email, currentPassword, newPassword } = req.body;
    const query = 'SELECT * FROM customer WHERE email = ? AND password = ?';
    db.query(query, [email, currentPassword], (err, results) => {
        if (err) {
            console.error('Error in SELECT query:', err);
            return res.status(500).send(err);
        }
        if (results.length > 0) {
            const updateQuery = 'UPDATE customer SET password = ? WHERE email = ?';
            db.query(updateQuery, [newPassword, email], (err, result) => {
                if (err) {
                    console.error('Error in UPDATE query:', err);
                    return res.status(500).send(err);
                }
                res.json({ success: true });
            });
        } else {
            console.error('Current password does not match');
            res.json({ success: false });
        }
    });
});
// Endpoint to fetch complaints
app.get('/complaints', (req, res) => {
    const query = 'SELECT * FROM complaints';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

//----------------

app.get('/order_history', (req, res) => {
    const sqlQuery = 'SELECT * FROM order_history';
    db.query(sqlQuery, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(result);
      }
    });
  });
 //--------------------- 
 // Endpoint to search for an order by order_id
app.get('/order_history/:order_id', (req, res) => {
    const { order_id } = req.params;
    const sqlQuery = 'SELECT * FROM order_history WHERE order_id = ?';
    db.query(sqlQuery, [order_id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).send('Not Found           ');
        }
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
