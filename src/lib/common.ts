export enum tileType {
    GIVEN,  // black
    WRONG,  // red
    RIGHT   // blue
}

export enum GameStatus {
    WOMB,   // CREATING
    BORN,   // CREATED
    ALIVE,  // PLAYING
    COMA,   // PAUSED, MOVED AWAY
    DEAD,   // DONE
}