import React, { useState, useEffect } from "react";
import { uid } from "uid";
//Components
import Form from "./components/Form";
import List from "./components/List/index.js";
import useLocalStorage from "use-local-storage";

//Styling
import "./App.css";

function App() {
  const [weather, setWeather] = useState();
  const initialActivities = [];
  const [activities, setActivities] = useLocalStorage(
    "activities",
    initialActivities
  );

  useEffect(() => {
    async function startFetching() {
      const response = await fetch(
        "https://example-apis.vercel.app/api/weather/europe"
      );
      const weatherData = await response.json();

      setWeather(weatherData.isGoodWeather);
    }

    startFetching();
  }, []);

  function handleAddActivity(newData) {
    setActivities([...activities, { ...newData, id: uid() }]);
  }

  const filteredActivities = activities.filter(
    (activity) => activity.isForGoodWeather === weather
  );

  return (
    <>
      <h1>Weather & Activities App ☀️🌧️</h1>
      <List activities={filteredActivities} isGoodWeather={weather} />
      <Form onAddActivity={handleAddActivity}></Form>
    </>
  );
}

export default App;
