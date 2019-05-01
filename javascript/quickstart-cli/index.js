#!/usr/bin/env node

const chalk = require("chalk");
const shell = require("shelljs");
const figlet = require("figlet");
const inquirer = require("inquirer");

const init = () => {
    console.log(
        "\n\n",
        chalk.blue(
            figlet.textSync("QuickStart CLI", {
                font: "big",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    );
};

const askQuestions = () => {
    const questions = [
        {
            name: "FILENAME",
            type: "input",
            message: "What is the name of the file without extension?"
        },
        {
            type: "list",
            name: "EXTENSION",
            message: "What is the file extension?",
            choices: [".rb", ".js", ".php", ".css"],
            filter: function(val) {
                return val.split(".")[1];
            }
        }
    ];
    return inquirer.prompt(questions);
};

const createFile = (filename, extension) => {
    const filePath = `${process.cwd()}/${filename}.${extension}`
    shell.touch(filePath);
    return filePath;
};

const success = filepath => {
    console.log(
        chalk.white.bgGreen.bold(`Done! File created at ${filepath}`)
    );
};

const run = async () => {
    // show script introduction
    init();

    // ask questions
    const answers = await askQuestions();
    const { FILENAME, EXTENSION } = answers;

    // create the file
    const filePath = createFile(FILENAME, EXTENSION);

    // show success message
    success(filePath);
};

run();
