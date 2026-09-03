export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    constructor() {}

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        if (!pageURL) {
            pageURL = PokeAPI.baseURL + `/location-area/`;
        }
        try {
            const response = await fetch(pageURL);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error: any) {
            console.error(error.message);
            return Promise.reject();
        }
    }

    async fetchLocation(locationName: string): Promise<ShallowLocations> {
        if (!locationName) {
            locationName = "";
        }

        const locationURL = PokeAPI.baseURL + `/location-area/${locationName}`;
        try {
            const response = await fetch(locationURL);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
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
