import {State} from "../state/state.js";

export async function commandInspect(
    state: State,
    ...args: string[]
): Promise<void> {
    if (args.length < 2) {
        console.log("Must include a Pokemon name.");
        return;
    }
    const pokemonName = args[1];

    const result = state.pokedex[pokemonName];
    if (result === undefined) {
        console.log("you have not caught that pokemon");
        return Promise.resolve();
    }

    console.log(`Name: ${result.name}`);
    console.log(`Height: ${result.height}`);
    console.log(`Weight: ${result.weight}`);
    console.log(`Stats:`);
    for (const stat of result.stats) {
        console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log(`Types:`);
    for (const type of result.types) {
        console.log(`  -${type.type.name}`);
    }
}
