import {CLICommand} from "../state/state.js";
import {commandExit} from "./command_exit.js";
import {commandHelp} from "./command_help.js";
import {commandEcho} from "./command_echo.js";
import {commandBadInput} from "./command_bad_input.js";
import {commandMap} from "./command_map.js";
import {commandMapB} from "./command_map.js";

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exit the Pokedex.",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message.",
            callback: commandHelp,
        },
        echo: {
            name: "echo",
            description: "Prints the input string.",
            callback: commandEcho,
        },
        badInput: {
            name: "badInput",
            description: "Prints message that command was unrecognized.",
            callback: commandBadInput,
        },
        map: {
            name: "map",
            description: "Prints the next page of locations.",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Prints the previous page of locations.",
            callback: commandMapB,
        },
    };
}
