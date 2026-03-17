/**
 * Responsible for rendering the UI, updating table output,
 * switching between views, applying filters, applying sorting, and updating pagination UI.
 */

/**
 * Switches the UI to the Add/Edit Member form view.
 *
 * @function switchToFormView
 * @param {boolean} [editing=false] - Whether the form is being used for editing.
 * @returns {void}
 */
function switchToFormView(editing = false) {
    $("#formView").removeClass("hidden");
    $("#listView").addClass("hidden");
    $("#formTitle").text(editing ? "Edit Member" : "Add Gym Member");
    $(".error").text("");
}
/**
 * Switches the UI to the member list view.
 *
 * @function switchToListView
 * @returns {void}
 */
function switchToListView() {
    $("#formView").addClass("hidden");
    $("#listView").removeClass("hidden");
    renderTable();
}
/**
 * Renders the paginated, filtered, and sorted member list table.
 *
 * @function renderTable
 * @returns {void}
 * @variable $tbody = Table body (jQuery version of my table body element)
 * @example
 * renderTable();
 */
function renderTable() {
    const filtered = applySorting(applyFilters());
    const totalPages = Math.ceil(filtered.length / pageSize);
    currentPage = Math.min(currentPage, totalPages || 1);

    const start = (currentPage - 1) * pageSize;
    const slice = filtered.slice(start, start + pageSize);

    const $tbody = $("#membersTableBody").empty();

    slice.forEach(m => $tbody.append(`
        <tr>
            <td>${m.id}</td>
            <td>${m.userName}</td>
            <td>${m.firstName}</td>
            <td>${m.lastName}</td>
            <td>${m.enrollmentDate}</td>
            <td>${m.cancellationDate || ""}</td>
            <td>${m.poolAccess ? "✔" : ""}</td>
            <td>${m.spaAccess ? "✔" : ""}</td>
            <td class="actions">
                <button onclick="editMember('${m.id}')">Edit</button>
                <button onclick="deleteMember('${m.id}')">Delete</button>
            </td>
        </tr>
    `));

    updatePaginationUI(filtered.length);
}
/**
 * Updates the pagination display and enables/disables navigation buttons.
 *
 * @function updatePaginationUI
 * @param {number} total - The total number of filtered members.
 * @returns {void}
 */
function updatePaginationUI(total) {
    const totalPages = Math.ceil(total / pageSize);

    $("#pageInfo").text(`Page ${currentPage} of ${totalPages || 1}`);
    $("#prevPageBtn").prop("disabled", currentPage === 1);
    $("#nextPageBtn").prop("disabled", currentPage >= totalPages);
}
/**
 * Applies all filter inputs to the members list.
 *
 * @function applyFilters
 * @returns {GymMember[]} Filtered array of members.
 */
function applyFilters() {
    const id = $("#filterIdInput").val().trim();  // no lowercasing for numbers
    const un = $("#filterUserNameInput").val().trim().toLowerCase();
    const fn = $("#filterFirstNameInput").val().trim().toLowerCase();
    const ln = $("#filterLastNameInput").val().trim().toLowerCase();
    const pool = $("#filterPoolAccess").is(":checked");
    const spa = $("#filterSpaAccess").is(":checked");

// Instead of a bunch of "if" statements I put the member criteria in the return conditions.
    return members.filter(m =>
        (!id || m.id.includes(id)) &&
        (!un || m.userName.toLowerCase().includes(un)) &&
        (!fn || m.firstName.toLowerCase().includes(fn)) &&
        (!ln || m.lastName.toLowerCase().includes(ln)) &&
        (!pool || m.poolAccess) &&
        (!spa || m.spaAccess)
    );
}

/**
 * Sorts the list of members based on the current sortState settings.
 *
 * @function applySorting
 * @param {GymMember[]} list - The list to sort.
 * @returns {GymMember[]} Sorted list.
 */
function applySorting(list) {
    const col = sortState.column;
    const dir = sortState.direction === "asc" ? 1 : -1;

    return list.sort((a, b) => (a[col] > b[col] ? dir : -dir));
}
/**
 * Handles clicks on Pool/Spa access toggle buttons.
 * Synchronizes each toggle button with its associated
 * hidden checkbox value and updates the active visual state.
 *
 * @event click.access-toggle
 * @returns {void}
 */
$(".access-toggle").on("click", function () {
    const target = $(this).data("target");
    const $checkbox = $(target);

    // Flip checkbox value
    const newState = !$checkbox.prop("checked");
    $checkbox.prop("checked", newState);

    // Update button visual state
    $(this).toggleClass("active", newState);
});