import { useApiCollection } from '../api'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

export default function Users() {
  const { endpoint, error, items, loading } = useApiCollection(usersEndpoint)

  return (
    <section className="resource-view">
      <div className="resource-heading">
        <div>
          <p className="eyebrow">Profiles</p>
          <h2>Users</h2>
        </div>
        <code>{endpoint}</code>
      </div>
      {loading && <p className="status-message">Loading users...</p>}
      {error && <p className="alert alert-warning">{error}</p>}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {items.map((user) => (
              <tr key={user._id || user.username}>
                <td>{user.username}</td>
                <td>{user.displayName}</td>
                <td>{user.email}</td>
                <td>{user.team}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
