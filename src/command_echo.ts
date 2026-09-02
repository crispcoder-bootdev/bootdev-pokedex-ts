import {State} from "./state.js";
export function commandEcho(state: State, ...args: string[]) {
    console.log(`Your command was: ${args.join(" ")} `);
}
