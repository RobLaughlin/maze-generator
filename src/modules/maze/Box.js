class Wall {
    constructor(enabled=true) {
        this.enabled = enabled;
    }
}

Wall.prototype.toggle = function(enabled) {
    this.enabled = enabled;
}

class Box {
    constructor(left=true, up=true, right=true, down=true) {
        this.left   = new Wall(left);
        this.up     = new Wall(up);
        this.right  = new Wall(right);
        this.down   = new Wall(down);
    }
}

Box.prototype.toggleWall = function(wall, enabled) {
    switch (wall) {
        case 'LEFT'     :   this.left.toggle(enabled);  break;
        case 'UP'       :   this.up.toggle(enabled);    break;
        case 'RIGHT'    :   this.right.toggle(enabled); break;
        case 'DOWN'     :   this.down.toggle(enabled);  break;
        default         :                               break;
    }
};

Box.prototype.toggleOpposite = function(wall, enabled) {
    switch (wall) {
        case 'LEFT'     :   this.right.toggle(enabled);     break;
        case 'UP'       :   this.down.toggle(enabled);      break;
        case 'RIGHT'    :   this.left.toggle(enabled);      break;
        case 'DOWN'     :   this.up.toggle(enabled);        break;
        default         :                                   break;
    }
};

Box.prototype.setWalls = function(on) { this.left = this.up = this.right = this.down = on; }

export default Box;