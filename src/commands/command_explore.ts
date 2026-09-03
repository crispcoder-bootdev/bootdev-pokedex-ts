import {State} from "../state/state.js";
import {LocationArea} from "../pokeapi/pokeapi.js";

export async function commandExplore(
    state: State,
    ...args: string[]
): Promise<void> {
    if (args.length < 2) {
        console.log("Must include a location name.");
        return;
    }
    const locationName = args[1];

    console.log(`Exploring ${locationName}...`);
    console.log(`Found Pokemon:`);

    const result: LocationArea = await state.pokeapi.fetchLocation(
        locationName
    );

    for (const encounter of result.pokemon_encounters) {
        console.log(` - ${encounter.pokemon.name}`);
    }

    return Promise.resolve();
}
