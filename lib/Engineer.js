// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor (name, id, email,gitHub){
        super(name, id, email);
        this.gitHub =gitHub;
    }
    getGithub(){

    }
    getRole(){

    }
}

module.exports = Engineer
// github // GitHub username

// getGithub()

// getRole() // Overridden to return 'Engineer'