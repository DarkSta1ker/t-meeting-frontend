import {Box, Button, IconButton, Paper, Stack, TextField, Typography} from '@mui/material';
import {Pencil, Plus, Save, Trash, X} from 'lucide-react';
import React, {useEffect, useRef, useState} from 'react';
import styles from '../EventForm.module.css';

export interface MapPoint {
    x: number;
    y: number;
    text: string;
}

export interface MapBlockPayload {
    background: string;
    points: MapPoint[];
}

interface MapBlockEditorProps {
    payload: MapBlockPayload;
    onUpdate: (newPayload: MapBlockPayload) => void;
}

const MAX_POINTS = 25;

export const EventMap: React.FC<MapBlockEditorProps> = ({payload, onUpdate}) => {
    const [background, setBackground] = useState('');
    const [points, setPoints] = useState<MapPoint[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [editingPoint, setEditingPoint] = useState<MapPoint | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingMode, setIsAddingMode] = useState(false);
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setBackground(payload.background);
        setPoints(payload.points);
        const img = new Image();
        img.src = payload.background;
        img.onload = () => {
            setImageDimensions({width: img.naturalWidth, height: img.naturalHeight});
        };
    }, [payload]);

    const handleAddMode = () => {
        if (points.length >= MAX_POINTS) {
            alert(`Достигнут лимит точек (максимум ${MAX_POINTS})`);
            return;
        }
        setIsAddingMode(true);
    };

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isAddingMode) {
            return;
        }
        if (points.length >= MAX_POINTS) {
            alert(`Достигнут лимит точек (максимум ${MAX_POINTS})`);
            setIsAddingMode(false);
            return;
        }
        if (!containerRef.current) {
            return;
        }
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const clampedX = Math.min(1, Math.max(0, x));
        const clampedY = Math.min(1, Math.max(0, y));

        const newPoint: MapPoint = {
            x: clampedX,
            y: clampedY,
            text: `Точка ${points.length + 1}`,
        };
        const newPoints = [...points, newPoint];
        setPoints(newPoints);
        setSelectedIndex(newPoints.length - 1);
        setEditingPoint({...newPoint});
        setIsEditing(true);
        setIsAddingMode(false);
        onUpdate({background, points: newPoints});
    };

    const handlePointClick = (index: number) => {
        setSelectedIndex(index);
        setIsEditing(false);
        setIsAddingMode(false);
    };

    const handleStartEdit = () => {
        if (selectedIndex === null) {
            return;
        }
        setEditingPoint({...points[selectedIndex]});
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        if (selectedIndex === null || !editingPoint) {
            return;
        }
        const newPoints = [...points];
        newPoints[selectedIndex] = editingPoint;
        setPoints(newPoints);
        setIsEditing(false);
        onUpdate({background, points: newPoints});
    };

    const handleDelete = () => {
        if (selectedIndex === null) {
            return;
        }
        const newPoints = points ? points.filter((_, i) => i !== selectedIndex) : [];
        setPoints(newPoints);
        setSelectedIndex(newPoints.length > 0 ? newPoints.length - 1 : null);
        setIsAddingMode(false);
        setEditingPoint(null);
        setIsEditing(false);
        onUpdate({background, points: newPoints});
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditingPoint(null);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editingPoint) {
            setEditingPoint({...editingPoint, text: e.target.value});
        }
    };

    const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBackground(e.target.value);
    };

    const handleBackgroundUpdate = () => {
        onUpdate({background, points});
    };

    if (points.length === 0) {
        return (
            <div className={styles.section}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 600,
                        marginBottom: 1,
                        fontSize: 20,
                    }}
                >Карта</Typography>

                <Box sx={{mb: 2, display: 'flex', gap: 1, alignItems: 'center'}}>
                    <TextField
                        label="URL фоновой карты"
                        value={background}
                        onChange={handleBackgroundChange}
                        size="small"
                        fullWidth
                        sx={{
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#000000',
                            }
                        }}
                    />
                    <Button variant="contained" onClick={handleBackgroundUpdate} size="small">
                        Применить фон
                    </Button>
                </Box>

                <Box
                    ref={containerRef}
                    onClick={handleContainerClick}
                    sx={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: 800,
                        ...(imageDimensions
                            ? {aspectRatio: `${imageDimensions.width} / ${imageDimensions.height}`}
                            : {height: 400}),
                        backgroundImage: `url(${background || ''})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        border: '1px solid #ccc',
                        cursor: isAddingMode ? 'crosshair' : 'default',
                        mb: 2,
                        mx: 'auto',
                    }}
                />

                <Box sx={{textAlign: 'center'}}>
                    {!isAddingMode ? (
                        <Button
                            variant="contained"
                            startIcon={<Plus/>}
                            onClick={handleAddMode}
                        >
                            Добавить первую точку
                        </Button>
                    ) : (
                        <Typography color="primary" variant="body2">
                            Кликните по карте, чтобы разместить точку
                        </Typography>
                    )}
                </Box>
            </div>

        );
    }

    return (
        <div className={styles.section}>
            <Typography
                variant="subtitle1"
                sx={{
                    fontWeight: 600,
                    marginBottom: 1
                }}
            >Карта</Typography>

            <Box sx={{mb: 2, display: 'flex', gap: 1, alignItems: 'center'}}>
                <TextField
                    label="URL фоновой карты"
                    value={background}
                    onChange={handleBackgroundChange}
                    size="small"
                    fullWidth
                    sx={{
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#000000',
                        }
                    }}
                />
                <Button variant="contained" onClick={handleBackgroundUpdate} size="small">
                    Применить фон
                </Button>
            </Box>

            {isAddingMode && (
                <Typography color="primary" variant="body2" sx={{mb: 1}}>
                    Режим добавления: кликните по карте, чтобы создать точку
                </Typography>
            )}

            <Box
                ref={containerRef}
                onClick={handleContainerClick}
                sx={{
                    position: 'relative',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: `${imageDimensions?.width}`,
                    height: `${imageDimensions?.height}`,
                    ...(imageDimensions
                        ? {aspectRatio: `${imageDimensions.width} / ${imageDimensions.height}`}
                        : {height: 400}),
                    backgroundImage: `url(${background || ''})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    border: '1px solid #ccc',
                    cursor: 'crosshair',
                    mb: 2,
                }}
            >
                {points.map((point, index) => (
                    <Box
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePointClick(index);
                        }}
                        sx={{
                            position: 'absolute',
                            left: `${point.x * 100}%`,
                            top: `${point.y * 100}%`,
                            transform: 'translate(-50%, -50%)',
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            border: selectedIndex === index ? '3px solid black' : '2px solid black',
                            backgroundColor: 'yellow',
                            opacity: selectedIndex === index ? 1 : 0.5,
                            cursor: 'pointer',
                            zIndex: selectedIndex === index ? 2 : 1,
                            boxShadow: 1,
                        }}
                    />
                ))}
            </Box>

            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 2,
                }}
            >
                <Box sx={{flex: 1}}>
                    {isEditing && editingPoint ? (
                        <Stack spacing={2}>
                            <TextField
                                label="Текст"
                                value={editingPoint?.text}
                                onChange={handleTextChange}
                                fullWidth
                                size="small"
                                sx={{
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#000000',
                                    }
                                }}
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
                                    sx={{
                                        color: '#000000',
                                        borderColor: '#000000',
                                        '&:hover': {
                                            backgroundColor: 'red',
                                            color: '#ffffff',
                                            borderColor: 'transparent',
                                        }
                                    }}
                                >
                                    Отмена
                                </Button>
                            </Box>
                        </Stack>
                    ) : selectedIndex !== null ? (
                        <>
                            <Typography variant="subtitle1" sx={{fontWeight: 'bold', mb: 1}}>
                                {points[selectedIndex].text}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Координаты: ({points[selectedIndex].x.toFixed(2)}, {points[selectedIndex].y.toFixed(2)})
                            </Typography>
                        </>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            Точка не выбрана
                        </Typography>
                    )}
                </Box>

                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, ml: 2}}>
                    <IconButton
                        color="primary"
                        onClick={handleStartEdit}
                        disabled={isEditing || selectedIndex === null}
                        title="Редактировать"
                    >
                        <Pencil/>
                    </IconButton>
                    <IconButton
                        color="primary"
                        onClick={handleAddMode}
                        disabled={isAddingMode || points.length >= MAX_POINTS}
                        title="Добавить точку"
                    >
                        <Plus/>
                    </IconButton>
                    <IconButton
                        color="error"
                        onClick={handleDelete}
                        disabled={points.length < 1 || selectedIndex === null}
                        title="Удалить точку"
                    >
                        <Trash/>
                    </IconButton>
                </Box>
            </Paper>
        </div>
    );
};
