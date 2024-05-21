
// Utility function to validate email
const isValidEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

// Utility function to validate password
const isValidPassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/;
    return re.test(password);
};

// Function to validate Image as string
function isValidImage(str) {

    if (typeof str !== 'string') return false;
    return true;

}

// Function to validate phone number
function isValidPhoneNumber(phone) {
    const phoneRegex = /^\+\d{1,3}\d{10,}$/;
    return phoneRegex.test(phone);
}

module.exports ={isValidEmail,isValidPassword,isValidImage,isValidPhoneNumber}