
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const adminRoutes = require('./routes/adminRoutes');
// const contactRoutes = require('./routes/contactRoutes');
// const testimonialRoutes = require("./routes/testimonialRoutes");
// const path = require("path");

// require('./db'); // DB connect
// require('./models/adminModel'); // Automatically creates admin table
// require('./models/contactModel'); // Auto table creation

// dotenv.config();
// const app = express();
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.use(cors());
// app.use(express.json());

// app.use('/api/admin', adminRoutes);
// app.use('/api/contact', contactRoutes);
// app.use("/api/testimonials", testimonialRoutes);


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
// });


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require("path");

dotenv.config();

const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');
const testimonialRoutes = require("./routes/testimonialRoutes");

// Load DB and models (auto table creation)
require('./db'); // MySQL pool
require('./models/adminModel');
require('./models/contactModel');
require('./models/testimonialModel'); // ✅ Add this line

const app = express();

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/testimonials", testimonialRoutes);

// Server port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
