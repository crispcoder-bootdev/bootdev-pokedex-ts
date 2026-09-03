import {createInterface, type Interface} from "node:readline";
import {stdin, stdout} from "node:process";
import {getCommands} from "../commands/commands.js";
import {PokeAPI} from "../pokeapi/pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    rl: Interface;
    commands: {
        [key: string]: CLICommand;
    };
    pokeapi: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
};

export function initState(): State {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Pokedex> ",
    });
    const commands = getCommands();
    const pokeapi = new PokeAPI();

    return {
        rl: rl,
        commands: commands,
        pokeapi: pokeapi,
        nextLocationsURL: "",
        prevLocationsURL: "",
    };
}
