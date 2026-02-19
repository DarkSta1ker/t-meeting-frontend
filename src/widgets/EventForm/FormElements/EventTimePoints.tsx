import {
    Box,
    Button,
    FormControlLabel,
    IconButton,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import {TimeField} from '@mui/x-date-pickers';
import {Dayjs} from 'dayjs';
import {Pencil, Plus, Save, Trash, X} from 'lucide-react';
import React, {FC, useEffect, useState} from 'react';
import {TimeLineBlock} from '../../../shared/types/event';
import {getTimeString, stringToTime, timeToString} from '../../../shared/utils/formatTimeAndData';

interface EventTimePointsProps {
    block: TimeLineBlock['payload'];
    handleUpdateTimeLine: (block: { name: string, time: string }[]) => void;
}

export const EventTimePoints: FC<EventTimePointsProps> = ({block = [], handleUpdateTimeLine}) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [timePoints, setTimePoints] = useState(block);
    const [isEditing, setIsEditing] = useState(false);
    const [editTime, setEditTime] = useState<Dayjs | null>(null);
    const [editName, setEditName] = useState('');

    useEffect(() => {
        setTimePoints(block);
    }, [block]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedIndex(Number(event.target.value));
        setIsEditing(false);
    };

    const handleAddTimePoint = () => {
        const newTimePoint = {
            time: `00:00:00Z`,
            name: `Новая точка ${timePoints.length + 1}`
        };
        const newTimePoints = [...timePoints, newTimePoint];
        setTimePoints(newTimePoints);
        setSelectedIndex(newTimePoints.length - 1);
        setEditTime(stringToTime(newTimePoint.time));
        setEditName(newTimePoint.name);
        setIsEditing(true);
    };

    const handleDeleteTimePoint = () => {
        if (timePoints.length <= 1) {
            return;
        }
        setTimePoints((prev) => {
            const filtered = prev.filter((_, index) => index !== selectedIndex);
            setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
            setIsEditing(false);
            handleUpdateTimeLine(filtered);
            return filtered;
        });
    };

    const handleStartEdit = () => {
        if (timePoints.length === 0) {
            return;
        }

        setEditTime(stringToTime(timePoints[selectedIndex].time));
        setEditName(timePoints[selectedIndex].name);
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        if (!editTime) {
            return;
        } // или можно установить запасное значение, например, текущее время

        const newTimePoints = [...timePoints];
        newTimePoints[selectedIndex] = {
            ...newTimePoints[selectedIndex],
            time: timeToString(editTime),
            name: editName
        };
        newTimePoints.sort((a, b) => a.time.localeCompare(b.time));
        setTimePoints(newTimePoints);
        setIsEditing(false);
        handleUpdateTimeLine(newTimePoints);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleTimeChange = (newValue: Dayjs | null) => {
        setEditTime(newValue);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditName(event.target.value);
    };

    if (timePoints.length === 0) {
        return (
            <Paper elevation={0} sx={{p: 3, textAlign: 'center'}}>
                <Typography color="text.secondary" gutterBottom>
                    Таймлайн не настроен
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Plus/>}
                    onClick={handleAddTimePoint}
                >
                    Добавить первую точку
                </Button>
            </Paper>
        );
    }

    //TODO Либо разобраться с paper и box, либо забить и переделать под нормальные стили
    return (
        <Paper elevation={2} sx={{p: 3, borderRadius: 2, width: '100%'}}>
            <Typography variant="h6" gutterBottom sx={{mb: 3}}>
                Таймлайн события
            </Typography>

            {/* Радио кнопки*/}
            <Box sx={{position: 'relative', mb: 3}}>
                <RadioGroup
                    row
                    value={selectedIndex}
                    onChange={handleChange}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        position: 'relative',
                        zIndex: 1,
                    }}
                >
                    {timePoints.map((point, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                position: 'relative',
                            }}
                        >
                            <FormControlLabel
                                value={index}
                                control={
                                    <Radio
                                        sx={{
                                            '& .MuiSvgIcon-root': {
                                                width: 28,
                                                height: 28,
                                            },
                                        }}
                                    />
                                }
                                label=""
                                sx={{
                                    m: 0,
                                    '& .MuiFormControlLabel-label': {display: 'none'},
                                }}
                            />
                            <Typography
                                variant="caption"
                                sx={{
                                    mt: 1,
                                    fontWeight: selectedIndex === index ? 'bold' : 'normal',
                                    fontSize: '0.75rem',
                                }}
                            >
                                {getTimeString(point.time)}
                            </Typography>
                        </Box>
                    ))}
                </RadioGroup>
            </Box>

            {/*Основной блок с инструментами и доп информацией */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 1,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 2,
                }}
            >
                {/*Блок отвечающий за редактирование/предоставленеи информации о поинте */}
                <Box sx={{flex: 1}}>
                    {/*Если в режиме редактирования, то видно окно редактирования */}
                    {isEditing ? (
                        <Stack spacing={2}>
                            <TextField
                                fullWidth
                                label="Название"
                                value={editName}
                                onChange={handleNameChange}
                                variant="outlined"
                                size="small"
                            />
                            {/* Заменить на часы*/}
                            <TimeField
                                label="Время (HH:MM)"
                                value={editTime}
                                onChange={handleTimeChange}
                                format="HH:mm"
                            />
                            <Box sx={{display: 'flex', gap: 1}}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<Save/>}
                                    onClick={handleSaveEdit}
                                >
                                    Сохранить
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    startIcon={<X/>}
                                    onClick={handleCancelEdit}
                                >
                                    Отмена
                                </Button>
                            </Box>
                        </Stack>
                    ) : (
                        <>
                            {/*Если не в режиме редактирования, то вывод инфы о поинте */}
                            <Typography variant="subtitle1" sx={{fontWeight: 'bold', mb: 1}}>
                                {timePoints[selectedIndex].name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Время: {getTimeString(timePoints[selectedIndex].time)}
                            </Typography>
                        </>
                    )}
                </Box>
                {/*Блок управляющих кнопок */}
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, ml: 2}}>
                    <IconButton
                        color="primary"
                        onClick={handleStartEdit}
                        disabled={isEditing}
                        title="Редактировать"
                    >
                        <Pencil/>
                    </IconButton>
                    <IconButton
                        color="primary"
                        onClick={handleAddTimePoint}
                        title="Добавить точку"
                    >
                        <Plus/>
                    </IconButton>
                    <IconButton
                        color="error"
                        onClick={handleDeleteTimePoint}
                        disabled={timePoints.length <= 1}
                        title="Удалить точку"
                    >
                        <Trash/>
                    </IconButton>
                </Box>
            </Paper>
        </Paper>
    );
};

