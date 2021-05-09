const { prompt } = require("inquirer");
const db = require("./db")
require('console.table');

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
      "Add Role",
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
    case "Add Role":
      addRole();
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

const viewEmployees = async () => {
  const employees = await db.viewEmployees();
  console.log("\n");
  console.table(employees);
  start();
};

const viewRoles = async () => {
  const jobs = await db.viewRoles();
  console.log("\n");
  console.table(jobs);
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
  const employees = await db.viewEmployees();

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

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleID } = await prompt({
    type: "list",
    name: "roleID",
    message: "What is the new employee's job?",
    choices: roleChoices,
  });

  employee.role_id = roleID;

  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  managerChoices.unshift({ name: "None", value: null });

  const { managerID } = await prompt({
    type: "list",
    name: "managerID",
    message: "Who is the new employee's manager?",
    choices: managerChoices,
  });

  employee.manager_id = managerID;

  await db.addEmployee(employee);
  console.log(
    `Added ${employee.first_name} ${employee.last_name} as a new employee!`
  );

  start();
};

const addRole = async () => {};

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
