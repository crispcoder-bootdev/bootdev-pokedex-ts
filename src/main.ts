import {startREPL} from "./repl/repl.js";
import {initState} from "./state/state.js";

let state = initState();

function main() {
    startREPL(state);
}

main();
