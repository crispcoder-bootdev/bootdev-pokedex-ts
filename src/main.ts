import {startREPL} from "./repl.js";
import {initState} from "./state.js";

let state = initState();

function main() {
    startREPL(state);
}

main();
