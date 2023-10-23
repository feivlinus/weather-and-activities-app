export default function List({ activities }) {
  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity.name}>{activity.name}</li>
      ))}
    </ul>
  );
}
