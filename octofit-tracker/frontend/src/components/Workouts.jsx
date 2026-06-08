const codespaceName = import.meta.env.CODESPACE_NAME

const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts'

export default function Workouts() {
  return (
    <section>
      <h2>Workouts</h2>
      <p>API endpoint: {workoutsEndpoint}</p>
    </section>
  )
}
