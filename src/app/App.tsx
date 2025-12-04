import styles from './App.css';
import React from 'react';
import {CreateEventPage} from "../pages/CreateEventPage/CreateEventPage";
import {EditEventPage} from "../pages/EditEventPage/EditEventPage";
import {EventsListPage} from "../pages/EventsListPage/EventsListPage";
import { Routes, Route} from 'react-router-dom';
import {PersonalAccount} from "../pages/PersonalAccount/PersonalAccount";
import {Header} from "../widgets/Header/Header";
import {EventPage} from "../pages/EventPage/EventPage";
import {AuthPage} from "../pages/AuthPage/AuthPage";
import {PrivateRoute} from "./routing/PrivateRourte";

function App() {
    return (
        <div className={styles.container}>
            <Header />
            <Routes>
                <Route path="/" element={<AuthPage/>} />

                <Route element={<PrivateRoute/>}>

                    <Route path="/eventsList" element={<EventsListPage />} />
                    <Route path="/createEvent" element={<CreateEventPage />} />
                    <Route path="/editEvent/:eventId" element={<EditEventPage />} />
                    <Route path="/personalAccount" element={<PersonalAccount />} />
                    <Route path="/event/:eventId" element={<EventPage />} />
                </Route>

            </Routes>
        </div>
  );
}

export default App;
