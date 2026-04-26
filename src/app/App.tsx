import {ThemeProvider} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {AuthPage} from '../pages/AuthPage/AuthPage';
import {CreateEventPage} from '../pages/CreateEventPage/CreateEventPage';
import {EditEventPage} from '../pages/EditEventPage/EditEventPage';
import {EventPage} from '../pages/EventPage/EventPage';
import {EventsListPage} from '../pages/EventsListPage/EventsListPage';
//import {PersonalAccount} from '../pages/PersonalAccount/PersonalAccount';
import {ROUTES} from '../shared/constants/constants';
import {Header} from '../widgets/Header/Header';
import styles from './App.module.css';
import {PrivateRoute} from './routing/PrivateRoute';
import {theme} from './theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ru"
            >
                <div className={styles.container}>
                    <Header/>
                    <Routes>
                        <Route path={ROUTES.AUTH} element={<AuthPage/>}/>

                        <Route element={<PrivateRoute/>}>

                            <Route path={ROUTES.EVENTS_LIST} element={<EventsListPage/>}/>
                            <Route path={ROUTES.CREATE_EVENT} element={<CreateEventPage/>}/>
                            <Route path={ROUTES.EDIT_EVENT} element={<EditEventPage/>}/>

                            <Route path={ROUTES.EVENT} element={<EventPage/>}/>
                        </Route>

                    </Routes>
                </div>
            </LocalizationProvider>
        </ThemeProvider>

    );
}

export default App;
