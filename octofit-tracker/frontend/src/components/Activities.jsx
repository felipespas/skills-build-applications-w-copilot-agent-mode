import { useApiCollection } from '../api'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

export default function Activities() {
  const { endpoint, error, items, loading } = useApiCollection(activitiesEndpoint)

  return (
    <section className="resource-view">
      <div className="resource-heading">
        <div>
          <p className="eyebrow">Activity logging</p>
          <h2>Activities</h2>
        </div>
        <code>{endpoint}</code>
      </div>
      {loading && <p className="status-message">Loading activities...</p>}
      {error && <p className="alert alert-warning">{error}</p>}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>User</th>
              <th>Activity</th>
              <th>Minutes</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {items.map((activity) => (
              <tr key={activity._id || `${activity.username}-${activity.date}`}>
                <td>{activity.username}</td>
                <td>{activity.activityType || activity.activity}</td>
                <td>{activity.durationMinutes}</td>
                <td>{activity.caloriesBurned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
