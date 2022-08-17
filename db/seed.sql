INSERT INTO department (name)
VALUES
('Management'),
('Sales'),
('Accounting'),
('Warehouse');

INSERT INTO `role` (title, salary, department_id)
VALUES
('Regional Manager', 100000, 1),
('Assistant Regional Manager', 70000, 1),
('Assistant TO The Regional Manager', 65000, 1),
('Sales Lead', 60000, 2),
('Sales Rep.', 55000, 2),
('Senior Accountant', 90000, 3),
('Accountant', 75000, 3),
('Warehouse Foreman', 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Jim', 'Halpert', 2, 1),
('Michael', 'Scott', 1, null),
('Dwight', 'Schrute', 3, 1),
('Andy', 'Bernard', 4, 2),
('Phyllis', 'Lapin', 5, 4),
('Stanley', 'Hudson', 5, 4),
('Angela', 'Martin', 6, null),
('Kevin', 'Malone', 7, 7),
('Oscar', 'Martinez', 7, 7),
('Darryl', 'Philbin', 8, null);