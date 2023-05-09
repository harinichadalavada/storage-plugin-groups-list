#!/usr/bin/env node

import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import chalk from "chalk";
import shell from "shelljs";

console.log(
  chalk.red("\nWARNING: ") +
    "This process can be run to completion once.  Once committed, if you need further customization you will need to do it manually."
);
console.log("\nYou will need to choose a unique name for your plugin.\n");

// const initProjectName = "reference"
const initProjectName = "groups";

const toTitleCase = (str = "") => {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

function globalReplace(replaceRegexp) {
  return new RegExp(replaceRegexp, "g");
}

async function updateReadme(serviceName) {
  console.log("Updating readme.md");
  shell.sed("-i", globalReplace(initProjectName), serviceName, "readme.md");
}

async function updateFWbindings(serviceName, initProjectFull, newProjectFull) {
  console.log("Updating framework-bindings/react...");
  shell.cd("framework-bindings/react");

  // TODO remove excess packages on scrub
  shell.sed("-i", globalReplace(initProjectName), serviceName, "package.json");
  // shell.sed("-i", globalReplace(toTitleCase(initProjectName)), toTitleCase(serviceName), "package.json");

  // we have to be careful with package-lock files since shorter matches might be erroneous
  shell.sed(
    "-i",
    globalReplace(initProjectFull),
    newProjectFull,
    "package-lock.json"
  );
  shell.cd("src");
  shell.sed("-i", globalReplace(initProjectName), serviceName, "index.ts");
  shell.cd("..");

  shell.cd("../..");
}

async function updateCore(serviceName, initProjectFull, newProjectFull) {
  console.log("Updating core...");
  shell.cd("core");
  shell.sed("-i", globalReplace(initProjectName), serviceName, "package.json");
  shell.sed(
    "-i",
    globalReplace(toTitleCase(initProjectName)),
    toTitleCase(serviceName),
    "start-server.js"
  );

  // we have to be careful with package-lock files since shorter matches might be erroneous
  shell.sed(
    "-i",
    globalReplace(initProjectFull),
    newProjectFull,
    "package-lock.json"
  );
  shell.sed(
    "-i",
    globalReplace(initProjectName),
    serviceName,
    "stencil.config.ts"
  );
  console.log("Updating .storybook...");
  shell.cd(".storybook");
  shell.sed("-i", globalReplace(initProjectName), serviceName, "main.js");
  shell.cd("..");
  console.log("Updating src...");
  shell.cd("src");

  // TODO reevaluate fixing cypress
  shell.sed("-i", globalReplace(initProjectName), serviceName, "index.html");
  shell.sed(
    "-i",
    globalReplace(toTitleCase(initProjectName)),
    toTitleCase(serviceName),
    "index.html"
  );

  console.log("Updatings constants");
  shell.cd("constants");
  shell.sed(
    "-i",
    globalReplace(initProjectName),
    serviceName,
    "test-selector-ids.js"
  );
  shell.cd("..");
  console.log("Updating utils...");
  shell.cd("utils");
  shell.sed(
    "-i",
    globalReplace(initProjectName),
    serviceName,
    "translations.ts"
  );
  shell.cd("..");
  console.log("Updating i18n...");
  shell.cd("i18n");
  shell.sed("-i", globalReplace(initProjectName), serviceName, "en.js");
  shell.sed("-i", globalReplace(initProjectName), serviceName, "de.js");
  shell.sed("-i", globalReplace(initProjectName), serviceName, "fr.js");
  shell.cd("..");

  console.log("Updating components...");
  shell.cd("components");
  // shell.cd("reference-content");
  // console.log(chalk.yellow("Not renaming reference-content since most likely will be removed during initial development."))
  // shell.sed("-i", globalReplace(initProjectName), serviceName, "reference-content.tsx");
  // shell.cd("..");
  // shell.cd("reference-status");
  // console.log(chalk.yellow("Not renaming reference-status since most likely will be removed during initial development."))
  // shell.sed("-i", globalReplace(initProjectName), serviceName, "reference-status.tsx");
  // shell.cd("..");
  shell.cd("storage-plugin-" + initProjectName);
  shell.sed(
    "-i",
    globalReplace(initProjectName),
    serviceName,
    "storage-plugin-" + initProjectName + ".tsx"
  );
  shell.sed(
    "-i",
    globalReplace(toTitleCase(initProjectName)),
    toTitleCase(serviceName),
    "storage-plugin-" + initProjectName + ".tsx"
  );
  shell.sed(
    "-i",
    globalReplace(initProjectName),
    serviceName,
    "storage-plugin-" + initProjectName + ".stories.js"
  );
  shell.sed(
    "-i",
    globalReplace(toTitleCase(initProjectName)),
    toTitleCase(serviceName),
    "storage-plugin-" + initProjectName + ".stories.js"
  );

  // todo rename  storage-plugin-<init>.css  storage-plugin-<init>.stories.js  storage-plugin-<init>.tsx
  // to:          storage-plugin-<new>.css   storage-plugin-<new>.stories.js   storage-plugin-<new>.tsx
  // mv core/components/storage-plugin-reference core/components/storage-plugin-<new>
  console.log(
    " mv storage-plugin-" +
      initProjectName +
      ".css storage-plugin-" +
      serviceName +
      ".css"
  );
  shell.mv(
    "storage-plugin-" + initProjectName + ".css",
    "storage-plugin-" + serviceName + ".css"
  );

  console.log(
    " mv storage-plugin-" +
      initProjectName +
      ".stories.js storage-plugin-" +
      serviceName +
      ".stories.js"
  );
  shell.mv(
    "storage-plugin-" + initProjectName + ".stories.js",
    "storage-plugin-" + serviceName + ".stories.js"
  );

  console.log(
    " mv storage-plugin-" +
      initProjectName +
      ".tsx storage-plugin-" +
      serviceName +
      ".tsx"
  );
  shell.mv(
    "storage-plugin-" + initProjectName + ".tsx",
    "storage-plugin-" + serviceName + ".tsx"
  );

  console.log(
    " mv components/storage-plugin-" +
      initProjectName +
      " components/storage-plugin-" +
      serviceName
  );

  // console.log("cwd:"+process.cwd())
  const __dirname = process.cwd();
  const componentsDir = path.resolve(__dirname, "..");
  const oldDir = path.join(componentsDir, initProjectFull);
  const newDir = path.join(componentsDir, newProjectFull);
  fs.rename(oldDir, newDir, function (err) {
    if (err) {
      console.log(chalk.red("Unable to rename directory: " + err));
    } else {
      console.log(
        chalk.green(
          "Renamed components/" +
            initProjectFull +
            " to components/" +
            newProjectFull
        )
      );
    }
  });

  shell.cd("..");
  shell.cd("..");

  // TODO
  // do I wipe app and leave clean placeholder?
  // do I fix acceptance-tests?
  // need to remove developing-plugins

  shell.cd("..");
  shell.cd("..");
}

const SERVICE_NAME_QUERY = [
  {
    name: "pluginName",
    type: "input",
    message: "Enter a distinct name for your plugin?",
    default: "newplugin",
  },
];

inquirer.prompt(SERVICE_NAME_QUERY).then((serviceChoice) => {
  const serviceName = serviceChoice["pluginName"];
  const newProjectFull = "storage-plugin-" + serviceName;
  const initProjectFull = "storage-plugin-" + initProjectName;
  console.log("\n\n");
  console.log(
    chalk.green("Your project repository should be: ") +
      chalk.yellow(newProjectFull)
  );
  console.log("\n");

  const PROMPT = [
    {
      name: "response",
      type: "confirm",
      message: "Continue?",
      default: false,
    },
  ];
  inquirer.prompt(PROMPT).then((answer) => {
    if (answer.response === false) {
      process.exit(1);
    }

    console.log("Updating:" + initProjectFull + " to: " + newProjectFull);
    // Update current directory
    updateReadme(serviceName);
    // update core/*
    updateCore(serviceName, initProjectFull, newProjectFull);
    // update framework-bindings/*
    updateFWbindings(serviceName, initProjectFull, newProjectFull);

    console.log(
      chalk.yellow(
        "\nTODO: Don't forget to update ./CODEOWNERS and core/CODEOWNERS appropriately.\n"
      )
    );

    console.log(
      chalk.green(
        "\nCustomization is complete, if you have not initialized git and are unhappy with your changes you can run tools/bootstrap_reset.sh and try again."
      )
    );
    console.log(
      chalk.green(
        "Otherwise your next step should be to rename the repository, reset git for the new commit, and remove tools/bootstrap_reset."
      )
    );
  });
});
