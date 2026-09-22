import { useAuth0 } from '@auth0/auth0-react'
import {
  ActionIcon,
  Alert,
  Button,
  Card,
  Center,
  Group,
  Loader,
  Popover,
  Table,
  Text,
  Title,
} from '@mantine/core'
import { IconAlertTriangle } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { getRounds, type Round } from './api'

function NotesCell({ notes }: { notes: string | null }) {
  if (!notes) {
    return null
  }

  return (
    <Popover width={260} withArrow shadow="md" position="bottom-end">
      <Popover.Target>
        <ActionIcon variant="subtle" color="yellow" aria-label="View notes">
          <IconAlertTriangle size={18} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="sm">{notes}</Text>
      </Popover.Dropdown>
    </Popover>
  )
}

export function RoundsTable() {
  const { getAccessTokenSilently } = useAuth0()
  const [rounds, setRounds] = useState<Round[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAccessTokenSilently()
      .then((token) => {
        if (!token) {
          throw new Error('No access token available')
        }
        return getRounds(token)
      })
      .then(setRounds)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false))
  }, [getAccessTokenSilently])

  return (
    <Card withBorder shadow="sm" radius="md" p="lg">
      <Title order={3} mb="md">
        Rounds
      </Title>

      {loading && (
        <Center py="xl">
          <Loader />
        </Center>
      )}

      {!loading && error && (
        <Alert color="red" variant="light" title="Couldn't load rounds">
          {error}
        </Alert>
      )}

      {!loading && !error && rounds.length === 0 && (
        <Text c="dimmed" ta="center" py="md">
          No rounds found.
        </Text>
      )}

      {!loading && !error && rounds.length > 0 && (
        <Table.ScrollContainer minWidth={640}>
          <Table verticalSpacing="sm" highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Round</Table.Th>
                <Table.Th>Dates</Table.Th>
                <Table.Th>Hosts</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rounds.map((round) => (
                <Table.Tr key={round.roundId}>
                  <Table.Td>
                    <Group gap="xs" wrap="nowrap">
                      <Text>{round.roundId}</Text>
                      <NotesCell notes={round.notes} />
                    </Group>
                  </Table.Td>
                  <Table.Td>{round.dates}</Table.Td>
                  <Table.Td>{round.hosts}</Table.Td>
                  <Table.Td>
                    <Group gap="xs" justify="flex-end" wrap="nowrap">
                      <Button size="xs" variant="light">
                        View Rosters
                      </Button>
                      <Button size="xs">Submit Roster</Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      )}
    </Card>
  )
}
