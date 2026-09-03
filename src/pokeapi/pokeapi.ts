import {PokeCache} from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    private pokeCache: PokeCache;
    constructor(interval: number) {
        this.pokeCache = new PokeCache(interval);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        if (!pageURL) {
            pageURL = PokeAPI.baseURL + `/location-area/`;
        }

        // Query cache
        let result: ShallowLocations | undefined = this.pokeCache.get(pageURL);
        if (result !== undefined) {
            return result;
        }

        // Query pokapi
        try {
            const response = await fetch(pageURL);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            let result = (await response.json()) as ShallowLocations;
            this.pokeCache.add(pageURL, result);
            return result;
        } catch (error: any) {
            console.error(error.message);
            return Promise.reject();
        }
    }

    async fetchLocation(locationName: string): Promise<LocationArea> {
        if (!locationName) {
            locationName = "";
        }

        // Query cache
        let result: LocationArea | undefined =
            this.pokeCache.get(locationName);
        if (result !== undefined) {
            return result;
        }

        // Query pokeapi
        const locationURL = PokeAPI.baseURL + `/location-area/${locationName}`;
        try {
            const response = await fetch(locationURL);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            result = (await response.json()) as LocationArea;
            this.pokeCache.add(locationName, result);
            return result;
        } catch (error: any) {
            console.error(error.message);
            return Promise.reject();
        }
    }
}

export type ShallowLocations = {
    count: number;
    next: string;
    previous: any;
    results: Location[];
};

export type Location = {
    name: string;
    url: string;
};

export interface LocationArea {
    id: number;
    name: string;
    game_index: number;
    encounter_method_rates: EncounterMethodRate[];
    location: Location;
    names: Name[];
    pokemon_encounters: PokemonEncounter[];
}

export interface EncounterMethodRate {
    encounter_method: EncounterMethod;
    version_details: VersionDetail[];
}

export interface EncounterMethod {
    name: string;
    url: string;
}

export interface VersionDetail {
    rate: number;
    version: Version;
}

export interface Version {
    name: string;
    url: string;
}

export interface Name {
    name: string;
    language: Language;
}

export interface Language {
    name: string;
    url: string;
}

export interface PokemonEncounter {
    pokemon: Pokemon;
    version_details: VersionDetail2[];
}

export interface Pokemon {
    name: string;
    url: string;
}

export interface VersionDetail2 {
    version: Version2;
    max_chance: number;
    encounter_details: EncounterDetail[];
}

export interface Version2 {
    name: string;
    url: string;
}

export interface EncounterDetail {
    min_level: number;
    max_level: number;
    chance: number;
    method: Method;
    condition_values: any[];
    pokemon_details: any;
}

export interface Method {
    name: string;
    url: string;
}
