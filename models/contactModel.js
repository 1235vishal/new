// const connection = require('../db');

// const contactModel = {
//     createContactTable: () => {
//         const sql = `
//       CREATE TABLE IF NOT EXISTS contacts (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(100) NOT NULL,
//         email VARCHAR(100) NOT NULL,
//         phone VARCHAR(20) NOT NULL,
//         message TEXT NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `;
//         connection.query(sql, (err) => {
//             if (err) {
//                 console.error("❌ Failed to create contacts table:", err.message);
//             } else {
//                 console.log("✅ Contacts table ready");
//             }
//         });
//     },

//     saveContact: ({ name, email, phone, message }) => {
//         return new Promise((resolve, reject) => {
//             const sql = 'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)';
//             connection.query(sql, [name, email, phone, message], (err, result) => {
//                 if (err) return reject(err);
//                 resolve(result);
//             });
//         });
//     },

//     getAllContacts: () => {
//         return new Promise((resolve, reject) => {
//             connection.query('SELECT * FROM contacts ORDER BY created_at DESC', (err, results) => {
//                 if (err) return reject(err);
//                 resolve(results);
//             });
//         });
//     },

//     deleteContact: (id) => {
//         return new Promise((resolve, reject) => {
//             const query = "DELETE FROM contacts WHERE id = ?";
//             connection.query(query, [id], (err, result) => {
//                 if (err) return reject(err);
//                 resolve(result);
//             });
//         });
//     }
// };

// // Auto create table
// contactModel.createContactTable();

// module.exports = contactModel;

const pool = require('../db');

const contactModel = {
    createContactTable: () => {
        const sql = `
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
        pool.query(sql, (err) => {
            if (err) {
                console.error("❌ Failed to create contacts table:", err.message);
            } else {
                console.log("✅ Contacts table ready");
            }
        });
    },

    saveContact: ({ name, email, phone, message }) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)';
            pool.query(sql, [name, email, phone, message], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },

    getAllContacts: () => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM contacts ORDER BY created_at DESC', (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    },

    deleteContact: (id) => {
        return new Promise((resolve, reject) => {
            const query = "DELETE FROM contacts WHERE id = ?";
            pool.query(query, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
};

// Auto create table
contactModel.createContactTable();

module.exports = contactModel;
