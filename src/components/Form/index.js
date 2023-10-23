import "./Form.css";

export default function Form({ onAddActivity }) {
	function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);

		const activityName = data.activityNameInput;
		const isForGoodWeather = data.weatherCheckbox ? true : false;

		onAddActivity({
			name: activityName,
			isForGoodWeather: isForGoodWeather,
		});

		event.target.reset();
		event.target.elements.activityNameInput.focus();
	}

	return (
		<>
			<h2>Add new Activity:</h2>
			<form className="form" onSubmit={handleSubmit}>
				{/* for="nameInput" ist der Bezug zu dem Input (Barrierefreiheit)   */}
				<fieldset>
					<fieldset className="form--fieldset">
						<label
							className="nameInput"
							htmlFor="activityNameInput"
						>
							Name:
						</label>
						<input
							id="activityNameInput"
							type="text"
							name="activityNameInput"
							required
						/>
					</fieldset>
					<fieldset className="form--fieldset">
						<label
							className="weather--checkbox"
							htmlFor="weatherCheckbox"
						>
							Good-weather activity:
						</label>
						<input
							id="weatherCheckbox"
							name="weatherCheckbox"
							type="checkbox"
						/>
					</fieldset>
					<button type="submit" className="form--submit">
						Submit
					</button>
				</fieldset>
			</form>
		</>
	);
}
