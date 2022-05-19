import { createMachine } from "xstate";

export default createMachine({
    states: {
        "idle": {
            on: {
                KEY_W_DOWN: "forward_walking",
                KEY_A_DOWN: "left_walking",
                KEY_S_DOWN: "back_walking",
                KEY_D_DOWN: "right_walking",
            }
        },
        "forward_walking": {
            on: {
                KEY_W_UP: "idle",
            }
        },
        "left_walking": {
            on: {
                KEY_A_UP: "idle",
            }
        },
        "right_walking": {
            on: {
                KEY_D_UP: "idle",
            }
        },
        "back_walking": {
            on: {
                KEY_S_UP: "idle",
            }
        },

    },
    initial: "idle"
})