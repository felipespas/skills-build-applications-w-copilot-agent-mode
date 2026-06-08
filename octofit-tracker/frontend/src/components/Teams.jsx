const codespaceName = import.meta.env.CODESPACE_NAME

const teamsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams'

export default function Teams() {
  return (
    <section>
      <h2>Teams</h2>
      <p>API endpoint: {teamsEndpoint}</p>
    </section>
  )
}
