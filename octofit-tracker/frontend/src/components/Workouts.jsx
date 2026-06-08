import { useApiCollection } from '../api'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

export default function Workouts() {
  const { endpoint, error, items, loading } = useApiCollection(workoutsEndpoint)

  return (
    <section className="resource-view">
      <div className="resource-heading">
        <div>
          <p className="eyebrow">Suggestions</p>
          <h2>Workouts</h2>
        </div>
        <code>{endpoint}</code>
      </div>
      {loading && <p className="status-message">Loading workouts...</p>}
      {error && <p className="alert alert-warning">{error}</p>}
      <div className="resource-grid">
        {items.map((workout) => (
          <article className="resource-card" key={workout._id || workout.name}>
            <h3>{workout.name}</h3>
            <p>{workout.focusArea}</p>
            <dl>
              <div>
                <dt>Level</dt>
                <dd>{workout.level}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{workout.durationMinutes} min</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}
