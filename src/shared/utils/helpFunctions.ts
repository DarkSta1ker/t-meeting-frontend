import {EventNew, PromoTextBlock} from '../types/event';

export const getDescription = (event: EventNew) => {
    const block = event.content.find((item): item is PromoTextBlock =>
        item.block === 'promo-text'
    );
    return block?.payload.join(' ');
};

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}
