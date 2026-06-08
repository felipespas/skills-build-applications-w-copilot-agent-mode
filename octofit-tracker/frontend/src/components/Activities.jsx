const codespaceName = import.meta.env.CODESPACE_NAME

const activitiesEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities'

export default function Activities() {
  return (
    <section>
      <h2>Activities</h2>
      <p>API endpoint: {activitiesEndpoint}</p>
    </section>
  )
}
