export interface ImageSize {
    height: number;
    width: number;
}

export interface ImageConversionSizes {
    client: ImageSize;
    natural: ImageSize;
}

export interface Point {
    x: number;
    y: number;
}

export interface BoundingBox {
    topLeft: Point;
    bottomRight: Point;

    label: string;
}

export interface SelectionOption {
    lable: string;
    value: string | number;
}