import {State} from "../state/state.js";
import {PokemonResult} from "../pokeapi/pokeapi.js";

export async function commandCatch(
    state: State,
    ...args: string[]
): Promise<void> {
    if (args.length < 2) {
        console.log("Must include a pokemon name.");
        return;
    }
    const pokemonName = args[1];

    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    const result: PokemonResult = await state.pokeapi.fetchPokemon(pokemonName);

    if (result !== undefined) {
        if (attempCatch(result)) {
            state.pokedex[pokemonName] = result;
            console.log(`${result.name} was caught!`);
            console.log(`You may now inspect it with the inspect command.`);
        } else {
            console.log(`${result.name} escaped!`);
        }
    } else {
        console.log(`Pokemon ${pokemonName} not found!`);
    }

    return Promise.resolve();
}

function attempCatch(pokemon: PokemonResult): boolean {
    if (pokemon === undefined || pokemon.name === "") {
        return false;
    }

    let attempt = getRandomInt(0, pokemon.base_experience);

    // We add 20 so that weak pokemon are easy to catch.
    // As the base experience increases, so does the chance of failure.
    if (attempt + 20 >= pokemon.base_experience) {
        return true;
    }

    return false;
}

function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    // The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}
