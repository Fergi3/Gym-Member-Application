/**
 * Represents a gym member in the system.
 *
 * @class GymMember
 * @constructor
 * @param {string} id - A unique 6-digit identifier for the member.
 * @param {string} userName - Two digits followed by 4–6 letters.
 * @param {string} firstName - Member's first name.
 * @param {string} lastName - Member's last name.
 * @param {string} enrollmentDate - ISO formatted date the member enrolled.
 * @param {string} cancellationDate - ISO formatted cancellation date (optional).
 * @param {boolean} poolAccess - Whether the member has pool access.
 * @param {boolean} spaAccess - Whether the member has spa access.
 *
 * @example
 * const m = new GymMember("123456", "12abcd", "John", "Doe", "(Current date)", "", true, false);
 */
function GymMember(id, userName, firstName, lastName, enrollmentDate, cancellationDate, poolAccess, spaAccess) {
    this.id = id;
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.enrollmentDate = enrollmentDate;
    this.cancellationDate = cancellationDate || "";
    this.poolAccess = !!poolAccess;
    this.spaAccess = !!spaAccess;
}
/**
 * Holds all GymMember objects currently in the system.
 * @type {GymMember[]}
 */
let members = [];
/**
 * Tracks the current sorting state of the member table.
 * @type {{column: string, direction: "asc"|"desc"}}
 */
let sortState = { column: "id", direction: "asc" };
/**
 * Tracks the current page index for pagination.
 * @type {number}
 */
let currentPage = 1;
/**
 * Number of members displayed per page.
 * @type {number}
 */
const pageSize = 10;
