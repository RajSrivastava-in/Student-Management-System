
let students = [];

const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const totalStudents = document.getElementById("totalStudents");
const searchInput = document.getElementById("search");

studentForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("roll").value.trim();
    let email = document.getElementById("email").value.trim();
    let course = document.getElementById("course").value;

    let existingStudent = students.find(function(student) {
        return student.roll.toLowerCase() === roll.toLowerCase();
    });

    if (existingStudent) {
        alert("Roll Number already exists!");
        return;
    }

    let student = {
        name: name,
        roll: roll,
        email: email,
        course: course
    };

    students.push(student);

    displayStudents(students);

    studentForm.reset();

    alert("Student Added Successfully!");

});

function displayStudents(studentList) {

    studentTable.innerHTML = "";

    studentList.forEach(function(student) {

        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.textContent = student.name;

        let rollCell = document.createElement("td");
        rollCell.textContent = student.roll;

        let emailCell = document.createElement("td");
        emailCell.textContent = student.email;

        let courseCell = document.createElement("td");
        courseCell.textContent = student.course;

        let actionCell = document.createElement("td");

        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {

            students = students.filter(function(item) {
                return item !== student;
            });

            displayStudents(students);

        });

        actionCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(rollCell);
        row.appendChild(emailCell);
        row.appendChild(courseCell);
        row.appendChild(actionCell);

        studentTable.appendChild(row);

    });

    totalStudents.textContent = students.length;

}

searchInput.addEventListener("input", function() {

    let searchValue = searchInput.value.toLowerCase();

    let filteredStudents = students.filter(function(student) {

        return student.name.toLowerCase().includes(searchValue) ||
               student.roll.toLowerCase().includes(searchValue);

    });

    displayStudents(filteredStudents);

});
