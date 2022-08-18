// pulling in packages and connection from config
const connection = require('./config/connection');
const inquirer = require('inquirer');
const mysql = require('mysql2');

connection.connect(err => {
    if(err) throw err
});

// functions to navigate our menu in terminal
function mainMenu() {

};

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

function updateEmployee() {

};