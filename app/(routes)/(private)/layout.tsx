'use client'

import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { styled } from '@mui/material/styles'
import { Header } from '@/presentation/components/Header'
import Sidebar, { DrawerHeader } from '@/presentation/components/SideBar'
import { useSidebar } from '@/presentation/components/SideBar/hooks/useSidebar'
import MeRouteGuard from '@/presentation/routing/MeRouteGuard'
import { TweetContextProvider } from '@/useCase/context/TweetContext'
const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar()

  return (
    <MeRouteGuard>
      <TweetContextProvider>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Header
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Main open={isSidebarOpen}>
            <DrawerHeader />
            {children}
          </Main>
        </Box>
      </TweetContextProvider>
    </MeRouteGuard>
  )
}
