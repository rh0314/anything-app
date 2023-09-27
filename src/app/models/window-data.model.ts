export interface ScrollData {
    target?: HTMLElement 
    x?: number;
    y?: number;
    goingUp?: boolean;
    goingDown?: boolean;
}

export interface ScreenData {
    screenWidth?: number;
    screenHeight?: number;
    orientation?: string;
    windowWidth?: number;
    windowHeight?: number;
    windowTop?: number;
    windowLeft?: number;
}