import React, { useState } from "react";
import { uid } from "uid";
//Components
import Form from "./components/Form";
import List from "./components/List/index.js";
import useLocalStorage from "use-local-storage";

//Styling
import "./App.css";

function App() {
  const isGoodWeather = false;
  const initialActivities = [];
  const [activities, setActivities] = useLocalStorage(
    "activities",
    initialActivities
  );

  function handleAddActivity(newData) {
    setActivities([...activities, { ...newData, id: uid() }]);
  }

  const filteredActivities = activities.filter(
    (activity) => activity.isForGoodWeather === isGoodWeather
  );

  return (
    <>
      <h1>Weather & Activities App ☀️🌧️</h1>
      <List activities={filteredActivities} isGoodWeather={isGoodWeather} />
      <Form onAddActivity={handleAddActivity}></Form>
    </>
  );
}

export default App;
