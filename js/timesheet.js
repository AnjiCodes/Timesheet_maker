// empty array to hold timesheet data
let timesheetData = [];

// Function to add a row to the timesheet table
function addRow() {
    // Get values from input fields
    let week = document.getElementById("week").value;
    let name = document.getElementById("name").value;
    let course = document.getElementById("course").value;
    let activity = document.getElementById("activity").value;
    let date = document.getElementById("date").value;
    let time = parseInt(document.getElementById("time").value); // Convert to integer
    let notes = document.getElementById("notes").value;


    // Create new row in timesheet table
    let table = document.getElementById("timesheet").getElementsByTagName('tbody')[0];

    // Add data to timesheetData array
    timesheetData.push({
        week: week,
        name: name,
        course: course,
        activity: activity,
        date: date,
        time: time,
        notes: notes
    });

    // Convert the time to hours and minutes
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    // Add the row to the table
    let row = table.insertRow();
    // Add cells for each data column
    row.innerHTML = `
        <td>${week}</td>
        <td>${name}</td>
        <td>${course}</td>
        <td>${activity}</td>
        <td>${date}</td>
        <td>${hours} hours ${minutes} minutes</td>
        <td>${notes}</td>
        <td><button onclick="removeRow(this)">❌Remove</button></td>
    `;
}

// Function to calculate total time for each week
function calculateTotal() {
    // Empty object to hold total time data
    let totalTimeData = {};

    // Loop through timesheetData array and sum time for each week
    timesheetData.forEach(row => {
        if (row.week in totalTimeData) {
            totalTimeData[row.week] += row.time;
        } else {
            totalTimeData[row.week] = row.time;
        }
    });

    // Create new rows in total time table
    let table = document.getElementById("totals").getElementsByTagName('tbody')[0];
    table.innerHTML = "";
    for (let week in totalTimeData) {
        // Convert the total time to hours and minutes
        const hours = Math.floor(totalTimeData[week] / 60);
        const minutes = totalTimeData[week] % 60;
        let row = table.insertRow();
        row.innerHTML = `
            <td>${week}</td>
            <td>${hours} hours ${minutes} minutes</td>
        `;
    }
}

// Function to remove a row from the timesheet
function removeRow(button) {
    let row = button.parentNode.parentNode;
    let rowIndex = row.rowIndex - 1; // Adjust for the header row
    timesheetData.splice(rowIndex, 1); // Remove data from the array
    row.parentNode.removeChild(row); // Remove the row from the table
}

// Function to print timesheet
function printTimesheet() {
    window.print();
}

// Helper function to get week number from date
function getWeek(date) {
    let d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    let yearStart = new Date(d.getFullYear(), 0, 1);
    let weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
}

// Function to handle moving focus to the next input field when Enter key is pressed
document.getElementById("timesheetForm").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission behavior

        // Get the current active element
        const activeElement = document.activeElement;

        // Get all input and textarea elements inside the form
        const formInputs = Array.from(document.querySelectorAll("#timesheetForm input, #timesheetForm textarea"));

        // Find the index of the current active element
        const currentIndex = formInputs.indexOf(activeElement);

        // If the current active element is not the last one, move focus to the next element
        if (currentIndex !== -1 && currentIndex < formInputs.length - 1) {
            formInputs[currentIndex + 1].focus();
        }
    }
});
