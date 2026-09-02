import {cleanInput} from "./clean_input.js";
import {getCommands} from "./commands.js";
import {State} from "./state.js";

export function startREPL(state: State) {
    const commands = getCommands();
    state.rl.prompt();
    state.rl.on("line", (line: string) => {
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
            command.callback(state, ...cleaned);
        } catch (err) {
            console.error(err);
        }
        state.rl.prompt();
    });
}
