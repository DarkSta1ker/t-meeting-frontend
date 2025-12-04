import styles from './App.css';
import React from 'react';
import {CreateEventPage} from "../pages/CreateEventPage/CreateEventPage";
import {EditEventPage} from "../pages/EditEventPage/EditEventPage";
import {EventsListPage} from "../pages/EventsListPage/EventsListPage";
import { Routes, Route, Navigate } from 'react-router-dom';
import {PersonalAccount} from "../pages/PersonalAccount/PersonalAccount";
import {Header} from "../widgets/Header/Header";
import {EventPage} from "../pages/EventPage/EventPage";
function App() {

    return (
    <div>
        <div className={styles.container}>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to="/eventsList" replace/>} />
                <Route path="/eventsList" element={<EventsListPage />} />
                <Route path="/createEvent" element={<CreateEventPage />} />
                <Route path="/editEvent/:eventId" element={<EditEventPage />} />
                <Route path="/personalAccount" element={<PersonalAccount />} />
                <Route path="/event/:eventId" element={<EventPage />} />
            </Routes>
        </div>
    </div>
  );
}

export default App;
