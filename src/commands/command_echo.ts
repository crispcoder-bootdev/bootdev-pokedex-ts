import { State } from "../state/state.js";
export async function commandEcho(
    state: State,
    ...args: string[]
): Promise<void> {
    console.log(`Your command was: ${args.join(" ")} `);
    return Promise.resolve();
}
