import styles from './App.css';
import React, { useState } from 'react';
import {CreateEventPage} from "../pages/CreateEventPage/CreateEventPage";
import {EditEventPage} from "../pages/EditEventPage/EditEventPage";
import {EventsListPage} from "../pages/EventsListPage/EventsListPage";
import { Routes, Route, Navigate } from 'react-router-dom';
import {PersonalAccount} from "../pages/PersonalAccount/PersonalAccount";
import {Header} from "../widgets/Header/Header";
function App() {

    return (
    <div>
        <Routes>
            <div className={styles.container}>
                <Header />
                <div className={styles.content}>
                    <Route path="/" element={<Navigate to="/eventsList" replace/>} />
                    <Route path="/eventsList" element={<EventsListPage />} />
                    <Route path="/createEvent" element={<CreateEventPage />} />
                    <Route path="/editEvent/:eventId" element={<EditEventPage />} />
                    <Route path="/personalAccount" element={<PersonalAccount />} />
                </div>
            </div>
        </Routes>
    </div>
  );
}

export default App;
