import styles from './App.css';
import React, { useState } from 'react';
import {CreateEventPage} from "../pages/CreateEventPage/CreateEventPage";
import {EditEventPage} from "../pages/EditEventPage/EditEventPage";
import {EventsListPage} from "../pages/EventsListPage/EventsListPage";
import { Routes, Route, Navigate } from 'react-router-dom';
import {PersonalAccount} from "../pages/PersonalAccount/PersonalAccount";
function App() {

    const [event, setEvent] = useState({
        id : "3fa85f64-5717-4562-b3fc-111111111111",
        name: "testEvent",
        description: "testEventDesxription",
        start: "testStartEventTime",
        end: "TestEndEventTime",
        location:  "TestLOcation"
    });

    return (
    <div className={styles.app}>
        <Routes>
            <Route path="/" element={<Navigate to="/eventsList" replace/>} />
            <Route path="/eventsList" element={<EventsListPage />} />
            <Route path="/createEvent" element={<CreateEventPage />} />
            <Route path="/editEvent" element={<EditEventPage />} />
            <Route path="/personalAccount" element={<PersonalAccount />} />
        </Routes>
    </div>
  );
}

export default App;
