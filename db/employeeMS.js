const connection = require("./connection");

class db {
  constructor(connection) {
    this.connection = connection;
  }

  viewEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  viewDepartments() {
    return this.connection.query(
      "SELECT department.id, department.name FROM department LEFT JOIN role on role.department_id = department.id LEFT JOIN employee on employee.role_id = role.id GROUP BY department.id, department.name;"
    );
  }

  viewRoles() {
    return this.connection.query(
      "SELECT role.id, role.title, department.name AS department, role.salary from role LEFT JOIN department on role.department_id = department.id;"
    );
  }

  addEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?;", employee);
  }

  addRole(role) {
    return this.connection.query("INSERT INTO role SET ?;", role);
  }

  addDepartment(department) {
    return this.connection.query("INSERT INTO department SET ?;", department);
  }

  updateEmployee(employeeId, roleId) {
    return this.connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?;",
      [roleId, employeeId]
    );
  }
}

module.exports = new db(connection);
