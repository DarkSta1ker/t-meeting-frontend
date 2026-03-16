import {EventNew, PromoTextBlock} from '../types/event';

export const getDescription = (event: EventNew) => {
    const block = event.content.find((item): item is PromoTextBlock =>
        item.block === 'promo-text'
    );
    return block?.payload.join(' ');
};
