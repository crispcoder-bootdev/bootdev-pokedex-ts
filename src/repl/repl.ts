import {cleanInput} from "./clean_input.js";
import {getCommands} from "../commands/commands.js";
import {State} from "../state/state.js";

export async function startREPL(state: State): Promise<void> {
    const commands = getCommands();
    state.rl.prompt();
    // Await completion of body before accepting each line.
    for await (const line of state.rl) {
        const cleaned = cleanInput(line);
        if (cleaned.length === 0) {
            state.rl.prompt();
            return;
        }
        const commandName = cleaned[0];
        let command = commands[commandName];
        if (!command) {
            command = commands["badInput"];
        }

        try {
            await command.callback(state, ...cleaned);
        } catch (err) {
            console.error(err);
        }
        state.rl.prompt();
    }
    return Promise.resolve();
}
