/** Helper class used to describe the one of the four walls in a {@link Box}. 
 * @memberof module:Maze
 * @alias Wall
*/
class Wall {
    /**
     * Create a wall in a given {@link Box}
     * @param {boolean} [enabled=true] - The visibility of the wall within the {@link Box}.
     */
    constructor(enabled=true) {
        /** @property {boolean} enabled Visibility of the wall. */
        this.enabled = enabled;
    }

    /**
     * Toggle functionality to turn the visibility of the wall on or off.
     * @param {boolean} enabled - Visibility of the wall
     */
    toggle(enabled) {
        this.enabled = enabled;
    }

}

/** Box object with four walls. 
 * @memberof module:Maze
 * @alias Box
*/
class Box {
    /**
     * @param {boolean} left - Default visibility of the left wall.
     * @param {boolean} up  - Default visibility of the top wall.
     * @param {boolean} right - Default visibility of the right wall.
     * @param {boolean} down - Default visibility of the bottom wall.
     */
    constructor(left=true, up=true, right=true, down=true) {
        /** @property {boolean} left Left-side wall of the box. */
        this.left   = new Wall(left);

        /** @property {boolean} up Top-side wall of the box. */
        this.up     = new Wall(up);

        /** @property {boolean} right Right-side wall of the box. */
        this.right  = new Wall(right);

        /** @property {boolean} down Bottom-side wall of the box. */
        this.down   = new Wall(down);
    }

    /**
     * Wrapper method to change the visibility of a given {@link Wall} in the box based off of a string.
     * @param {Box.WALLS} wall - What wall to toggle.
     * @param {boolean} enable - To toggle on or off.
     */
    toggleWall(wall, enable) {
        switch (wall) {
            case 'LEFT'     :   this.left.toggle(enable);  break;
            case 'UP'       :   this.up.toggle(enable);    break;
            case 'RIGHT'    :   this.right.toggle(enable); break;
            case 'DOWN'     :   this.down.toggle(enable);  break;
            default         :                               break;
        }
    }

    /**
     * Wrapper method to change the visibility of the opposite {@link Wall} in the box based off of a string.
     * Felt much easier to just use a switch statement here rather than reuse {@link Box.toggleWall}.
     * @example Box.toggleOpposite('LEFT', true) // Toggles the right wall on.
     * @param {Box.WALLS} wall - What wall that will be the opposite of the toggled wall.
     * @param {boolean} enable - To toggle on or off.
     */
    toggleOpposite(wall, enable) {
        switch (wall) {
            case 'LEFT'     :   this.right.toggle(enable);     break;
            case 'UP'       :   this.down.toggle(enable);      break;
            case 'RIGHT'    :   this.left.toggle(enable);      break;
            case 'DOWN'     :   this.up.toggle(enable);        break;
            default         :                                   break;
        }
    }

    /**
     * Sets all of the walls either on or off.
     * @param {boolean} enable - To toggle on or off.
     */
    setWalls(enable) { this.left = this.up = this.right = this.down = enable; }
}

/**
 * Valid walls to use for {@link Box#toggleWall} and {@link Box#toggleOpposite} methods.
 * @readonly
 * @enum {string}
 */
Box.WALLS = {
    /** String value for the left wall. */
    LEFT: 'LEFT',

    /** String value for the top wall. */
    UP: 'UP',

    /** String value for the right wall. */
    RIGHT: 'RIGHT',

    /** String value for the bottom wall. */
    DOWN: 'DOWN'
};

export default Box;