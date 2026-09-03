import {State} from "../state/state.js";
import {Location, ShallowLocations} from "../pokeapi/pokeapi.js";

export async function commandMap(state: State): Promise<void> {
    const data: ShallowLocations = await state.pokeapi.fetchLocations(
        state.nextLocationsURL
    );
    const locations: Location[] = data.results;
    state.nextLocationsURL = data.next;
    state.prevLocationsURL = data.previous;
    for (const loc of locations) {
        console.log(loc.name);
    }
    return Promise.resolve();
}

export async function commandMapB(state: State): Promise<void> {
    if (!state.prevLocationsURL || state.prevLocationsURL === "") {
        console.log("you're on the first page");
        return Promise.resolve();
    }
    const data: ShallowLocations = await state.pokeapi.fetchLocations(
        state.prevLocationsURL
    );
    const locations: Location[] = data.results;
    state.nextLocationsURL = data.next;
    state.prevLocationsURL = data.previous;
    for (const loc of locations) {
        console.log(loc.name);
    }
    return Promise.resolve();
}
