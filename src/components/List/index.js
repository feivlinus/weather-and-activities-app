export default function List({ activities, isGoodWeather, onDeleteActivity }) {
  return (
    <>
      <h2>
        {isGoodWeather
          ? "The weather is awesome! Go outside and: "
          : "Bad weather outside! Here's what you can do now: "}
      </h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.name}>
            {activity.name}{" "}
            <i
              className="fa-regular fa-circle-xmark"
              onClick={() => onDeleteActivity(activity.id)}
            ></i>
          </li>
        ))}
      </ul>
    </>
  );
}
