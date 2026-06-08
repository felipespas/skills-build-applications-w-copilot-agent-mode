import { useApiCollection } from '../api'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

export default function Leaderboard() {
  const { endpoint, error, items, loading } = useApiCollection(leaderboardEndpoint)

  return (
    <section className="resource-view">
      <div className="resource-heading">
        <div>
          <p className="eyebrow">Competition</p>
          <h2>Leaderboard</h2>
        </div>
        <code>{endpoint}</code>
      </div>
      {loading && <p className="status-message">Loading leaderboard...</p>}
      {error && <p className="alert alert-warning">{error}</p>}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Points</th>
              <th>Streak</th>
            </tr>
          </thead>
          <tbody>
            {items.map((entry) => (
              <tr key={entry._id || entry.rank}>
                <td>{entry.rank}</td>
                <td>{entry.username}</td>
                <td>{entry.points}</td>
                <td>{entry.streakDays} days</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
