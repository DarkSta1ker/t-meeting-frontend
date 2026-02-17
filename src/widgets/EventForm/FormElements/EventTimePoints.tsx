import React, {FC, useState, useEffect} from 'react';

import {TimeLineBlock} from '../../../shared/types/event';
import {getTime} from '../../../shared/utils/formatTimeAndData';

interface EventTimePointsProps {
    block: TimeLineBlock['payload'];
    onUpdate?: (updatedBlock: TimeLineBlock['payload']) => void;
}

export const EventTimePoints: FC<EventTimePointsProps> = ({block = [], onUpdate}) => {

    return (
        <>
        </>
    );
};