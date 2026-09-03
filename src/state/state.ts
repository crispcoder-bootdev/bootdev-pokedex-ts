import {createInterface, type Interface} from "node:readline";
import {stdin, stdout} from "node:process";
import {getCommands} from "../commands/commands.js";
import {PokeAPI, PokemonResult} from "../pokeapi/pokeapi.js";

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
    pokedex: Record<string, PokemonResult>;
};

export function initState(): State {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Pokedex> ",
    });
    const commands = getCommands();
    const pokeapi = new PokeAPI(5);

    return {
        rl: rl,
        commands: commands,
        pokeapi: pokeapi,
        nextLocationsURL: "",
        prevLocationsURL: "",
        pokedex: {},
    };
}
