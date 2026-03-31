import {EventListItem} from '../types/event';

const mockEventsDB: EventListItem[] = [
    {
        id: '5378afbf-e87b-411f-95df-b1aeeb5b770f',
        name: 'Новогодний корпоратив',
        metadata: {
            datetime: '2026-12-26T12:00:00.000Z',
            location: 'БЦ Кронос'
        },
        content: [
            {
                block: 'promo-text',
                payload: [
                    '🚨 ВНИМАНИЕ! СРОЧНОЕ СОБРАНИЕ! 🚨\n',
                    'Тема: "Обсуждение стратегии празднования Нового Года"\n',
                    'Повестка:\n',
                    '1. Оперативное уничтожение оливье (все отделы)\n',
                    '2. Синхронизация танцевальных движений под "Иронию судьбы"\n',
                    '3. Разработка плана по поиску тайного Санты\n',
                    '4. Тестирование шампанского на совместимость с рабочими процессами\n',
                    '5. Финальный акт: встреча 2025 с минимальными рисками\n',
                    'Материалы: свой хороший настрой + готовность веселиться\n',
                    'Важность: КРИТИЧЕСКАЯ!\n',
                    'Последствия пропуска: год без повышения и вечные угрызения совести\n',
                    'Ждем всех 25 декабря в 19:00! Серьезные лица приветствуются только в начале! 😉'
                ]
            },
            {
                block: 'map',
                payload: {
                    background: process.env.PUBLIC_URL + '/images/map1.jpg',
                    points: [
                        {x: 0.2, y: 0.2, text: 'почти левый верхний угол'},
                        {x: 0.8, y: 0.8, text: 'почти правый верхний угол'},
                        {x: 0.5, y: 0.5, text: 'центр'}
                    ]
                }
            },
            {
                block: 'timeline',
                payload: [{name: 'string', time: '03:24:44.726Z'}]
            },
            {
                block: 'interactive-points',
                payload: {
                    background: process.env.PUBLIC_URL + '/images/map1.jpg',
                    points: [
                        {
                            x: 0.2,
                            y: 0.2,
                            text: 'почти левый верхний угол',
                            timeline: [
                                {
                                    name: 'string',
                                    time: '03:24:44.726Z'
                                },
                                {
                                    name: 'string',
                                    time: '03:50:44.726Z'
                                },
                                {
                                    name: 'string',
                                    time: '04:20:44.726Z'
                                }
                            ]
                        },
                        {x: 0.8, y: 0.8, text: 'почти правый верхний угол', timeline: []},
                        {
                            x: 0.5, y: 0.5, text: 'центр', timeline: [
                                {
                                    name: 'string',
                                    time: '03:24:44.726Z'
                                }
                            ]
                        },
                    ]
                }
            }
        ],
        status: 'published',
        updatedAt: '2025-11-15T07:23:08.794Z',
        createdAt: '2025-11-15T07:23:08.794Z',
    },
    {
        id: '5378afbf-e87b-411f-95df-b1aeeb5b770a',
        name: 'Вечер настольных игр',
        metadata: {
            datetime: '2026-06-10T12:30:00.000Z',
            location: 'ТЦ Академгородка'
        },
        content: [
            {
                block: 'promo-text',
                payload: [
                    '⚔️ СРЕДНЕВЕКОВЫЙ ТУРНИР НАСТОЛЬНЫХ ИГР 🏰\n',
                    'Во имя короля и королевства! Собирайтесь, доблестные рыцари, хитрые маги и мудрые правители!\n',
                    '🎯 Королевские испытания:\n',
                    '• "Подземелья и драконы" - настоящая RPG-сессия с мастером игры\n',
                    '• "Цитадели" - построй самый могущественный город\n',
                    '• "7 чудес" - создай величайшую цивилизацию\n',
                    '• "Маленький мир" - завоюй новые земли\n',
                    '🧙‍♂️ Особенности вечера:\n',
                    '- Костюмированная фотосессия в рыцарских доспехах\n',
                    '- "Таверна" с тематическими напитками (медовуха, сидр)\n',
                    '- Турнирная таблица на пергаменте\n',
                    '- Призы в стиле средневековых реликвий\n',
                    '📜 Распорядок турнира:\n',
                    '19:00 - Открытие турнира, оглашение правил\n',
                    '19:30 - Первый рыцарский поединок (игровой раунд)\n',
                    '21:00 - Пир в королевском зале (ужин)\n',
                    '21:30 - Финальные битвы за трон\n',
                    '23:00 - Коронация победителей\n',
                    '🍗 Угощения в стиле таверны:\n',
                    '- Жареная курица и картофель\n',
                    '- Фрукты и орехи\n',
                    '- Фирменный "эль" (безалкогольный)\n',
                    '- Пироги с разными начинками\n',
                    '🎪 Место проведения: Тронный зал (переговорка №3)\n',
                    '📯 Дата сбора: 22 ноября, 19:00\n',
                    'Дресс-код: по желанию, элементы средневекового стиля приветствуются!'
                ]
            },
            {
                block: 'map',
                payload: {
                    background: process.env.PUBLIC_URL + '/images/map2.jpg',
                    points: [
                        {x: 0.2, y: 0.2, text: 'почти левый верхний угол'},
                        {x: 0.8, y: 0.8, text: 'почти правый верхний угол'},
                        {x: 0.5, y: 0.5, text: 'центр'}
                    ]
                }
            },
            {
                block: 'timeline',
                payload: [
                    {name: 'Первый поинт', time: '06:30:44.726Z'},
                    {name: 'Второй поинт', time: '07:45:44.726Z'},
                    {name: 'Третий поинт', time: '08:30:44.726Z'},
                    {name: 'Четвертый поинт', time: '10:55:44.726Z'},
                    {name: 'Пятый поинт', time: '12:30:44.726Z'},
                    {name: 'Шестой поинт', time: '19:00:44.726Z'},
                ]
            },
            {
                block: 'interactive-points',
                payload: {
                    background: process.env.PUBLIC_URL + '/images/map2.jpg',
                    points: [
                        {
                            x: 0.2,
                            y: 0.2,
                            text: 'почти левый верхний угол',
                            timeline: [
                                {name: 'Первый поинт', time: '06:30:44.726Z'},
                                {name: 'Второй поинт', time: '07:45:44.726Z'},
                                {name: 'Третий поинт', time: '08:30:44.726Z'},
                                {name: 'Четвертый поинт', time: '10:55:44.726Z'},
                                {name: 'Пятый поинт', time: '12:30:44.726Z'},
                                {name: 'Шестой поинт', time: '19:00:44.726Z'},
                            ]
                        },
                        {x: 0.8, y: 0.8, text: 'почти правый верхний угол', timeline: []},
                        {
                            x: 0.5, y: 0.5, text: 'центр', timeline: [
                                {
                                    name: 'string',
                                    time: '03:24:44.726Z'
                                }
                            ]
                        },
                    ]
                }
            }
        ],
        status: 'draft',
        updatedAt: '2025-11-15T07:23:08.794Z',
        createdAt: '2025-11-15T07:23:08.794Z',
    },
    {
        id: '5378afbf-e87b-411f-95df-b1aeeb5b770b',
        name: 'Сбор книжного клуба',
        metadata: {
            datetime: '2026-06-15T10:00:00.000Z',
            location: 'БЦ Кронос'
        },
        content: [
            {
                block: 'promo-text',
                payload: [
                    '💻 BOOK CLUB 1.0: DEBUG YOUR READING LIST 📖\n',
                    'Собрание программистов, неравнодушных к хорошей литературе!\n',
                    '🎯 Тема месяца: "Код, алгоритмы и человечность"\n',
                    'Книга для обсуждения: "Чистый код" Роберта Мартина или "Грокаем алгоритмы" Адитьи Бхаргавы\n',
                    '🧠 Формат встречи:\n',
                    '• 19:00-19:20 - Networking, знакомство, кофе\n',
                    '• 19:20-20:00 - Презентация книги месяца (докладчик: Senior Dev)\n',
                    '• 20:00-21:00 - Обсуждение в маленьких группах\n',
                    '• 21:00-21:30 - Общая дискуссия, выводы\n',
                    '• 21:30-22:00 - Свободное общение, рекомендации книг\n',
                    '📚 Что обсуждаем:\n',
                    '- Практическая применимость идей из книги\n',
                    '- Примеры из реальных проектов\n',
                    '- Что взять на вооружение, что отвергнуть\n',
                    '- Альтернативные точки зрения\n',
                    '💡 Особенности:\n',
                    '- "Git for Books" - система рекомендаций с пулл-реквестами\n',
                    '- "Code Review" для идей из книг\n',
                    '- Докладчики получают Tech Debt Tokens (можно потратить на кофе)\n',
                    '- Digital whiteboard для коллективных заметок\n',
                    '☕ На столе:\n',
                    '- Кофе как в лучших IT-кофейнях\n',
                    '- Печенья в форме фигурных скобок\n',
                    '- Энергетические батончики для мозга\n',
                    '- Вода для гидратации во время дебатов\n',
                    '🖥️ Место: Конференц-зал "Binary"\n',
                    '📅 Дата: Каждый второй четверг месяца\n',
                    '⏰ Время: 19:00-22:00\n',
                    'Приносите свои экземпляры книг, заметки и готовность к дискуссии!'
                ]
            },
            {
                block: 'map',
                payload: {
                    background: process.env.PUBLIC_URL + '/images/map3.jpg',
                    points: [
                        {x: 0.2, y: 0.2, text: 'почти левый верхний угол'},
                        {x: 0.8, y: 0.8, text: 'почти правый верхний угол'},
                        {x: 0.5, y: 0.5, text: 'центр'}
                    ]
                }
            },
            {
                block: 'timeline',
                payload: [{name: 'string', time: '03:24:44.726Z'}]
            },
            {
                block: 'interactive-points',
                payload: {
                    background: process.env.PUBLIC_URL + '/images/map3.jpg',
                    points: [
                        {
                            x: 0.2,
                            y: 0.2,
                            text: 'почти левый верхний угол',
                            timeline: [
                                {
                                    name: 'string',
                                    time: '03:24:44.726Z'
                                },
                                {
                                    name: 'string',
                                    time: '03:50:44.726Z'
                                },
                                {
                                    name: 'string',
                                    time: '04:20:44.726Z'
                                }
                            ]
                        },
                        {x: 0.8, y: 0.8, text: 'почти правый верхний угол', timeline: []},
                        {
                            x: 0.5, y: 0.5, text: 'центр', timeline: [
                                {
                                    name: 'string',
                                    time: '03:24:44.726Z'
                                }
                            ]
                        },
                    ]
                }
            }
        ],
        status: 'draft',
        updatedAt: '2025-11-15T07:23:08.794Z',
        createdAt: '2025-11-15T07:23:08.794Z',
    }
];

