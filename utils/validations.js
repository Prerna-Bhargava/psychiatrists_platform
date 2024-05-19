
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

// Function to validate base64 format
function isValidBase64(str) {
    if (typeof str !== 'string') return false;
    return /^(data:image\/\w+;base64,)?[A-Za-z0-9+/=]+$/i.test(str);
}


module.exports ={isValidEmail,isValidPassword,isValidBase64}