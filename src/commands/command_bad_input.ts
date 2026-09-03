import { State } from "../state/state.js";
export async function commandBadInput(
    state: State,
    ...args: string[]
): Promise<void> {
    console.log(`Unknown command: ${args.join(" ")}`);
    return Promise.resolve();
}
