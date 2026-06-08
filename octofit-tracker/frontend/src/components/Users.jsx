const codespaceName = import.meta.env.CODESPACE_NAME

const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users'

export default function Users() {
  return (
    <section>
      <h2>Users</h2>
      <p>API endpoint: {usersEndpoint}</p>
    </section>
  )
}
