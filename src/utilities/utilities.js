// Utilities
function getYear(){
    const d = new Date();
    return d.getFullYear();
}

function getEmailFromJWT(token) {
    const [, payloadBase64] = token.split('.'); // Get the base64 encoded payload
    const payloadJson = atob(payloadBase64); // Decode base64 to JSON
    const payload = JSON.parse(payloadJson); // Parse JSON

    const email = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];

    return email;
}

function getIdFromJWT(token) {
    const [, payloadBase64] = token.split('.');
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    const id = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    return id;
}

function getRolesFromJWT(token) {
    if (!token || token.split('.').length !== 3) {
        console.log("JWT is missing or not formatted correctly:", token);
        return []; // Return an empty role array if JWT is not present or malformed
    }

    const payloadBase64 = token.split('.')[1];
    try {
        const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
        const payload = JSON.parse(payloadJson);
        const roles = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        return Array.isArray(roles) ? roles : [roles]; // Normalize roles to always be an array
    } catch (error) {
        console.error("Error processing JWT:", error);
        return [];
    }
}



function formatPhoneNumber(phone) {
    if (/^\d{10}$/.test(phone)) {
        return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
    }
    return phone; // If the phone number doesn't match the format, do not modify it
}

function capitalizeFirstLetters(string) {
    if (!string) return '';
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export { getYear, getEmailFromJWT, getIdFromJWT, getRolesFromJWT, formatPhoneNumber, capitalizeFirstLetters };
