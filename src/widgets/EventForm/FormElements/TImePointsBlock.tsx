import {Button, IconButton, Radio, RadioGroup, Stack, TextField, Typography,} from '@mui/material';
import {TimeField} from '@mui/x-date-pickers';
import {Dayjs} from 'dayjs';
import {Pencil, Plus, Save, Trash, X} from 'lucide-react';
import React, {FC, useEffect, useState} from 'react';
import {getTimeString, stringToTime, timeToString} from '../../../shared/utils/formatTimeAndData';
import styles from '../EventForm.module.css';
import {TimePoint} from './InteractivePoints';

interface TimePointsProps {
    timeline?: {
        name: string;
        time: string;
    }[];
    onUpdate: (timePoints: TimePoint[]) => void;
}

export const TimePointsBlock: FC<TimePointsProps> = ({timeline = [], onUpdate}) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [timePoints, setTimePoints] = useState(timeline);
    const [isEditing, setIsEditing] = useState(false);
    const [editTime, setEditTime] = useState<Dayjs | null>(null);
    const [editName, setEditName] = useState('');

    useEffect(() => {
        console.log('юзэфект у блока таймпоинтов');
        setTimePoints(timeline);
    }, [timeline]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedIndex(Number(event.target.value));
        setIsEditing(false);
    };

    const handleAddTimePoint = () => {
        if (timePoints.length > 25) {
            console.log('Нельзя делать больше 25 точек');
        } else {
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
        }
    };

    const handleDeleteTimePoint = () => {
        if (timePoints.length <= 1) {
            return;
        }
        setTimePoints((prev) => {
            const filtered = prev.filter((_, index) => index !== selectedIndex);
            setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
            setIsEditing(false);
            onUpdate(filtered);
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
        }

        const newTimePoints = [...timePoints];
        newTimePoints[selectedIndex] = {
            ...newTimePoints[selectedIndex],
            time: timeToString(editTime),
            name: editName
        };
        newTimePoints.sort((a, b) => a.time.localeCompare(b.time));
        setTimePoints(newTimePoints);
        setIsEditing(false);
        onUpdate(newTimePoints);
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

    return (
        <div className={styles.section}>
            <div style={{marginBottom: 16}}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 600,
                        marginBottom: 1,
                        fontSize: 20,
                    }}
                >Таймлайн</Typography>
                {timePoints.length === 0 ? (
                    <div style={{textAlign: 'center', padding: 12}}>
                        <Typography
                            color="text.secondary"
                            gutterBottom
                        >
                            Таймлайн не настроен
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={handleAddTimePoint}
                            startIcon={<Plus/>}
                        >
                            Добавить первую точку
                        </Button>
                    </div>
                ) : (
                    <RadioGroup
                        row value={selectedIndex}
                        onChange={handleChange}
                        sx={{
                            justifyContent: 'space-between',
                            marginBottom: 16
                        }}
                    >
                        {timePoints.map((point, idx) => (
                            <div
                                key={idx}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >
                                <Radio
                                    value={idx}
                                    sx={{
                                        '& .MuiSvgIcon-root':
                                            {width: 24, height: 24}
                                    }}/>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        mt: 0.5,
                                        fontWeight: selectedIndex === idx ? 'bold' : 'normal'
                                    }}
                                >
                                    {getTimeString(point.time)}
                                </Typography>
                            </div>
                        ))}
                    </RadioGroup>
                )}
            </div>

            {timePoints.length > 0 && (
                <div style={{
                    border: '1px solid rgba(0,0,0,0.05)',
                    borderRadius: 12,
                    padding: 12,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    background: '#fafafa'
                }}>
                    <div style={{flex: 1}}>
                        {isEditing ? (
                            <Stack spacing={1}>
                                <TextField
                                    fullWidth
                                    label="Название"
                                    size="small"
                                    value={editName}
                                    sx={{
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#000000',
                                        }
                                    }}
                                    onChange={(e) => setEditName(e.target.value)}
                                />
                                <TimeField
                                    label="Время (HH:MM)"
                                    size="small"
                                    value={editTime}
                                    sx={{
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: '#000000',
                                        }
                                    }}
                                    onChange={setEditTime}
                                    format="HH:mm"
                                />
                                <Stack
                                    direction="row"
                                    spacing={1}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        startIcon={<Save/>}
                                        sx={{
                                            color: '#000000',
                                            '&.Mui-focused': {
                                                color: '#000000',
                                            },
                                            '&.MuiButtonBase-root': {
                                                color: '#000000',
                                            }
                                        }}
                                        onClick={handleSaveEdit}
                                    >
                                        Сохранить
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<X/>}
                                        sx={{
                                            color: '#000000',
                                            borderColor: '#000000',
                                            '&:hover': {
                                                backgroundColor: 'red',
                                                color: '#ffffff',
                                                borderColor: 'transparent',
                                            }
                                        }}
                                        onClick={handleCancelEdit}
                                    >
                                        Отмена
                                    </Button>
                                </Stack>
                            </Stack>
                        ) : (
                            <>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 0.5
                                    }}
                                >
                                    {timePoints[selectedIndex].name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Время: {getTimeString(timePoints[selectedIndex].time)}
                                </Typography>
                            </>
                        )}
                    </div>

                    <Stack spacing={1}>
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
                    </Stack>
                </div>
            )}
        </div>
    );
};

