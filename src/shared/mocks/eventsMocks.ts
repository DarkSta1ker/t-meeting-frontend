import { ApiData } from "../types/api";
import {EventListItem} from "../types/event";

const mockEventsDB = [
    {
        "id": "5378afbf-e87b-411f-95df-b1aeeb5b770f",
        "name": "Новогодний корпоратив",
        "metadata": {
            "datetime": "2025-12-25T12:00:00.000Z",
            "location": "БЦ Кронос"
        },
        "content": [
            {
                "block": "promo-text",
                "payload": [
                    "🚨 ВНИМАНИЕ! СРОЧНОЕ СОБРАНИЕ! 🚨\n",
                    "Тема: \"Обсуждение стратегии празднования Нового Года\"\n",
                    "Повестка:\n" ,
                    "1. Оперативное уничтожение оливье (все отделы)\n" ,
                    "2. Синхронизация танцевальных движений под \"Иронию судьбы\"\n" ,
                    "3. Разработка плана по поиску тайного Санты\n" ,
                    "4. Тестирование шампанского на совместимость с рабочими процессами\n" ,
                    "5. Финальный акт: встреча 2025 с минимальными рисками\n" ,
                    "Материалы: свой хороший настрой + готовность веселиться\n" ,
                    "Важность: КРИТИЧЕСКАЯ!\n" ,
                    "Последствия пропуска: год без повышения и вечные угрызения совести\n" ,
                    "Ждем всех 25 декабря в 19:00! Серьезные лица приветствуются только в начале! 😉"
                ]
            },
            {
                "block": "map",
                "payload": {
                    "longitude": 0,
                    "latitude": 0,
                    "title": "string",
                    "icon": "https://example.com/"
                }
            },
            {
                "block": "timeline",
                "payload": [
                    {
                        "name": "string",
                        "time": "03:24:44.726Z"
                    }
                ]
            }
        ],
        "status": "published",
        "updatedAt": "2025-11-15T07:23:08.794Z",
        "createdAt": "2025-11-15T07:23:08.794Z",
    },
    {
        "id": "5378afbf-e87b-411f-95df-b1aeeb5b770a",
        "name": "Вечер настольных игр",
        "metadata": {
            "datetime": "2025-12-10T12:30:00.000Z",
            "location": "ТЦ Академгородка"
        },
        "content": [
            {
                "block": "promo-text",
                "payload": [
                    "⚔️ СРЕДНЕВЕКОВЫЙ ТУРНИР НАСТОЛЬНЫХ ИГР 🏰\n",
                    "Во имя короля и королевства! Собирайтесь, доблестные рыцари, хитрые маги и мудрые правители!\n",
                    "🎯 Королевские испытания:\n" ,
                    "• \"Подземелья и драконы\" - настоящая RPG-сессия с мастером игры\n" ,
                    "• \"Цитадели\" - построй самый могущественный город\n" ,
                    "• \"7 чудес\" - создай величайшую цивилизацию\n" ,
                    "• \"Маленький мир\" - завоюй новые земли\n" ,
                    "🧙‍♂️ Особенности вечера:\n" ,
                    "- Костюмированная фотосессия в рыцарских доспехах\n" ,
                    "- \"Таверна\" с тематическими напитками (медовуха, сидр)\n" ,
                    "- Турнирная таблица на пергаменте\n" ,
                    "- Призы в стиле средневековых реликвий\n" ,
                    "📜 Распорядок турнира:\n" ,
                    "19:00 - Открытие турнира, оглашение правил\n" ,
                    "19:30 - Первый рыцарский поединок (игровой раунд)\n" ,
                    "21:00 - Пир в королевском зале (ужин)\n" ,
                    "21:30 - Финальные битвы за трон\n" ,
                    "23:00 - Коронация победителей\n" ,
                    "🍗 Угощения в стиле таверны:\n" ,
                    "- Жареная курица и картофель\n" ,
                    "- Фрукты и орехи\n" ,
                    "- Фирменный \"эль\" (безалкогольный)\n" ,
                    "- Пироги с разными начинками\n" ,
                    "🎪 Место проведения: Тронный зал (переговорка №3)\n" ,
                    "📯 Дата сбора: 22 ноября, 19:00\n" ,
                    "Дресс-код: по желанию, элементы средневекового стиля приветствуются!"
                ]
            },
            {
                "block": "map",
                "payload": {
                    "longitude": 0,
                    "latitude": 0,
                    "title": "string",
                    "icon": "https://example.com/"
                }
            },
            {
                "block": "timeline",
                "payload": [
                    {
                        "name": "string",
                        "time": "03:24:44.726Z"
                    }
                ]
            }
        ],
        "status": "draft",
        "updatedAt": "2025-11-15T07:23:08.794Z",
        "createdAt": "2025-11-15T07:23:08.794Z",
    },
    {
        "id": "5378afbf-e87b-411f-95df-b1aeeb5b770b",
        "name": "Сбор книжного клуба",
        "metadata": {
            "datetime": "2025-12-12T10:00:00.000Z",
            "location": "БЦ Кронос"
        },
        "content": [
            {
                "block": "promo-text",
                "payload": [
                    "💻 BOOK CLUB 1.0: DEBUG YOUR READING LIST 📖\n" ,
                    "Собрание программистов, неравнодушных к хорошей литературе!\n" ,
                    "🎯 Тема месяца: \"Код, алгоритмы и человечность\"\n" ,
                    "Книга для обсуждения: \"Чистый код\" Роберта Мартина или \"Грокаем алгоритмы\" Адитьи Бхаргавы\n" ,
                    "🧠 Формат встречи:\n" ,
                    "• 19:00-19:20 - Networking, знакомство, кофе\n" ,
                    "• 19:20-20:00 - Презентация книги месяца (докладчик: Senior Dev)\n" ,
                    "• 20:00-21:00 - Обсуждение в маленьких группах\n" ,
                    "• 21:00-21:30 - Общая дискуссия, выводы\n" ,
                    "• 21:30-22:00 - Свободное общение, рекомендации книг\n" ,
                    "📚 Что обсуждаем:\n" ,
                    "- Практическая применимость идей из книги\n" ,
                    "- Примеры из реальных проектов\n" ,
                    "- Что взять на вооружение, что отвергнуть\n" ,
                    "- Альтернативные точки зрения\n" ,
                    "💡 Особенности:\n" ,
                    "- \"Git for Books\" - система рекомендаций с пулл-реквестами\n" ,
                    "- \"Code Review\" для идей из книг\n" ,
                    "- Докладчики получают Tech Debt Tokens (можно потратить на кофе)\n" ,
                    "- Digital whiteboard для коллективных заметок\n" ,
                    "☕ На столе:\n" ,
                    "- Кофе как в лучших IT-кофейнях\n" ,
                    "- Печенья в форме фигурных скобок\n" ,
                    "- Энергетические батончики для мозга\n" ,
                    "- Вода для гидратации во время дебатов\n" ,
                    "🖥️ Место: Конференц-зал \"Binary\"\n" ,
                    "📅 Дата: Каждый второй четверг месяца\n" ,
                    "⏰ Время: 19:00-22:00\n" ,
                    "Приносите свои экземпляры книг, заметки и готовность к дискуссии!"
                ]
            },
            {
                "block": "map",
                "payload": {
                    "longitude": 0,
                    "latitude": 0,
                    "title": "string",
                    "icon": "https://example.com/"
                }
            },
            {
                "block": "timeline",
                "payload": [
                    {
                        "name": "string",
                        "time": "03:24:44.726Z"
                    }
                ]
            }
        ],
        "status": "draft",
        "updatedAt": "2025-11-15T07:23:08.794Z",
        "createdAt": "2025-11-15T07:23:08.794Z",
    }
]


