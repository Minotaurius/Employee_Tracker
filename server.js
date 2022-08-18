// pulling in packages and connection from config

const db = require('./db/connection');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');


// functions to navigate our menu in terminal

const mainMenu = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'choices',
            message: 'Welcome! What would you like to do?',
            choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Finished Updating Company Info']
        }
    ])
    .then((answer) => {
        const { choices } = answer;

        if (choices === "View Departments") {
            viewDepts();
        }

        if (choices === "View Roles") {
            viewRoles();
        }

        if (choices === "View Employees") {
            viewEmployees();
        }

        if (choices === "Add Department") {
            addDept();
        }

        if (choices === "Add Role") {
            addRole();
        }

        if (choices === "Add Employee") {
            addEmp();
        }

        if (choices === "Update Employee Role") {
            updateEmpRole();
        }

        if(choices === "Finished Updating Company Info") {
            connection.end()
        };
    });
};

mainMenu()

const viewDepts = () => {
    console.log('Here are all current departments')
    var viewDB = `SELECT department.id AS id, department.name AS department FROM department`;
    db.query(viewDB, (err, data) => {
        if (err) return console.log(err);
        console.table(data);
        return mainMenu();
});
};

const viewRoles = () => {
    console.log('Here are all current roles')
    var viewRoles = `SELECT role.id,
                            role.title,
                            department.name AS department
                            FROM role INNER JOIN department ON role.department_id = department.id`;
    db.query(viewRoles, (err, data) => {
        if (err) return console.log(err);
        console.table(data);
        return mainMenu();
})
};

function viewEmployees() {
    console.log('Here are all current employees')
    var viewEmps = `SELECT employee.id, 
                    employee.first_name, 
                    employee.last_name, 
                    department.name AS department, 
                    role.salary AS salary,
                    employee.manager_id
                    FROM employee, department, role
                    WHERE employee.role_id = role.id AND role.department_id = department.id
                    `;
    db.query(viewEmps, (err, data) => {
        if (err) return console.log(err);
        console.table(data);
        return mainMenu();
})
};

function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDept',
            message: 'What new department would you like to add?'
        }
    ])
    .then(answer => {
        const newDept = `INSERT INTO department (name) VALUES (?)`;
        db.query(newDept, answer.addDept, (err, data) => {
            if(err) console.log(err);
            console.log('We have created a' + " " + 'department.');
            viewDepts();
        })
    })
};

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'whatRole',
            message: 'What new role would you like to add?'
        },
        {
            type: 'input',
            name: 'whatSal',
            message: "What is the salary of this new role?"
        }
    ])
    .then(answer => {
        const newRole = [answer.whatRole, answer.whatSal]
        const pushRole = `SELECT name, id FROM department`;
        
        db.query(pushRole, (err, data) => {
            if(err) console.log(err);
            const deptData = data.map(({ name, id }) => ({ name: name, value: id}));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'whatDep',
                    message: 'What department is this new role in?',
                    choices: deptData
                }
            ])
            .then(choice => {
                const dept = choice.deptData;
                newRole.push(dept);

                const writeNewDept = `INSERT INTO role (title, salary, department_id)
                                    VALUES (?, ?, ?)`
                db.query(writeNewDept, newRole, (err, data) => {
                    if (err) console.log(err);
                    console.log('Added ' + answer.whatRole + ' to list of roles.');
                    viewRoles();
                });
            });
        });
    });
};

function addEmp() {

};

function updateEmpRole() {

};