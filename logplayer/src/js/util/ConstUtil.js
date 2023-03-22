export const LEFT = 'left';
export function isLeft(str) {
    if (str == 'left' || str == 'Left' || str == 'LEFT' || str == 'l' || str == 'L') {
        return true;
    }
    return false;
}

export const RIGHT = 'right';
export function isRight(str) {
    if (str == 'right' || str == 'Right' || str == 'RIGHT' || str == 'r' || str == 'R') {
        return true;
    }
    return false;
}


export const DEFAULT_BALL_RADIUS = 0.2;