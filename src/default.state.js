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
            min: 20,
            val: 50
        },
        mazeDims: {
            width: 20,
            height: 20
        }
    }
};

export default DefaultState;