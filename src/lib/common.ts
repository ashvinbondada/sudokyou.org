export enum tileType {
    GIVEN,  // black
    WRONG,  // red
    RIGHT   // blue
}

export enum key {
    ON,
    OFF
}

export enum anchorType {
    NONE,
    SINGLE,     // single EMPTY cell anchored
    MULTI       // multiple EMPTY cells anchored
}

export enum GameStatus {
    WOMB,   // CREATING
    BORN,   // CREATED
    ALIVE,  // PLAYING
    COMA,   // PAUSED, MOVED AWAY
    DEAD,   // DONE
}