import React, { useCallback, useState } from 'react';
import { BoundingBox, ImageConversionSizes, Point, SelectionOption } from 'shared/dbr-core/types';
import { BoundingArea } from '../BoundingArea';

import './SelectionArea.scss';

type BBAction = (bb: BoundingBox) => void;
const defaultPoint: Point = { x: 0, y: 0 };


export interface SelectionAreaProps {
    image: string;
    selectionOption: SelectionOption;
    areas: BoundingBox[];

    addBB: BBAction;
    deleteBB: BBAction;

    updateimageSizes: (sizes: ImageConversionSizes) => void;
}

export const SelectionArea: React.FC<SelectionAreaProps> = props => {
    const { image, areas, selectionOption, updateimageSizes, addBB, deleteBB } = props;

    const [startPoint, setStartPoint] = useState<Point>({ ...defaultPoint });
    const [endPoint, setEndPoint] = useState<Point>({ ...defaultPoint });
    const [drawing, setDrawing] = useState(false);


    const startDrawing = useCallback((e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        const elm = e.nativeEvent;
        setStartPoint({ x: elm.offsetX, y: elm.offsetY });
        setDrawing(true);
    }, []);

    const move = useCallback((e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        if (drawing) {
            const elm = e.nativeEvent;
            setEndPoint({ x: elm.offsetX, y: elm.offsetY });
        }
    }, [drawing]);

    const currentArea = drawing
        ? <BoundingArea
            area={{
                topLeft: startPoint,
                bottomRight: endPoint,
                label: `${selectionOption.value}`
            }}
            move={(point) => {
                setEndPoint({
                    x: startPoint.x + point.x,
                    y: startPoint.y + point.y,
                });
            }}
            endDrawing={() => {
                setDrawing(false);
                addBB({
                    topLeft: startPoint,
                    bottomRight: endPoint,
                    label: `${selectionOption.value}`
                });
                setStartPoint({ ...defaultPoint });
                setEndPoint({ ...defaultPoint });
            }}
        />
        : null;

    const bbAreas = areas.map((area) => <BoundingArea
        key={JSON.stringify(area)}
        area={area}
        delete={deleteBB}
    />);


    return <section className='dbr-selection-area'>
        <img className='dbr-selection-image' src={image} alt="target image"
            onMouseDown={startDrawing}
            onMouseUp={() => { console.log('mouseup'); }}
            onMouseMove={move}
            // not handle resize event for now
            onLoad={(e) => {

                updateimageSizes({
                    client: {
                        height: e.currentTarget.clientHeight,
                        width: e.currentTarget.clientWidth
                    },
                    natural: {
                        height: e.currentTarget.naturalHeight,
                        width: e.currentTarget.naturalWidth
                    }
                })
            }}


        />
        {bbAreas}
        {currentArea}
    </section>;
};