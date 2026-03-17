// VIEW SWITCHING

/**
 * Handles all application-level interactions including form submission,
 * editing, deleting, pagination behavior, sorting, filtering triggers, and view switching.
 * Coordinates user actions with UI and model updates.
 */

/**
 * Opens the Create Member form and resets all form values.
 *
 * @event click#showCreateViewBtn
 * @returns {void}
 */
$("#showCreateViewBtn").on("click", () => { clearForm(); switchToFormView(false); });
/**
 * Navigates back to the member list view.
 *
 * @event click#showListViewBtn
 * @returns {void}
 */
$("#showListViewBtn").on("click", switchToListView);
/**
 * Cancels an edit operation and returns to the member list.
 *
 * @event click#cancelEditBtn
 * @returns {void}
 */
$("#cancelEditBtn").on("click", switchToListView);
/**
 * Generates the next sequential 6-digit member ID based on the
 * highest existing ID in the members array. Ensures IDs remain
 * in ascending numeric order (e.g., 100001, 100002, ...).
 *
 * @function generateSequentialId
 * @returns {string} A new unique 6-digit ID.
 */
function generateSequentialId() {
    if (members.length === 0) return "100001";

    const maxId = Math.max(...members.map(m => Number(m.id)));
    // padStart will autofill "0" until "6" digits is reached starting with "1" in the ID.
    return (maxId + 1).toString().padStart(6, "0");
}


// FORM SUBMISSION
/**
 * Handles both creating a new member and updating an existing one.
 * Performs validation on all fields before allowing submission.
 *
 * @event submit#memberForm
 * @returns {void}
 */
$("#memberForm").on("submit", function (e) {
    e.preventDefault();

    const fields = {
        un: $("#userNameInput").val().trim(),
        fn: $("#firstNameInput").val().trim(),
        ln: $("#lastNameInput").val().trim(),
        ed: $("#enrollmentDateInput").val(),
        cd: $("#cancellationDateInput").val(),
        pool: $("#poolAccessInput").is(":checked"),
        spa: $("#spaAccessInput").is(":checked")
    };

    // VALIDATE ALL FIELDS
    /**
     * Mapping of field IDs to validation results.
     * @type {Object.<string, boolean>}
     */
    const errors = {
        userNameError: !validateUserName(fields.un),
        firstNameError: !validateName(fields.fn),
        lastNameError: !validateName(fields.ln),
        enrollmentDateError: !validateEnrollmentDate(fields.ed),
        cancellationDateError: !validateCancellationDate(fields.ed, fields.cd)
    };

    let valid = true;
    /**
     * Updates the UI with validation error messages.
     * @example
     * // Adds "Invalid input." under the input field
     */
    Object.entries(errors).forEach(([id, hasError]) => {
        $("#" + id).text(hasError ? "Invalid input." : "");
        if (hasError) valid = false;
    });

    if (!valid) return;

    const editingId = $("#editModeId").val();
    /**
     * Updates an existing member using Object.assign to preserve reference integrity.
     */
    // UPDATE
    if (editingId) {
        Object.assign(
            members.find(m => m.id === editingId),
            {
                userName: fields.un,
                firstName: fields.fn,
                lastName: fields.ln,
                enrollmentDate: fields.ed,
                cancellationDate: fields.cd,
                poolAccess: fields.pool,
                spaAccess: fields.spa
            }
        );
    } else {
        // CREATE
        const autoId = generateSequentialId();
        members.push(new GymMember(
            autoId, fields.un, fields.fn, fields.ln,
            fields.ed, fields.cd, fields.pool, fields.spa
        ));
    }
    saveMembers();
    clearForm();
    switchToListView();
});


// EDIT MEMBER
/**
 * Loads an existing member into the form and switches into edit mode.
 *
 * @function editMember
 * @global - Targets button onclick event "editMember"
 * @method .find -Array method to find the member object with matching ID.
 * @param {string} id - The member's unique ID.
 * @returns {void}
 */
