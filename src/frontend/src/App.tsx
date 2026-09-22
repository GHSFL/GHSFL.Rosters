import { useAuth0 } from '@auth0/auth0-react'
import {
  Alert,
  Anchor,
  Button,
  Card,
  Center,
  Container,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { useEffect, useRef, useState } from 'react'
import { createUser } from './api'
import { RoundsTable } from './RoundsTable'
import { PENDING_SIGNUP_KEY, SignupForm, type PendingSignup } from './SignupForm'

function LoginButton() {
  const { loginWithRedirect } = useAuth0()
  return (
    <Button type="button" onClick={() => loginWithRedirect()}>
      Log In
    </Button>
  )
}

function LogoutButton() {
  const { logout } = useAuth0()
  return (
    <Button
      type="button"
      variant="default"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin + import.meta.env.BASE_URL } })
      }
    >
      Log Out
    </Button>
  )
}

function Profile() {
  const { user } = useAuth0()

  return <Text>Logged in as {user?.name ?? user?.email ?? user?.sub}</Text>
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
    return (
      <Center mih="100svh">
        <Loader />
      </Center>
    )
  }

  if (error) {
    return (
      <Container size="xs" py="xl">
        <Alert color="red" variant="light" title="Auth error">
          {error.message}
        </Alert>
      </Container>
    )
  }

  return (
    <Container size={isAuthenticated ? 'md' : 'xs'} py="xl">
      {isAuthenticated ? (
        <Stack gap="lg">
          <Group justify="space-between" align="center">
            <Title order={1}>GHSFL Rosters</Title>
            <LogoutButton />
          </Group>

          <Card withBorder shadow="sm" radius="md" p="lg">
            <Stack gap="md">
              {pendingSignup.status === 'creating' && (
                <Text c="dimmed">Setting up your account...</Text>
              )}
              {pendingSignup.status === 'error' && (
                <Alert color="red" variant="light">
                  Couldn't finish setting up your account: {pendingSignup.error}
                </Alert>
              )}
              <Profile />
            </Stack>
          </Card>

          <RoundsTable />
        </Stack>
      ) : (
        <>
          <Title order={1} ta="center" mb="xl">
            GHSFL Rosters
          </Title>

          {mode === 'signup' ? (
            <Card withBorder shadow="sm" radius="md" p="lg">
              <SignupForm onCancel={() => setMode('login')} />
            </Card>
          ) : (
            <Card withBorder shadow="sm" radius="md" p="lg">
              <Stack gap="md" align="center">
                <LoginButton />
                <Text size="sm">
                  Need an account?{' '}
                  <Anchor component="button" type="button" onClick={() => setMode('signup')}>
                    Sign up
                  </Anchor>
                </Text>
              </Stack>
            </Card>
          )}
        </>
      )}
    </Container>
  )
}

export default App
