// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const router = express.Router();
// const testimonialModel = require("../models/testimonialModel");
// const db = require('../db');
// testimonialModel.createTestimonialTable();

// // Image upload config
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/");
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     },
// });

// const upload = multer({ storage });

// // Add testimonial with image
// router.post("/", upload.single("image"), (req, res) => {
//     const { name, role, quote } = req.body;
//     const image = req.file ? `/uploads/${req.file.filename}` : "";
//     const data = { name, role, quote, image };

//     testimonialModel.insertTestimonial(data, (err, result) => {
//         if (err) return res.status(500).send("DB Insert Error");
//         res.send("Testimonial added");
//     });
// });

// // Get all testimonials
// router.get("/", (req, res) => {
//     testimonialModel.getAllTestimonials((err, results) => {
//         if (err) return res.status(500).send("DB Fetch Error");
//         res.json(results);
//     });
// });


// // DELETE testimonial
// router.delete("/:id", (req, res) => {
//     const sql = "DELETE FROM testimonials WHERE id = ?";
//     db.query(sql, [req.params.id], (err, result) => {
//         if (err) return res.status(500).send("Delete failed");
//         res.send("Deleted successfully");
//     });
// });

// // UPDATE testimonial (with or without image)
// router.put("/:id", upload.single("image"), (req, res) => {
//     const { name, role, quote } = req.body;
//     const image = req.file ? `/uploads/${req.file.filename}` : req.body.existingImage;

//     const sql = "UPDATE testimonials SET name=?, role=?, quote=?, image=? WHERE id=?";
//     db.query(sql, [name, role, quote, image, req.params.id], (err, result) => {
//         if (err) return res.status(500).send("Update failed");
//         res.send("Updated successfully");
//     });
// });


// module.exports = router;


const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const testimonialModel = require("../models/testimonialModel");

testimonialModel.createTestimonialTable();

// Image upload config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Add testimonial
router.post("/", upload.single("image"), (req, res) => {
    const { name, role, quote } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";
    const data = { name, role, quote, image };

    testimonialModel.insertTestimonial(data, (err, result) => {
        if (err) return res.status(500).send("DB Insert Error");
        res.send("Testimonial added");
    });
});

// Get all testimonials
router.get("/", (req, res) => {
    testimonialModel.getAllTestimonials((err, results) => {
        if (err) return res.status(500).send("DB Fetch Error");
        res.json(results);
    });
});

// DELETE testimonial
router.delete("/:id", (req, res) => {
    testimonialModel.deleteTestimonial(req.params.id, (err, result) => {
        if (err) return res.status(500).send("Delete failed");
        res.send("Deleted successfully");
    });
});

// UPDATE testimonial (with or without image)
router.put("/:id", upload.single("image"), (req, res) => {
    const { name, role, quote, existingImage } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : existingImage;
    const data = { name, role, quote, image };

    testimonialModel.updateTestimonial(req.params.id, data, (err, result) => {
        if (err) return res.status(500).send("Update failed");
        res.send("Updated successfully");
    });
});

module.exports = router;
