/**
 * Contains all validation logic for Gym Member fields including
 * usernames, names, enrollment dates, and cancellation dates. These validators are used
 * to ensure data integrity before creating or updating member records.
 */
const patterns = { // store the RegEx rules in a variable to be used in functions.
    userName: /^\d{2}[A-Za-z]{4,6}$/, // 2 digits followed by 4-6 letters nothing more/less
    name: /^[A-Za-z]+$/ // Letters only any length
};

/**
 * Validates the member's username consisting of two digits followed by 4–6 letters.
 *
 * @function validateUserName
 * @param {string} un - The username string.
 * @returns {boolean} True if the username meets formatting requirements.
 */
function validateUserName(un) {
    return patterns.userName.test(un);
}
/**
 * Validates a name containing only alphabetic characters.
 *
 * @function validateName
 * @param {string} name - The name string.
 * @returns {boolean} True if the name is alphabetic.
 */
function validateName(name) {
    return patterns.name.test(name);
}
/**
 * Validates that an enrollment date is today or earlier.
 *
 * @function validateEnrollmentDate
 * @param {string} date - Enrollment date.
 * @returns {boolean} True if valid.
 */
function validateEnrollmentDate(date) {
    const today = new Date().toISOString().split("T")[0]; //Splits date & time and just returns the date.
    return date && date <= today;
}
/**
 * Validates that a cancellation date is after an enrollment date (if provided).
 *
 * @function validateCancellationDate
 * @param {string} enroll - Enrollment date.
 * @param {string} cancel - Cancellation date.
 * @returns {boolean} True if valid.
 */
function validateCancellationDate(enroll, cancel) {
    if (!cancel) return true;
    return cancel > enroll;
}
