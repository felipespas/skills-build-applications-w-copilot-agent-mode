const codespaceName = import.meta.env.CODESPACE_NAME

const leaderboardEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard'

export default function Leaderboard() {
  return (
    <section>
      <h2>Leaderboard</h2>
      <p>API endpoint: {leaderboardEndpoint}</p>
    </section>
  )
}
