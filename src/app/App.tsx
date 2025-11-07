import './App.css';
import React, { useState } from 'react';
import {CreateEventPage} from "../pages/CreateEventPage/CreateEventPage";
// function handleFetchFabric(event, fetchMethod) {
//   switch(fetchMethod) {
//     case "POST":
//       return fetch('/api/event', {
//         method: fetchMethod,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(event)
//       });
//     case "PUT":
//       return fetch(`/api/event/${event.id}`, {
//         method: fetchMethod,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(event)
//       });
//     case "DELETE":
//       return fetch(`/api/event/${event.id}`, {
//         method: fetchMethod,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     case "GET":
//       return fetch(`/api/event/${event.id}`, {
//         method: fetchMethod,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     default:
//       return Promise.reject(new Error(`Unknown method: ${fetchMethod}`));
//   }
// }
//


// function createFetchRequest(url, method, data=null){
//     const options = {
//         method: method,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data)
//     }
//     if(data){
//         options.body = JSON.stringify(data);
//     }
//     return fetch(url, options);
// }
//
//

function App() {
  
  const [event, setEvent] = useState({
    id : "3fa85f64-5717-4562-b3fc-111111111111",
    name: "testEvent",
    description: "testEventDesxription",
    start: "testStartEventTime",
    end: "TestEndEventTime",
    location:  "TestLOcation"
  });
  // const handleChange = (field) => (e) => {
  //   setEvent(prev => ({
  //     ...prev,
  //     [field]: e.target.value
  //   }));
  // };
  // async function handleFetch(fetchMethod) {
  //   try {
  //     const response = await handleFetchFabric(event, fetchMethod);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     if (fetchMethod==='DELETE'&& response.status === 200) {
  //       console.log('Success: No content');
  //       return;
  //     }
  //     const data = await response.json();
  //     console.log('Success:', data);
  //   } catch (error) {
  //     console.error('Request failed:', error);
  //   }
  // }
  //
  // function print(){
  //   console.log(JSON.stringify(event));
  // }
  // const handlePost = () => handleFetch('POST');
  // const handlePut = () => handleFetch('PUT');
  // const handleGet = () => handleFetch('GET');
  // const handleDelete = () => handleFetch('DELETE');
    return (
    <div className="App">
        <CreateEventPage/>
      {/*<div className="Board">*/}
      {/*  <input*/}
      {/*    className="EventName"*/}
      {/*    value={event.name}*/}
      {/*    onChange={handleChange('name')}*/}
      {/*  />*/}
      {/*  <br/>*/}
      {/*  <textarea*/}
      {/*    className="EventDescription"*/}
      {/*    value={event.description}*/}
      {/*    onChange={handleChange('description')}*/}
      {/*  /><br/>*/}
      {/*  <div className="EventTimeAndPlace">*/}
      {/*    <div className="EventTime">*/}
      {/*      <input*/}
      {/*        className="EventStartTime"*/}
      {/*        value={event.start}*/}
      {/*        onChange={handleChange('start')}*/}
      {/*      /><br/>*/}
      {/*      <input*/}
      {/*        className="EventEndTime"*/}
      {/*        value={event.end}*/}
      {/*        onChange={handleChange('end')}*/}
      {/*      /><br/>*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <input*/}
      {/*        className="EventId"*/}
      {/*        value={event.id}*/}
      {/*        onChange={handleChange('id')}*/}
      {/*      /><br/>*/}
      {/*      <input*/}
      {/*        className="EventPlace"*/}
      {/*        value={event.location}*/}
      {/*        onChange={handleChange('location')}*/}
      {/*      /><br/>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="Buttons">*/}
      {/*  <button className="NavButtons" onClick={handlePost}>Post event to server</button>*/}
      {/*  <button className="NavButtons" onClick={handlePut}>Put event to server</button>        */}
      {/*  <button className="NavButtons" onClick={handleGet}>Get event from the server</button>*/}
      {/*  <button className="NavButtons" onClick={handleDelete}>Delete event from the server</button>*/}
      {/*</div>*/}

    </div>
  );
}

export default App;
