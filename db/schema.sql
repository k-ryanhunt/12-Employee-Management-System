DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NULL
);

CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NULL,
    salary DECIMAL(10,4) NULL,
    department_id INT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);

INSERT INTO department (id, name)
VALUES ('1', 'Development');

INSERT INTO department (id, name)
VALUES ('2', 'Sales');

INSERT INTO department (id, name)
VALUES ('3', 'Management');

INSERT INTO role (id, title, salary)
VALUES ('101', 'Senior Developer', '200000.00');

INSERT INTO role (id, title, salary)
VALUES ('102', 'Junior Developer', '100000.00');

INSERT INTO role (id, title, salary)
VALUES ('201', 'Product Designer', '130000.00');

INSERT INTO role (id, title, salary)
VALUES ('301', 'Project Manager', '160000.00');

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Kelsea', 'Hunt', '101');