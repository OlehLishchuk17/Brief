const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const { Database } = require('@sqlitecloud/drivers');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Підключення до SQLite Cloud
const db = new Database(process.env.DB_CONN);

// Маршрут для відображення брифу
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Маршрут для отримання даних з форми
app.post('/submit', (req, res) => {
    const { companyName, projectType, deadline, budget, features, targetAudience, designPreference, additionalNotes } = req.body;

    // Вставка даних у базу даних
    db.run(
        `INSERT INTO briefs (companyName, projectType, deadline, budget, features, targetAudience, designPreference, additionalNotes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [companyName, projectType, deadline, budget, features, targetAudience, designPreference, additionalNotes],
        function (err) {
            if (err) {
                return res.status(500).send('Error saving data.');
            }
            res.send('Дякуємо за заповнення брифу!');
        }
    );
});

// Маршрут для адміністративної панелі
app.get('/admin', (req, res) => {
    const password = req.query.password;
    if (password === process.env.ADMIN_PASS) {
        db.all('SELECT * FROM briefs', (err, rows) => {
            if (err) {
                return res.status(500).send('Error retrieving data.');
            }
            res.json(rows);
        });
    } else {
        res.status(403).send('Невірний пароль');
    }
});

// Старт сервера
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
