// pulling in packages and connection from config

const db = require('./db/connection');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// const connection = mysql.createConnection({
//     host: "localhost",
//     database: "company_db",
//     user: "root",
//     password: "Superfoxgarfmode22!"
// })

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

// async function viewDepts() {
//     const viewDb = `SELECT department.id AS id, department.name AS department FROM department`;
//     const depts = await db.query(viewDb);
//     console.log(depts[0]);
// } 


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

};

function addRole() {

};

function addEmp() {

};

function updateEmpRole() {

};