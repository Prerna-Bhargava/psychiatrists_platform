
const bcrypt = require('bcryptjs');
const db = require('../database/db'); 
const { isValidEmail, isValidPassword,isValidPhoneNumber, isValidImage } = require('../utils/validations');


// register a new user
const register = async (req, res) => {
    const { name, address, email, phone, password, photo } = req.body;

    // Checking if all required fields are provided
    const requiredFields = { name, address, email, password, photo };
    const missingFields = Object.keys(requiredFields).filter(field => !requiredFields[field]);
    if (missingFields.length > 0) {
        return res.status(400).json({ error: `${missingFields.join(', ')} must be provided` });
    }

    // Validate address length
    if (address.length < 10) {
        return res.status(400).json({ error: 'Address must be at least 10 characters long.' });
    }

    // Validate email format
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    if (phone && !isValidPhoneNumber(phone)) {
        return res.status(400).json({ error: 'Phone number must be at least 10 digits long, including the country code.' });
    }
    

    // Validate password format
    if (!isValidPassword(password)) {
        return res.status(400).json({ error: 'Password must contain one upper case letter, one lower case letter, and a number. Length: 8-15 characters.' });
    }

    // Validate photo as base64
    if (!isValidImage(photo)) {
        return res.status(400).json({ error: 'Photo must be a valid string.' });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Inserting user data into the database
    const query = 'INSERT INTO patients (name, address, email, phone, password, photo, psychiatrist_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, address, email, phone, hashedPassword, Buffer.from(photo, 'base64'), null], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error registering patient.' });
        }
        res.status(201).json({ message: 'Patient registered successfully.' });
    });
};

// API to fetch psychiatrists and patient details for a hospital
const psychiatristsDetails = async (req, res) => {
    const { hospitalId } = req.body;

    if (!hospitalId) {
        return res.status(400).json({message:'Hospital ID is required.'});
    }

    const hospitalQuery = 'SELECT name FROM hospitals WHERE id = ?';
    db.query(hospitalQuery, [hospitalId], (err, hospitalResults) => {
        if (err) {
            console.error(err);
            return res.status(500).json({message:'Error fetching hospital details.'});
        }

        if (hospitalResults.length === 0) {
            return res.status(404).json({message:'Hospital not found.'});
        }

        const hospitalName = hospitalResults[0].name;

        const psychiatristsQuery = `
            SELECT p.id, p.name, COUNT(pt.id) AS patient_count
            FROM psychiatrists p
            LEFT JOIN patients pt ON p.id = pt.psychiatrist_id
            WHERE p.hospital_id = ?
            GROUP BY p.id, p.name
        `;

        db.query(psychiatristsQuery, [hospitalId], (err, psychiatristsResults) => {
            if (err) {
                console.error(err);
                return res.status(500).json({message: 'Error fetching psychiatrists details.'});
            }

            const totalPsychiatrists = psychiatristsResults.length;
            const totalPatients = psychiatristsResults.reduce((acc, psych) => acc + psych.patient_count, 0);

            const response = {
                hospitalName,
                totalPsychiatrists,
                totalPatients,
                psychiatrists: psychiatristsResults
            };

            res.status(200).json(response);
        });
    });
};

module.exports = {register,psychiatristsDetails}
