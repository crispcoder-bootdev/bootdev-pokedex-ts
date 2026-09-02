import {createInterface, type Interface} from "node:readline";
import {stdin, stdout} from "node:process";
import {getCommands} from "./commands.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => void;
};

export type State = {
    rl: Interface;
    commands: {
        [key: string]: CLICommand;
    };
};

export function initState(): State {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Pokedex> ",
    });
    const commands = getCommands();

    return {
        rl: rl,
        commands: commands,
    };
}
