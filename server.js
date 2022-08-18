// pulling in packages and connection from config

const connection = require('./config/connection');
const inquirer = require('inquirer');
const mysql = require('mysql2');

connection.connect(err => {
    if(err) throw err
});

// functions to navigate our menu in terminal

function mainMenu() {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'menu',
            message: 'Welcome! What would you like to do?',
            choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role']
        }
    ])
};

function init() {
    mainMenu()
    .then((answer => {
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
    }))
}

// mainMenu();

function viewDepts() {

};

function viewRoles() {

};

function viewEmployees() {

};

function addDept() {

};

function addRole() {

};

function addEmp() {

};

function updateEmpRole() {

};