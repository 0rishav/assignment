const mysql = require('mysql2');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Anonymous@123#',
    database: 'user_schema',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


module.exports = {
    createUser: (req, res) => {
        const { name, email, phone, date } = req.body;
        pool.query(
            'INSERT INTO users (name, email, phone, date) VALUES (?, ?, ?, ?)',
            [name, email, phone, date],
            (err, results) => {
                if (err) {
                    console.error('Error creating user:', err.message);
                    return res.status(500).json({ error: 'Failed to create user' });
                }
                console.log('User created successfully');
                res.status(201).json({ message: 'User created successfully', userId: results.insertId });
            }
        );
    },
    getAllUsers: (req, res) => {
        pool.query(
            'SELECT * FROM users',
            (err, results) => {
                if (err) {
                    console.error('Error fetching users:', err.message);
                    return res.status(500).json({ error: 'Failed to fetch users' });
                }
                console.log('Users fetched successfully');
                res.status(200).json({ users: results });
            }
        );
    },
    updateUser: (req, res) => {
        const userId = req.params.id;
        const { name, email, phone, date } = req.body;
        pool.query(
            'UPDATE users SET name = ?, email = ?, phone = ?, date = ? WHERE id = ?',
            [name, email, phone, date, userId],
            (err, results) => {
                if (err) {
                    console.error('Error updating user:', err.message);
                    return res.status(500).json({ error: 'Failed to update user' });
                }
                if (results.affectedRows === 0) {
                    return res.status(404).json({ error: 'User not found' });
                }
                console.log('User updated successfully');
                res.status(200).json({ message: 'User updated successfully' });
            }
        );
    },
    singleUser:(req,res)=>{
        const userId = req.params.id;
        pool.query(
            'SELECT * FROM users WHERE id = ?',
            [userId],
            (err, results) => {
                if (err) {
                    console.error('Error fetching user details:', err.message);
                    return res.status(500).json({ error: 'Failed to fetch user details' });
                }
                if (results.length === 0) {
                    return res.status(404).json({ error: 'User not found' });
                }
                const user = results[0];
                res.status(200).json({ user });
            }
        );
    },
    deleteUser: (req, res) => {
        const userId = req.params.id;
        pool.query(
            'DELETE FROM users WHERE id = ?',
            [userId],
            (err, results) => {
                if (err) {
                    console.error('Error deleting user:', err.message);
                    return res.status(500).json({ error: 'Failed to delete user' });
                }
                if (results.affectedRows === 0) {
                    return res.status(404).json({ error: 'User not found' });
                }
                console.log('User deleted successfully');
                res.status(200).json({ message: 'User deleted successfully' });
            }
        );
    },
    pool: pool 
};
