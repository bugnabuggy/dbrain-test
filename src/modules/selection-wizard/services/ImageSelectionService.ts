import { BoundingBox, ImageConversionSizes } from 'shared/dbr-core/types';

export class ImageSelectionService {
    toClientCoordinates(box: BoundingBox, conversionSizes: ImageConversionSizes): BoundingBox {
        // no need to implement for now
        throw new Error('not implemented');
        return box;
    }

    toImageCoordinates(box: BoundingBox, conversionSizes: ImageConversionSizes): BoundingBox {
        const xRation = conversionSizes.natural.width / conversionSizes.client.width;
        const yRation = conversionSizes.natural.height / conversionSizes.client.height;
                                                                                                                                                                                                                                                                                                                            
        const calcVal = (val:number, ration:number)=>{
            return Math.ceil(val * ration)
        };

        const convertedBox: BoundingBox = {
            topLeft: {
                x: calcVal(box.topLeft.x, xRation),
                y: calcVal(conversionSizes.client.height - box.topLeft.y, yRation)
            },
            bottomRight: {
                x: calcVal(box.bottomRight.x, xRation),
                y: calcVal(conversionSizes.client.height - box.bottomRight.y, yRation)
            },
            label: box.label // the value not needed actually
        }
        
        
        return convertedBox;
    }
}