DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE `role` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT,
    CONSTRAINT fk_department
    FOREIGN KEY (department_id) 
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    CONSTRAINT fk_role,
    FOREIGN KEY (role_id)
    REFERENCES `role` (id),
    manager_id INT,
    CONSTRAINT fk_manager
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
);