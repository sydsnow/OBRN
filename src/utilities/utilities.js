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
    const [, payloadBase64] = token.split('.');
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    const roles = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return roles;
}

function formatPhoneNumber(phone) {
    if (/^\d{10}$/.test(phone)) {
        return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
    }
    return phone; // If the phone number doesn't match the format, do not modify it
}

export { getYear, getEmailFromJWT, getIdFromJWT, getRolesFromJWT, formatPhoneNumber }