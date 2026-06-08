import { useApiCollection } from '../api'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

export default function Teams() {
  const { endpoint, error, items, loading } = useApiCollection(teamsEndpoint)

  return (
    <section className="resource-view">
      <div className="resource-heading">
        <div>
          <p className="eyebrow">Team management</p>
          <h2>Teams</h2>
        </div>
        <code>{endpoint}</code>
      </div>
      {loading && <p className="status-message">Loading teams...</p>}
      {error && <p className="alert alert-warning">{error}</p>}
      <div className="resource-grid">
        {items.map((team) => (
          <article className="resource-card" key={team._id || team.name}>
            <h3>{team.name}</h3>
            <p>{team.mascot}</p>
            <dl>
              <div>
                <dt>Members</dt>
                <dd>{team.members}</dd>
              </div>
              <div>
                <dt>Weekly goal</dt>
                <dd>{team.weeklyGoalMinutes} min</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}
