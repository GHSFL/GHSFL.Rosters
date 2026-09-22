import { useAuth0 } from '@auth0/auth0-react'
import {
  Alert,
  Button,
  Group,
  PasswordInput,
  Select,
  Stack,
  TextInput,
  Title,
} from '@mantine/core'
import { useEffect, useState, type FormEvent } from 'react'
import { signupWithAuth0 } from './auth0Signup'
import { getClubs, type Club } from './api'

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
  const [clubId, setClubId] = useState<string | null>(null)
  const [clubs, setClubs] = useState<Club[]>([])
  const [clubsError, setClubsError] = useState<string | null>(null)
  const [clubsLoading, setClubsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    getClubs()
      .then(setClubs)
      .catch((e: Error) => setClubsError(e.message))
      .finally(() => setClubsLoading(false))
  }, [])

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
    <form onSubmit={handleSubmit}>
      <Stack gap="sm" maw={360} mx="auto">
        <Title order={2}>Sign Up</Title>
        {error && (
          <Alert color="red" variant="light">
            {error}
          </Alert>
        )}

        <TextInput
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />

        <PasswordInput
          label="Password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />

        <TextInput
          label="Display Name"
          required
          value={userName}
          onChange={(e) => setUserName(e.currentTarget.value)}
        />

        <Select
          label="Club"
          placeholder={clubsLoading ? 'Loading clubs...' : 'Select your club'}
          required
          searchable
          disabled={clubsLoading || !!clubsError}
          data={clubs.map((c) => ({ value: String(c.clubId), label: c.clubName }))}
          value={clubId}
          onChange={setClubId}
          error={clubsError && "Couldn't load clubs"}
        />

        <Group grow mt="sm">
          <Button type="submit" loading={submitting} disabled={clubsLoading}>
            Sign Up
          </Button>
          <Button type="button" variant="default" onClick={onCancel} disabled={submitting}>
            Cancel
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
