import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {AuthPage} from '../pages/AuthPage/AuthPage';
import {CreateEventPage} from '../pages/CreateEventPage/CreateEventPage';
import {EditEventPage} from '../pages/EditEventPage/EditEventPage';
import {EventPage} from '../pages/EventPage/EventPage';
import {EventsListPage} from '../pages/EventsListPage/EventsListPage';
import {PersonalAccount} from '../pages/PersonalAccount/PersonalAccount';
import {Header} from '../widgets/Header/Header';
import styles from './App.module.css';
import {PrivateRoute} from './routing/PrivateRourte';

function App() {
    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="ru"
        >
            <div className={styles.container}>
                <Header />
                <Routes>
                    <Route path='/' element={<AuthPage/>} />

                    <Route element={<PrivateRoute/>}>

                        <Route path='/eventsList' element={<EventsListPage />} />
                        <Route path='/createEvent' element={<CreateEventPage />} />
                        <Route path='/editEvent/:eventId' element={<EditEventPage />} />
                        <Route path='/personalAccount' element={<PersonalAccount />} />
                        <Route path='/event/:eventId' element={<EventPage />} />
                    </Route>

                </Routes>
            </div>
        </LocalizationProvider>
  );
}

export default App;
