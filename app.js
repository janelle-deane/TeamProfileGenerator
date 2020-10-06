// Requirements
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Declare variables
let employeeArray=[];

// Call Questions
addEmployeeInfo()

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function addEmployeeInfo() {
    inquirer
        .prompt(
            [
                {
                    type: "input",
                    message: "What is their name?",
                    name: "nameAns",
                },
                {
                    type: "input",
                    message: "What is their Id?",
                    name: "idAns",
                },
                {
                    type: "input",
                    message: "What is their email?",
                    name: "emailAns",
                },
                {
                    type: "list",
                    message: "What is their role?",
                    choices: ['Manager', 'Engineer', 'Intern'],
                    name: "roleAns"
                }
            ]
        )
        .then(function (response) {
            if (response.roleAns === "Manager") {
                // console.log(response)
                // push info into employee array or a manager Array?
                // employeeArray.push(new Manager(response));
            //    ask Manager questions 
                addManager(response)
            } else if (response.roleAns === "Engineer") {
                addEngineer()
            } else {
                addIntern()
            }
        })
}

function addManager(response) {
    inquirer
        .prompt(
            [
                {
                    type: "input",
                    message: "What is their office number?",
                    name: "officeAns"
                },
                {
                    type: "list",
                    message: "Would you like to enter another Employee?",
                    choices: ["Yes", "No"],
                    name: "anotherEmployeeAns",
                }
            ])
        .then(function (responseManager) {
            employeeArray.push(new Manager(response.nameAns, response.idAns, response.emailAns, responseManager.officeAns));
            console.log(employeeArray)
            // Should I add a manager array or general employee array? 
            if (response.anotherEmployeeAns === "Yes") {
                addEmployeeInfo();
            } else {
                return
                // render HTML
            }
        }); 
    };
    
 function addEngineer() {
    inquirer
        .prompt(
            [
                {
                    type: "input",
                    message: "What is their GitHub?",
                    name: "githubAns"
                },
                {
                    type: "list",
                    message: "Would you like to enter another Employee?",
                    choices: ["Yes", "No"],
                    name: "anotherEmployeeAns",
                        }
                    ])
        .then(function (response) {
            // employeeArray.push(new Engineer(response.github));
            // Should I add a manager array or general employee array or put it in an url? 
            if (response.anotherEmployeeAns === "Yes") {
                addEmployeeInfo();
            } else {
             return
             // render HTML
            }
        })
    };

function addIntern() {
    inquirer
        .prompt(
            [
                {
                    type: "input",
                    message: "What is their school?",
                    name: "schoolAns"
                },
                {
                    type: "list",
                    message: "Would you like to enter another Employee?",
                    choices: ["Yes", "No"],
                    name: "anotherEmployeeAns",
                }
            ])
        .then(function (response) {
            // employeeArray.push(new Intern(response.schoolAns));
            // Should I add a manager array or general employee array? 
            if (response.anotherEmployeeAns === "Yes") {
                addEmployeeInfo();
            } else {
                return
                // render HTML
            }
        })
    };


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
