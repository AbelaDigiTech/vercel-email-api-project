
//RENDER URL: https://vercel-email-api-project-haa6.onrender.com

const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());

// 1. Connection to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// 2. User Schema for MongoDB (Moved up so the route can use it)
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  connectedAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', UserSchema);

// 3. Nodemailer Transporter using Gmail (Moved up so the route can use it)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS 
  }
});

// 4. Connection route handler
app.post('/api/connect', async (req, res) => {
    try {
        const { email } = req.body;

        // Email Validation
        if (!email) {
            return res.status(400).json({ 
                error: 'Email is required please!' 
            });
        }

        // Save user to MongoDB database
        const newUser = new User({ email });
        await newUser.save();
        console.log(`Saved to MongoDB: ${email}`);

        // Email notification setup
        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: email, 
          subject: 'Connection Successful!',
          text: 'Hello! You have successfully connected to our platform server.',
          html: '<h1>Connection Success</h1><p>Your email has successfully hooked up to our node system.</p>'
        };

        // Sending the email
        await transporter.sendMail(mailOptions);
        console.log(`Notification sent successfully to ${email}`);

        // One single response back to the frontend at the very end
        return res.status(201).json({
            success: true,
            message: 'Email successfully logged and notification sent!',
            user: { email }
        });

    } catch (error) {
        console.error('Connection error:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

// 5. Fallback route for unmatched requests (Fixed the '*' issue causing your crash)
//  PASTE THIS INSTEAD:
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
















// const express = require('express');
// const mongoose = require('mongoose');
// const nodemailer = require('nodemailer');
// require('dotenv').config();

// // Connection to MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('Successfully connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// const app = express();

// const port = 3000;

// app.use(express.json());

// // Connection route handler
// app.post('/api/connect', async (req, res) => {
//     try {
//         const { email } = req.body;

//         // Email Validation
//         if (!email) {
//             return res.status(400).json({ 
//                 error: 'email is required please!.' 
//             });
//         }

     
//         // Email notification setup

//     const mailOptions = {
//       from: process.env.GMAIL_USER,
//       to: email, // Sends notification right to the email they used to sign in
//       subject: 'Connection Successful!',
//       text: 'Hello! You have successfully connected to our platform server.',
//       html: '<h1>Connection Success</h1><p>Your email has successfully hooked up to our node system.</p>'
//     };

//     // Sending the email
//     await transporter.sendMail(mailOptions);
//     console.log(`Notification sent successfully to ${email}`);

//     res.status(200).json({ success: true, message: 'Connected and email notification sent!' });

//        // Server successful response

//     return res.status(201).json({
//             message: 'email successfully used!',
//             user: {
//                    email
//             }
//         });

//     } catch (error) {
//         console.error('Signup error:', error);
//         return res.status(500).json({ error: 'Internal server error.' });
//     }
// });

// // Fallback route for unmatched requests
// app.use('*', (req, res) => {
//     res.status(404).json({ error: 'Route not found' });
// });

// // User Schema for MongoDB

// const UserSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   connectedAt: { type: Date, default: Date.now }
// });
// const User = mongoose.model('User', UserSchema);

// // Nodemailer Transporter using Gmail
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASS 
//   }
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

    











// // const express = require('express');
// // const mongoose = require('mongoose');
// // const nodemailer = require('nodemailer');
// // require('dotenv').config();

// // const app = express();
// // app.use(express.json()); // Allows server to read JSON bodies sent from frontend

// // // 1. Connect to MongoDB
// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => console.log('Successfully connected to MongoDB'))
// //   .catch(err => console.error('MongoDB connection error:', err));

// // // 2. Define a Simple User Schema
// // const UserSchema = new mongoose.Schema({
// //   email: { type: String, required: true },
// //   password: { type: String, required: true }, // Stored as-is per request
// //   connectedAt: { type: Date, default: Date.now }
// // });
// // const User = mongoose.model('User', UserSchema);

// // // 3. Setup Nodemailer Transporter using Gmail
// // const transporter = nodemailer.createTransport({
// //   service: 'gmail',
// //   auth: {
// //     user: process.env.GMAIL_USER,
// //     pass: process.env.GMAIL_APP_PASS // Your 16-character App Password
// //   }
// // });

// // // 4. The "Connect" Endpoint
// // app.post('/api/connect', async (req, res) => {
// //   const { email, password } = req.body;

// //   if (!email || !password) {
// //     return res.status(400).json({ success: false, message: 'Email and password are required' });
// //   }

// //   try {
// //     // Save credentials into MongoDB
// //     const newUser = new User({ email, password });
// //     await newUser.save();
// //     console.log(`Saved credentials for: ${email}`);

// //     // Set up the notification email layout
// //     const mailOptions = {
// //       from: process.env.GMAIL_USER,
// //       to: email, // Sends notification right to the email they used to sign in
// //       subject: 'Connection Successful!',
// //       text: 'Hello! You have successfully connected to our platform server.',
// //       html: '<h1>Connection Success</h1><p>Your email has successfully hooked up to our node system.</p>'
// //     };

// //     // Send the email
// //     await transporter.sendMail(mailOptions);
// //     console.log(`Notification sent successfully to ${email}`);

// //     res.status(200).json({ success: true, message: 'Connected and email notification sent!' });

// //   } catch (error) {
// //     console.error('Operation failed:', error);
// //     res.status(500).json({ success: false, message: 'An error occurred processing the request.' });
// //   }
// // });

// // // Start Server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server blasting off on port ${PORT}`));