const generateId = (): string => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const simulateNetworkDelay = (): Promise<void> => {
    const delay = Math.random() * 500 + 200; // 200-700ms
    return new Promise((resolve) => setTimeout(resolve, delay));
};

/**
 * Мок-клиент, имитирующий API запросы.
 * Использование: const responseData = await mockApiClient('/events', { method: 'GET' });
 */
export const mockApiClient = async <T = any>(
    url: string,
    options?: { method?: string; body?: any }
): Promise<T> => {
    const method = options?.method || 'GET';
    const body = options?.body;

    console.log(`[Mock API] ${method} ${url}`, body || '');

    await simulateNetworkDelay();

    // GET /events
    if (method === 'GET' && url === '/events') {
        return mockEventsDB as T;
    }

    // GET /event/:id
    if (method === 'GET' && url.startsWith('/event/')) {
        const eventId = url.replace('/event/', '');
        const event = mockEventsDB.find((e) => e.id === eventId);

        if (!event) {
            throw new Error('Event not found');
        }

        return event as T;
    }

    // POST /event
    if (method === 'POST' && url === '/event') {
        const newEvent = body as Partial<EventListItem>;

        const eventToAdd: EventListItem = {
            ...newEvent,
            id: generateId(),
            status: newEvent.status || 'draft',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        } as EventListItem;

        mockEventsDB.push(eventToAdd);
        console.log('[Mock API] Event added:', eventToAdd);

        return eventToAdd as T;
    }

    // PUT /event/:id
    if (method === 'PUT' && url.startsWith('/event/')) {
        const eventId = url.replace('/event/', '');
        const updatedEvent = body as Partial<EventListItem>;

        const eventIndex = mockEventsDB.findIndex((e) => e.id === eventId);

        if (eventIndex === -1) {
            throw new Error('Event not found');
        }

        const oldEvent = mockEventsDB[eventIndex];
        const finalEvent: EventListItem = {
            ...oldEvent,
            ...updatedEvent,
            id: eventId, // защита от изменения ID
            updatedAt: new Date().toISOString(),
        };

        mockEventsDB[eventIndex] = finalEvent;
        console.log('[Mock API] Event updated:', finalEvent);

        return finalEvent as T;
    }

    // DELETE /event/:id
    if (method === 'DELETE' && url.startsWith('/event/')) {
        const eventId = url.replace('/event/', '');

        const eventIndex = mockEventsDB.findIndex((e) => e.id === eventId);

        if (eventIndex === -1) {
            throw new Error('Event not found');
        }

        const [deletedEvent] = mockEventsDB.splice(eventIndex, 1);
        console.log('[Mock API] Event deleted:', deletedEvent);

        return {success: true, message: 'Event deleted successfully', deletedEvent} as T;
    }

    // Если ничего не подошло
    throw new Error(`Endpoint not found: ${method} ${url}`);
};
