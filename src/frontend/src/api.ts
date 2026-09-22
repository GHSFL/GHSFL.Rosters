const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

if (!apiBaseUrl) {
  // Fails loudly instead of falling back to relative paths, which would
  // silently resolve against whatever origin the app happens to be served
  // from (e.g. GitHub Pages) rather than the actual API.
  throw new Error('VITE_API_BASE_URL is not set')
}

export interface NewUser {
  userId: string
  userName: string
  emailAddress: string
  clubId: number
}

export interface Club {
  clubId: number
  clubName: string
}

export interface Round {
  roundId: string
  dates: string
  hosts: string
  notes: string | null
}

export async function createUser(token: string, user: NewUser): Promise<void> {
  const response = await fetch(`${apiBaseUrl}/api/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })

  if (!response.ok) {
    throw new Error(`CreateUser failed (${response.status}): ${await response.text()}`)
  }
}

export async function getClubs(): Promise<Club[]> {
  const response = await fetch(`${apiBaseUrl}/api/info/clubs`)

  if (!response.ok) {
    throw new Error(`GetClubs failed (${response.status}): ${await response.text()}`)
  }

  return response.json()
}

export async function getRounds(token: string): Promise<Round[]> {
  const response = await fetch(`${apiBaseUrl}/api/info/rounds`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error(`GetRounds failed (${response.status}): ${await response.text()}`)
  }

  return response.json()
}
