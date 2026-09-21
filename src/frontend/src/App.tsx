import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useRef, useState } from 'react'
import './App.css'
import { createUser } from './api'
import { PENDING_SIGNUP_KEY, SignupForm, type PendingSignup } from './SignupForm'

function LoginButton() {
  const { loginWithRedirect } = useAuth0()
  return (
    <button type="button" onClick={() => loginWithRedirect()}>
      Log In
    </button>
  )
}

function LogoutButton() {
  const { logout } = useAuth0()
  return (
    <button
      type="button"
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
    >
      Log Out
    </button>
  )
}

function Profile() {
  const { user, getAccessTokenSilently } = useAuth0()
  const [token, setToken] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAccessTokenSilently()
      .then((t) => setToken(t ?? null))
      .catch((e: Error) => setError(e.message))
  }, [getAccessTokenSilently])

  return (
    <div>
      <p>Logged in as {user?.name ?? user?.email ?? user?.sub}</p>

      <h2>Access Token (JWT)</h2>
      {error && <p className="error">{error}</p>}
      <textarea readOnly value={token ?? 'Loading...'} rows={12} className="token-box" />
    </div>
  )
}

type PendingSignupStatus = 'idle' | 'creating' | 'done' | 'error'

// Bridges the pending signup fields (display name, club id) across the
// Auth0 redirect, then creates the corresponding row in our own DB exactly
// once after the user comes back authenticated.
function usePendingSignup() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const [status, setStatus] = useState<PendingSignupStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const ranRef = useRef(false)

  useEffect(() => {
    const pendingJson = localStorage.getItem(PENDING_SIGNUP_KEY)
    if (!isAuthenticated || !user?.sub || !pendingJson || ranRef.current) {
      return
    }
    ranRef.current = true

    const pending = JSON.parse(pendingJson) as PendingSignup

    setStatus('creating')
    getAccessTokenSilently()
      .then((token) => {
        if (!token) {
          throw new Error('No access token available')
        }
        return createUser(token, {
          userId: user.sub!,
          userName: pending.userName,
          emailAddress: user.email ?? '',
          clubId: pending.clubId,
        })
      })
      .then(() => {
        localStorage.removeItem(PENDING_SIGNUP_KEY)
        setStatus('done')
      })
      .catch((e: Error) => {
        setError(e.message)
        setStatus('error')
      })
  }, [isAuthenticated, user, getAccessTokenSilently])

  return { status, error }
}

function App() {
  const { isLoading, isAuthenticated, error } = useAuth0()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const pendingSignup = usePendingSignup()

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p className="error">Auth error: {error.message}</p>
  }

  return (
    <main className="app">
      <h1>GHSFL Rosters</h1>
      {isAuthenticated ? (
        <>
          {pendingSignup.status === 'creating' && <p>Setting up your account...</p>}
          {pendingSignup.status === 'error' && (
            <p className="error">
              Couldn't finish setting up your account: {pendingSignup.error}
            </p>
          )}
          <LogoutButton />
          <Profile />
        </>
      ) : mode === 'signup' ? (
        <SignupForm onCancel={() => setMode('login')} />
      ) : (
        <>
          <LoginButton />
          <p>
            <button type="button" className="link-button" onClick={() => setMode('signup')}>
              Need an account? Sign up
            </button>
          </p>
        </>
      )}
    </main>
  )
}

export default App
