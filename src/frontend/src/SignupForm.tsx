import { useAuth0 } from '@auth0/auth0-react'
import { useState, type FormEvent } from 'react'
import { signupWithAuth0 } from './auth0Signup'

export const PENDING_SIGNUP_KEY = 'ghsfl.pendingSignup'

export interface PendingSignup {
  userName: string
  clubId: number
}

interface SignupFormProps {
  onCancel: () => void
}

export function SignupForm({ onCancel }: SignupFormProps) {
  const { loginWithRedirect } = useAuth0()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [clubId, setClubId] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      await signupWithAuth0(email, password)

      const pending: PendingSignup = { userName, clubId: Number(clubId) }
      localStorage.setItem(PENDING_SIGNUP_KEY, JSON.stringify(pending))

      // Signup only creates the Auth0 account; redirect through the normal
      // login flow to actually establish a session and get tokens.
      await loginWithRedirect({ authorizationParams: { login_hint: email } })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}

      <label>
        Email
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Password
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <label>
        Display Name
        <input
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>

      <label>
        Club ID
        <input
          type="number"
          required
          value={clubId}
          onChange={(e) => setClubId(e.target.value)}
        />
      </label>

      <div className="signup-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? 'Signing up...' : 'Sign Up'}
        </button>
        <button type="button" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
      </div>
    </form>
  )
}
