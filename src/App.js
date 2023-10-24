import React, { useState, useEffect } from "react";
import { uid } from "uid";
//Components
import Form from "./components/Form";
import List from "./components/List/index.js";
import useLocalStorage from "use-local-storage";

//Styling
import "./App.css";

function App() {
	const initialActivities = [];

	/*
        Wetter-Status Wert
    */
	const [weather, setWeather] = useState();

	/*
        Local Storage State - Ablage der Aktivitäten
    */
	const [activities, setActivities] = useLocalStorage(
		"activities",
		initialActivities
	);

	/*
        Fetch bzw. Api Anfrage um den Wetter-Status (good OR bad) zu holen
        und zu setzen (weather)

        Mit Bonus Interval setzen (https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks)
    */
	useEffect(() => {
		const interval = setInterval(() => {
			async function startFetching() {
				const response = await fetch(
					"https://example-apis.vercel.app/api/weather/europe"
				);
				const weatherData = await response.json();

				setWeather(weatherData.isGoodWeather);
			}

			startFetching();
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	/*
        Um neue Aktivitäten hinzuzufügen 
        jeder neue Eintrag erhält eine uid und wird an die vorhandene "Liste"
        "angehängt"
     */
	function handleAddActivity(newData) {
		setActivities([...activities, { ...newData, id: uid() }]);
	}

	/*
        Aktivitätslöschfunktion die an dem X Button ausgeführt wird bei einem Click
    */
	function handleDeleteActivity(activityId) {
		const newActivities = activities.filter(
			(activity) => activity.id !== activityId
		);
		setActivities(newActivities);
	}

	/*
        Gefilterte Aktivitäten-Liste entsprechend des Wetter-Status (good, bad)
    */
	const filteredActivities = activities.filter(
		(activity) => activity.isForGoodWeather === weather
	);

	return (
		<>
			<h1>Weather & Activities App ☀️🌧️</h1>
			<List
				activities={filteredActivities}
				isGoodWeather={weather}
				onDeleteActivity={handleDeleteActivity}
			/>
			<Form onAddActivity={handleAddActivity}></Form>
		</>
	);
}

export default App;
