const { prompt } = require("inquirer");
const mysql = require("mysql");
const db = require("./db/employeeMS");
require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Ch@rlie10311989",
  database: "employeesDB",
});

const start = async () => {
  const { task } = await prompt({
    name: "task",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "View All Roles",
      "View All Departments",
      "Add Employee",
      "Add Department",
      "Update Employee Role",
      "Exit",
    ],
  });
  switch (task) {
    case "View All Employees":
      viewEmployees();
      break;
    case "View All Roles":
      viewRoles();
      break;
    case "View All Departments":
      viewDepartments();
      break;
    case "Add Employee":
      addEmployee();
      break;
    case "Add Department":
      addDepartment();
      break;
    case "Update Employee Role":
      updateEmployee();
      break;
    case "Exit":
      break;
    default:
      return exit();
  }
};

const viewEmployees = () => {
  return this.connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
  );
};

const viewRoles = async () => {
  const roles = await db.viewRoles();
  console.log("\n");
  console.table(roles);
  start();
};

const viewDepartments = async () => {
  const departments = await db.viewDepartments();
  console.log("\n");
  console.table(departments);
  start();
};

const addEmployee = async () => {
  const roles = await db.viewRoles();

  const employee = await prompt([
    {
      name: "first_name",
      message: "What is the new employee's first name?",
    },
    {
      name: "last_name",
      message: "What is the new employee's last name?",
    },
  ]);

  const { roleID } = await prompt({
    type: "list",
    name: "roleID",
    message: "What is the new employee's role?",
    choices: [
      "Senior Developer",
      "Junior Developer",
      "Project Manager",
      "Product Designer",
    ],
  });
  switch (role) {
    case "Senior Developer":
      break;
    case "Junior Developer":
      break;
    case "Project Manager":
      break;
    case "Product Designer":
      break;
    default:
      return exit();
  }

  employee.role_id = roleID;

  const { managerID } = await prompt({
    type: "list",
    name: "managerID",
    message: "Who is the new employee's manager?",
    choices: ["Abby Adams", "Barbara Bobs", "Carly Charles", "Denise Dennis"],
  });

  employee.manager_id = managerID;

  await db.addEmployee(employee);
  console.log(
    `Added ${employee.first_name} ${employee.last_name} as a new employee!`
  );

  start();
};

const addDepartment = async () => {
  const department = await prompt({
    name: "name",
    message: "What is the name of the new department?",
  });

  await db.addDepartment(department);
  console.log(`Added ${department.name} as a new department!`);

  start();
};

const updateEmployee = async () => {};

const exit = () => {
  console.log("Exiting...");
  process.exit();
};

start();

connection.connect((err) => {
  if (err) throw err;
  console.log(`Connected as ID ${connection.threadId}\n`);
});
