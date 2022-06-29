import React, { useState } from 'react';

import { emptyFunc } from 'shared/common/helpers';
import { BoundingBox, Point } from 'shared/dbr-core/types';

import './BoundingArea.scss';

export interface BoundingAreaProps {
    area: BoundingBox;

    move?: (point: Point) => void;
    endDrawing?: () => void;

    delete?: (area: BoundingBox)=>void;
}

export const BoundingArea: React.FC<BoundingAreaProps> = props => {
    const { area, move, endDrawing, delete: deleteFn } = props;

    const [showDel, setShowDel] = useState(false);

    const delButton = deleteFn && showDel
    ? <button className='dbr-bounding-area-del' onClick={()=>{deleteFn(area)}}>×</button>
    : null;  

    const labelElement = showDel 
    ? null
    : <span className='dbr-bounding-area-lable'>{area.label}</span>

    return <div style={{
        top: area.topLeft.y,
        left: area.topLeft.x,
        width: area.bottomRight.x - area.topLeft.x,
        height: area.bottomRight.y - area.topLeft.y
    }} className='dbr-bounding-area'
        onMouseEnter={()=>{setShowDel(true)}}
        onMouseLeave={()=>{setShowDel(false)}}
        onMouseMove={(e) => {

            const action = move || emptyFunc;
            action({
                x: e.nativeEvent.offsetX,
                y: e.nativeEvent.offsetY
            });

        }}
        onMouseUp={() => { 
            const action = endDrawing || emptyFunc;
            action();
         }}
    >
        {labelElement}
        {delButton}
    </div>;
};