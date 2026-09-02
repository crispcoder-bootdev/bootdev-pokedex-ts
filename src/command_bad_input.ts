import {State} from "./state.js";
export function commandBadInput(state: State, ...args: string[]) {
    console.log(`Unknown command: ${args.join(" ")}`);
}
