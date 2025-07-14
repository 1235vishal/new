// const db = require("../db");

// const createTestimonialTable = () => {
//     const sql = `
//     CREATE TABLE IF NOT EXISTS testimonials (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       name VARCHAR(255),
//       role VARCHAR(100),
//       quote TEXT,
//       image VARCHAR(500)
//     )`;
//     db.query(sql, (err) => {
//         if (err) throw err;
//         console.log("Testimonials table ensured");
//     });
// };

// const insertTestimonial = (data, callback) => {
//     const sql = "INSERT INTO testimonials (name, role, quote, image) VALUES (?, ?, ?, ?)";
//     db.query(sql, [data.name, data.role, data.quote, data.image], callback);
// };

// const getAllTestimonials = (callback) => {
//     db.query("SELECT * FROM testimonials ORDER BY id DESC", callback);
// };

// module.exports = {
//     createTestimonialTable,
//     insertTestimonial,
//     getAllTestimonials
// };


const pool = require("../db");

const createTestimonialTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS testimonials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      role VARCHAR(100),
      quote TEXT,
      image VARCHAR(500)
    )
  `;
    pool.query(sql, (err) => {
        if (err) {
            console.error("❌ Error creating testimonials table:", err.message);
        } else {
            console.log("✅ Testimonials table ensured");
        }
    });
};

const insertTestimonial = (data, callback) => {
    const sql = "INSERT INTO testimonials (name, role, quote, image) VALUES (?, ?, ?, ?)";
    pool.query(sql, [data.name, data.role, data.quote, data.image], callback);
};

const getAllTestimonials = (callback) => {
    pool.query("SELECT * FROM testimonials ORDER BY id DESC", callback);
};

const deleteTestimonial = (id, callback) => {
    pool.query("DELETE FROM testimonials WHERE id = ?", [id], callback);
};

const updateTestimonial = (id, data, callback) => {
    const sql = "UPDATE testimonials SET name=?, role=?, quote=?, image=? WHERE id=?";
    pool.query(sql, [data.name, data.role, data.quote, data.image, id], callback);
};

module.exports = {
    createTestimonialTable,
    insertTestimonial,
    getAllTestimonials,
    deleteTestimonial,
    updateTestimonial
};