window.editMember = id => {
    const m = members.find(mem => mem.id === id);
    // Loop through every property in the member object
    Object.entries(m).forEach(([key, val]) => {
        const input = $("#" + key + "Input");
        if (input.attr("type") === "checkbox") input.prop("checked", val);
        else input.val(val);
    });

    // Sync toggle button highlight
    $(".access-toggle").each(function () {
        const checkboxSelector = $(this).data("target");
        const isActive = $(checkboxSelector).prop(":checked");
        $(this).toggleClass("active", isActive);
    })

    $("#editModeId").val(id);
    switchToFormView(true);

};

// DELETE MEMBER

/**
 * Deletes a member after user confirmation. Updates the table automatically.
 *
 * @function deleteMember
 * @global
 * @param {string} id - The ID of the member to delete.
 * @returns {void}
 *

 */
window.deleteMember = id => {
    const m = members.find(mem => mem.id === id);

    if (confirm(`Delete Member?\n\n${m.firstName} ${m.lastName}\nID: ${m.id}`)) {
        members = members.filter(mem => mem.id !== id);

        saveMembers();
        renderTable();
    }
};


// PAGINATION
/**
 * Moves to the previous page of results, if possible.
 *
 * @event click#prevPageBtn
 * @returns {void}
 */
$("#prevPageBtn").on("click", () => {
    if (currentPage > 1) { currentPage--; renderTable(); }
});

/**
 * Moves to the next page of paginated results, if possible.
 * Total pages are derived from the filtered member set.
 *
 * @event click#nextPageBtn
 * @returns {void}
 */
$("#nextPageBtn").on("click", () => {
    const totalPages = Math.ceil(applyFilters().length / pageSize);
    if (currentPage < totalPages) { currentPage++; renderTable(); }
});


// RESET PAGE WHEN FILTERS CHANGE
/**
 * Resets pagination to page 1 whenever filters or checkboxes change.
 *
 * @event input.filter-input
 * @event change.filter-check
 * @returns {void}
 */
$(".filter-input, .filter-check").on("input change", () => {
    currentPage = 1;
    renderTable();
});


// SORTING
/**
 * Changes the sorting column/direction when a sortable header is clicked.
 * Toggles between ascending and descending order.
 *
 * @event click.sortable
 * @returns {void}
 */
$(".sortable").on("click", function () {
    const col = $(this).data("sort");
    sortState.direction =
        sortState.column === col && sortState.direction === "asc"
            ? "desc" : "asc";

    sortState.column = col;
    currentPage = 1;
    renderTable();
});


// UTILITIES
/**
 * Clears the member form and resets edit mode.
 *
 * @function clearForm
 * @returns {void}
 *
 * @example
 * clearForm();
 */
function clearForm() {
    $("#memberForm")[0].reset();
    $("#editModeId").val("");
    $(".error").text("");
    $(".access-toggle").removeClass("active");
}

// SAVE MEMBERS (local storage)
/**
 * Saves the current members array into browser localStorage.
 *
 * @function saveMembers
 * @returns {void}
 */
function saveMembers(){
    localStorage.setItem("members", JSON.stringify(members));
}
/**
 * Loads member data from browser localStorage (if present),
 * reconstructs GymMember objects, and populates the members array.
 *
 * @function loadMembers
 * @returns {void}
 */
function loadMembers(){
    const data = localStorage.getItem("members");
    if(!data) {return}

    const parsed = JSON.parse(data);

    members = parsed.map(m => new GymMember(
        m.id,
        m.userName,
        m.firstName,
        m.lastName,
        m.enrollmentDate,
        m.cancellationDate,
        m.poolAccess,
        m.spaAccess
    ));
}
/**
 * Initializes the application on DOM ready by loading
 * members from storage and rendering the initial table view.
 *
 * @event document.ready
 */
$(document).ready(function () {
    loadMembers();
    renderTable();
})
