import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
const audience = import.meta.env.VITE_AUTH0_AUDIENCE

const theme = createTheme({
  primaryColor: 'violet',
  defaultRadius: 'md',
  fontFamily: 'system-ui, "Segoe UI", Roboto, sans-serif',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin + import.meta.env.BASE_URL,
          audience,
        }}
      >
        <App />
      </Auth0Provider>
    </MantineProvider>
  </StrictMode>,
)
