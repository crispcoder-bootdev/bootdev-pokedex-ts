export function cleanInput(input: string): string[] {
    let trimmed = input.trim();
    let arr = trimmed.split(" ");
    let filtered = arr.filter((item) => item.trim() !== "");
    let lowercase = filtered.map((item) => item.toLowerCase());
    return lowercase;
}

import {stdin, stdout} from "node:process";
import {createInterface} from "node:readline";
const rl = createInterface({
    input: stdin,
    output: stdout,
    prompt: "Pokedex> ",
});

export type CLICommand = {
    name: string;
    description: string;
    callback: (commands: Record<string, CLICommand>) => void;
};

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Prints command usage info",
            callback: commandHelp,
        },
        echo: {
            name: "echo",
            description: "Echoes the first word in the command input string.",
            callback: commandEcho,
        },
    };
}

let config = {
    command: "",
    commands: getCommands(),
};

function commandEcho() {
    console.log(`Your command was: ${config.command}`);
    rl.prompt();
}

function commandExit() {
    console.log("Closing the Pokedex... Goodbye!");
    process.exit(0);
}

function commandBadInput() {
    console.log("Unknown command");
    rl.prompt();
}

function commandHelp() {
    console.log(`
Welcome to the Pokedex!
Usage:

help: Displays a help message
exit: Exit the Pokedex
`);
    rl.prompt();
}

function mapInputToCommand(input: string) {
    const tokens = cleanInput(input);
    if (tokens.length === 0) {
        rl.prompt();
    } else {
        config.command = tokens[0];
        switch (config.command) {
            case "exit":
                commandExit();
                break;
            case "echo":
                commandEcho();
                break;
            case "help":
                commandHelp();
                break;
            default:
                commandBadInput();
        }
    }
}

export function startREPL() {
    rl.prompt();
    rl.on("line", mapInputToCommand);
}
