import React, { useState } from "react";
import { uid } from "uid";
//Components
import Form from "./components/Form";

//Styling
import "./App.css";

function App() {
	const initialActivities = [];
	const [activities, setActivities] = useState(initialActivities);

	function handleAddActivity(newData) {
		setActivities([...activities, { ...newData, id: uid() }]);
	}

	return (
		<>
			<h1>Weather & Activities App ☀️🌧️</h1>
			<Form onAddActivity={handleAddActivity}></Form>
		</>
	);
}

export default App;
