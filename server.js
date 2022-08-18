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
            choices: ['View Departments', 'View Roles', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role']
        }
    ])
};

mainMenu();

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

function addEmployee() {

};

function updateEmployeeRole() {

};