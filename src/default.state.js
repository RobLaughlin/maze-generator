const DefaultState = {
    CONSTANTS: {
        MIN_WIDTH: 600,
        MAX_WIDTH: 599,
    },

    dimensions: {
        width: {
            max: 3,
            min: 1,
            val: 2
        },
        height: {
            max: 3,
            min: 1,
            val: 2
        },
        density: {
            max: 100,
            min: 10,
            val: 50
        },
        mazeDims: {
            width: 20,
            height: 20
        }
    },

    generation: {
        start: false,
        solve: false,
        entrance: 'Left',
        active: false
    },

    animation: {
        framerate: {
            val: 60,
            max: 60,
            min: 1
        },
        enabled: true
    },

    download: {
        clicked: false
    }
};

export default DefaultState;