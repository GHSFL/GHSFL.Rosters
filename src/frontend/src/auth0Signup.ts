const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const connection = import.meta.env.VITE_AUTH0_DB_CONNECTION

interface Auth0SignupError {
  code?: string
  description?: string
  message?: string
}

// Creates the user in Auth0's database connection via the Authentication API.
// This does not log the user in or return tokens — call loginWithRedirect()
// afterward to actually establish a session.
export async function signupWithAuth0(email: string, password: string): Promise<void> {
  const response = await fetch(`https://${domain}/dbconnections/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: clientId, email, password, connection }),
  })

  if (!response.ok) {
    const body: Auth0SignupError = await response.json().catch(() => ({}))
    throw new Error(body.description ?? body.message ?? `Signup failed (${response.status})`)
  }
}
