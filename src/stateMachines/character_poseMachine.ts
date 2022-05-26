import { createMachine } from "xstate";

export default createMachine({
    states: {
        "idle": {
            on: {
                KEY_W_DOWN: "walk",
                KEY_A_DOWN: "walk",
                KEY_S_DOWN: "walk",
                KEY_D_DOWN: "walk",
                INTERSECT_OUT: "walk",
            }
        },
        "walk": {
            on: {
                KEY_W_UP: "idle",
                KEY_A_UP: "idle",
                KEY_S_UP: "idle",
                KEY_D_UP: "idle",
                INTERSECT: "idle",
            }
        },
    },
    initial: "idle"
})