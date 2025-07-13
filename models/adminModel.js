
const bcrypt = require('bcryptjs');
const connection = require('../db');

const adminModel = {
    createAdminTable: () => {
        const sql = `
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
        connection.query(sql, (err) => {
            if (err) {
                console.error('❌ Error creating admin table:', err.message);
            } else {
                console.log('✅ Admin table created or already exists');
            }
        });
    },

    register: async (username, email, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return new Promise((resolve, reject) => {
            connection.query(
                'INSERT INTO admins (username, email, password) VALUES (?, ?, ?)',
                [username, email, hashedPassword],
                (error, results) => {
                    if (error) reject(error);
                    else resolve(results);
                }
            );
        });
    },

    login: async (email, password) => {
        return new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM admins WHERE email = ?',
                [email],
                async (error, results) => {
                    if (error) return reject(error);
                    if (results.length === 0) return resolve(null);

                    const admin = results[0];
                    const isMatch = await bcrypt.compare(password, admin.password);
                    if (!isMatch) return resolve(null);

                    resolve(admin);
                }
            );
        });
    }
};

// Call table creation on load
adminModel.createAdminTable();

module.exports = adminModel;
