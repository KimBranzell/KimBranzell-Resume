#!/usr/bin/env node

"use strict";

const inquirer = require("inquirer");
const chalk = require("chalk");
const data = require("./data.json");

// add response color
const response = chalk.bold.blue;

const resumeOptions = {
  type: "list",
  name: "resumeOptions",
  message: "What do you want to know?",
  choices: [...Object.keys(data), "Exit"]
};

function showResume() {
  console.log(" ");
  console.log(
    "Welcome to the digital resume of Kim Branzell, currently a front-end developer at KAN, in Malmö, Sweden."
  );
  console.log(" ");
  handleResume();
}

function handleResume() {
  inquirer
    .prompt(resumeOptions)
    .then(answer => {
      if (answer.resumeOptions == "Exit") return;

      const options = data[`${answer.resumeOptions}`];
      if (options) {
        if (answer.resumeOptions == "Education 📚") {
          var schoolName;
          var schoolArray;
          var schoolIndex;
          console.log(response(new inquirer.Separator()));
          for (schoolName in options) {
            schoolArray = options[schoolName];
            console.log(" ");
            console.log(chalk.white.bgBlackBright.bold(" " + schoolName + " "));
            for (
              schoolIndex = 0;
              schoolIndex < schoolArray.length;
              ++schoolIndex
            ) {
              console.log(
                chalk.black.bgWhiteBright(
                  " " + schoolArray[schoolIndex].year + " "
                )
              );
              console.log(
                chalk.black.bgYellowBright(
                  " " + schoolArray[schoolIndex].degree + " "
                )
              );
              console.log(" ");
              console.log(" " + schoolArray[schoolIndex].description + "");
              console.log(" ");
            }
            console.log(" ");
          }
          console.log(response(new inquirer.Separator()));
        } else if (answer.resumeOptions == "Experience 🧪") {
          var workName;
          var workArray;
          var workIndex;
          console.log(response(new inquirer.Separator()));
          for (workName in options) {
            workArray = options[workName];
            console.log(" ");
            console.log(chalk.white.bgBlackBright.bold(" " + workName + " "));
            for (workIndex = 0; workIndex < workArray.length; ++workIndex) {
              console.log(
                chalk.black.bgYellowBright(
                  " " + workArray[workIndex].title + " "
                )
              );
              console.log(
                chalk.black.bgWhiteBright(" " + workArray[workIndex].year + " ")
              );
              console.log(" ");
              console.log(" " + workArray[workIndex].description + "");
              console.log(" ");
            }
            console.log(" ");
          }
          console.log(response(new inquirer.Separator()));
        } else {
          options.forEach(info => {
            console.log(response("|   • " + info));
          });
        }
      }

      inquirer
        .prompt({
          type: "list",
          name: "exitBack",
          message: "Go back or Exit?",
          choices: ["Back", "Exit"]
        })
        .then(choice => {
          if (choice.exitBack == "Back") {
            handleResume();
          } else {
            return;
          }
        });
    })
    .catch(err => console.log("Ooops,", err));
}

showResume();
