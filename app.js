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
            //    ask Manager questions 
                addManager(response)
            } else if (response.roleAns === "Engineer") {
                //    ask Engineer questions 
                addEngineer(response)
            } else {
                //    ask Intern questions 
                addIntern(response)
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
            // push manager to employee array
            employeeArray.push(new Manager(response.nameAns, response.idAns, response.emailAns, responseManager.officeAns));
            console.log(employeeArray)
            if (responseManager.anotherEmployeeAns === "Yes") {
                addEmployeeInfo();
            } else {
                // create html with employee array
                var renderedPage=render(employeeArray) 
                return renderedPage
                 
            }
        }).then (function(html){
            fs.writeFile(`team.html`, html, "utf8", function(err){
                if(err){
                    throw err
                }
            })
        })
    };
    
 function addEngineer(response) {
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
        .then(function (responseEngineer) {
            employeeArray.push(new Engineer(response.nameAns, response.idAns, response.emailAns, responseEngineer.githubAns));
            console.log(employeeArray)
            if (responseEngineer.anotherEmployeeAns === "Yes") {
                addEmployeeInfo();
            } else {
                var renderedPage=render(employeeArray) 
                return renderedPage
            }
        }).then (function(html){
            fs.writeFile(`team.html`, html, "utf8", function(err){
                if(err){
                    throw err
                }
            })
        })   
     };

function addIntern(response) {
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
        .then(function (responseIntern) {
            employeeArray.push(new Intern(response.nameAns, response.idAns, response.emailAns, responseIntern.schoolAns));
            console.log(employeeArray)
            if (responseIntern.anotherEmployeeAns === "Yes") {
                addEmployeeInfo();
            } else {
                var renderedPage=render(employeeArray) 
                return renderedPage
            }
        }).then (function(html){
            fs.writeFile(`team.html`, html, "utf8", function(err){
                if(err){
                    throw err
                }
            })
        })
    };