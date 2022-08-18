// pulling in packages and connection from config

const db = require('./db/connection');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const connection = require('./db/connection');

// const connection = mysql.createConnection({
//     host: "localhost",
//     database: "company_db",
//     user: "root",
//     password: "Superfoxgarfmode22!"
// });

// functions to navigate our menu in terminal

const mainMenu = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'choices',
            message: 'Welcome! What would you like to do?',
            choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Finished Updating Company Info']
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
        mainMenu();
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
        mainMenu();
})
};

const viewEmployees = () => {
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
        mainMenu();
})
};

const addDept = () => {
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

const addRole = () => {
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
            .then(answer => {
                const dept = answer.whatDep;
                newRole.push(dept);

                const writeNewRole = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
                db.query(writeNewRole, newRole, (err, data) => {
                    if (err) console.log(err);
                    console.log('Added ' + answer.whatRole + ' to list of roles.');
                    viewRoles();
                });
            });
        });
    });
};

const addEmp = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: "What is the new employee's first name?"
        },
        {
            type: 'input',
            name: 'last',
            message: "What is the new employee's last name?"
        }
    ])
    .then(answer => {
        const newEmp = [answer.first, answer.last]
        const roleFetch = `SELECT role.id, role.title FROM role`;
        
        db.query(roleFetch, (err, data) => {
            if(err) console.log(err);
            const roleData = data.map(({ id, title }) => ({ name: title, value: id}));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: "What is this new employee's role?",
                    choices: roleData
                }
            ])
            .then(choice => {
                const role = choice.role;
                newEmp.push(role);

                const managerFetch = `SELECT * FROM employee`;

                db.query(managerFetch, (err, data) => {
                    if (err) console.log (err)
                

                const managerData = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id}));

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'manager',
                        message: "Who is this new employee's manager?",
                        choices: managerData
                    }
                ])
                    .then(choice => {
                        const manager = choice.manager;
                        newEmp.push(manager);

                        const writeNewEmp = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`;

                        db.query(writeNewEmp, newEmp, (err, data) => {
                            if (err) console.log(err)
                            console.log("New employee successfully added")

                            viewEmployees();
                        });                        
                    });
                });                
            });
        });
    });
};

// const updateEmpRole = () => {
//     var roleFetch = `SELECT role.id, role.title, role.salary FROM role`;

//     db.query(roleFetch, (err, data) => {
//         if(err) console.log(err);
//     const newRoleOptions = data.map(({ id, title, salary }))
//     console.table(data);
//     // console.log('What would you like to change your new role to?')
//     changeEmpRole(newRoleOptions) 
//     })
// }

// const changeEmpRole = (newRoleOptions) => {
//     inquirer.prompt([
//         {
//             type: 'input',
//             message: 'Please enter the first name of the employee whose role you would like to update.',
//             name: 'updatedEmp'
//         },
//         {
//             type: 'list',
//             message: 'What new role would you like to assign to this employee?',
//             name: 'updatedRole',
//             choices: newRoleOptions
//         },
//     ]).then((answer) => {
//         db.query(`UPDATE employee SET role_id=? WHERE first_name=?`),
//         [answer.updatedRole, answer.updatedEmp], (err,data) => {
//             if(err) console.log(err);
//             console.table(data);
//             mainMenu()
//         }
//     })
// };