const generateId = (): string => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const simulateNetworkDelay = () => {
    const delay = Math.random() * 500 + 200; // 200-700ms
    return new Promise(resolve => setTimeout(resolve, delay));
};

export const mockRequestApi = async <T = Record<string, unknown>>(data: ApiData<T>): Promise<Response> => {
    console.log(`[Mock API] ${data.method} ${data.url}`, data.payload || '');

    await simulateNetworkDelay();

    const url = data.url;

    try {
        if (data.method === 'GET' && url === '/api/events') {
            return new Response(JSON.stringify(mockEventsDB), {
                status: 200,
                statusText: 'OK',
                headers: { 'Content-Type': 'application/json' }
            });
        }
        if (data.method === 'GET' && url.startsWith('/api/event/')) {
            const eventId = url.replace('/api/event/', '');
            const event = mockEventsDB.find(e => e.id === eventId);

            if (!event) {
                return new Response(JSON.stringify({ error: 'Event not found' }), {
                    status: 404,
                    statusText: 'Not Found',
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            return new Response(JSON.stringify(event), {
                status: 200,
                statusText: 'OK',
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (data.method === 'POST' && url === '/api/event') {
            const newEvent = data.payload as EventListItem;

            const eventToAdd = {
                ...newEvent,
                id: generateId(),
                status: newEvent.status || 'draft',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            mockEventsDB.push(eventToAdd);
            console.log('[Mock API] Event added:', eventToAdd);

            return new Response(JSON.stringify(eventToAdd), {
                status: 201,
                statusText: 'Created',
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (data.method === 'PUT' && url.startsWith('/api/event/')) {
            const eventId = url.replace('/api/event/', '');
            const updatedEvent = data.payload as Event;

            const eventIndex = mockEventsDB.findIndex(e => e.id === eventId);

            if (eventIndex === -1) {
                return new Response(JSON.stringify({ error: 'Event not found' }), {
                    status: 404,
                    statusText: 'Not Found',
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            const oldEvent = mockEventsDB[eventIndex];
            const finalEvent = {
                ...oldEvent,
                ...updatedEvent,
                id: eventId, // Защищаем от изменения ID
                updatedAt: new Date().toISOString()
            };

            mockEventsDB[eventIndex] = finalEvent;
            console.log('[Mock API] Event updated:', finalEvent);

            return new Response(JSON.stringify(finalEvent), {
                status: 200,
                statusText: 'OK',
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (data.method === 'DELETE' && url.startsWith('/api/event/')) {
            const eventId = url.replace('/api/event/', '');

            const eventIndex = mockEventsDB.findIndex(e => e.id === eventId);

            if (eventIndex === -1) {
                return new Response(JSON.stringify({ error: 'Event not found' }), {
                    status: 404,
                    statusText: 'Not Found',
                    headers: { 'Content-Type': 'application/json' }
                });
            }

            const [deletedEvent] = mockEventsDB.splice(eventIndex, 1);
            console.log('[Mock API] Event deleted:', deletedEvent);

            return new Response(JSON.stringify({
                success: true,
                message: 'Event deleted successfully',
                deletedEvent
            }), {
                status: 200,
                statusText: 'OK',
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
            status: 404,
            statusText: 'Not Found',
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('[Mock API Error]:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            statusText: 'Internal Server Error',
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
