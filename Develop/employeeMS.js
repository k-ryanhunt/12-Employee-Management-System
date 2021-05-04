const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',
  PORT: process.ent.ENV || 3306,
  user: 'root',
  password: '',
  database: 'employeesDB',
});

connection.connect((err) => {
  if (err) throw err;
  addEmployee();
});

const addEmployee = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'Add departments, roles, employees',
        'View departments, role, employees',
        'Update employee roles',
        'Delete departments, roles, employees',
        'EXIT',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Add departments, roles, employees':
          addDRE();
          break;

        case 'View departments, role, employees':
          viewDRE();
          break;

        case 'Update employee roles':
          updateDRE();
          break;

        case 'Delete departments, roles, employees':
          deleteDRE();
          break;

        case 'EXIT':
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const start = () => {
    inquirer
      .prompt({
        name: 'postOrBid',
        type: 'list',
        message: 'Would you like to [POST] an auction or [BID] on an auction?',
        choices: ['POST', 'BID', 'EXIT'],
      })
      .then((answer) => {
        // based on their answer, either call the bid or the post functions
        if (answer.postOrBid === 'POST') {
          postAuction();
        } else if (answer.postOrBid === 'BID') {
          bidAuction();
        } else {
          connection.end();
        }
      });
  };
  
  const addDRE = () => {
    inquirer
      .prompt([
        {
          name: 'department',
          type: 'input',
          message: 'What DEPARTMENT does the employee belong to?',
        },
        {
          name: 'role',
          type: 'input',
          message: 'What ROLE do they have?',
        },
        {
          name: 'employee',
          type: 'input',
          message: "Enter the EMPLOYEE'S information.",
        },
      ])
      .then((answer) => {
        connection.query(
          'Add new employee?',
          {
            department_name: answer.department,
            role: answer.role,
            employee: answer.employee,
          },
          (err) => {
            if (err) throw err;
            console.log('Your auction was created successfully!');
            // re-prompt the user for if they want to bid or post
            start();
          }
        );
      });
  };

const viewDRE = () => {
  const query =
    'SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1';
  connection.query(query, (err, res) => {
    if (err) throw err;
    res.forEach(({ artist }) => console.log(artist));
    addEmployee();
  });
};

const updateDRE = () => {
  inquirer
    .prompt([
      {
        name: 'start',
        type: 'input',
        message: 'Enter starting position: ',
        validate(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
      {
        name: 'end',
        type: 'input',
        message: 'Enter ending position: ',
        validate(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
    ])
    .then((answer) => {
      const query =
        'SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?';
      connection.query(query, [answer.start, answer.end], (err, res) => {
        if (err) throw err;
        res.forEach(({ position, song, artist, year }) =>
          console.log(
            `Position: ${position} || Song: ${song} || Artist: ${artist} || Year: ${year}`
          )
        );
        addEmployee();
      });
    });
};

const deleteDRE = () => {
  inquirer
    .prompt({
      name: 'song',
      type: 'input',
      message: 'What song would you like to look for?',
    })
    .then((answer) => {
      console.log(`You searched for "${answer.song}"`);
      connection.query(
        'SELECT * FROM top5000 WHERE ?',
        { song: answer.song },
        (err, res) => {
          if (err) throw err;
          if (res[0]) {
            console.log(
              `Position: ${res[0].position} || Song: ${res[0].song} || Artist: ${res[0].artist} || Year: ${res[0].year}`
            );
            addEmployee();
          } else {
            console.error('Song not found :(\n');
            addEmployee();
          }
        }
      );
    });
};