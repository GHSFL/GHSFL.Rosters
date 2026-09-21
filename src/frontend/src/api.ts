const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

export interface NewUser {
  userId: string
  userName: string
  emailAddress: string
  clubId: number
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
