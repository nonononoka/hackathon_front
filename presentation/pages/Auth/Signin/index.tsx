'use client'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { fireAuth } from '@/lib/auth/firebase'
import { createTheme } from '@mui/material'
import { Box, Typography, Paper, Button, Container, ThemeProvider, Divider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Blue color
    },
  },
});

export const SignInPage = () => {
  const router = useRouter()

  const handleSignIn = (): void => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(fireAuth, provider)
      .then(res => {
        const user = res.user;
        console.log("ログインユーザー: " + user.displayName);
        router.push('/home')
      })
      .catch(err => {
        const errorMessage = err.message;
        alert(errorMessage);
      });
  }

  return (
    // <ThemeProvider theme={theme}> {/* Apply the custom theme */}
    //   <Container maxWidth="xs">
    //       <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 5, gap: 2, justifyContent: 'center' }}>
    //         <Typography variant="h4" align="center" fontWeight="bold">
    //           こんにちは
    //         </Typography>
    //         <Typography variant="subtitle1" align="center" color="textSecondary">
    //           Tech Tweetへようこそ
    //         </Typography>
    //       </Box>
    //       <Divider />
    //       <Box width="100%">
    //         <Button
    //           onClick={handleSignIn}
    //           variant="contained"
    //           fullWidth
    //           sx={{ bgcolor: '#4285F4', color: 'white', '&:hover': { bgcolor: '#3c78e6' }, mt: 4 }} // Increased margin-top for spacing
    //         >
    //           Sign in with Google
    //         </Button>
    //       </Box>
    //   </Container>
    // </ThemeProvider >
    <ThemeProvider theme={theme}> {/* Apply the custom theme */}
      <Container maxWidth="xs">
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            minHeight: '100vh',
            justifyContent: 'center',
          }}
        >
          <Paper elevation={3} sx={{ p: 8, width: '100%' }}>
            <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
              Hello
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
              Welcome to Tech Tweet!
            </Typography>
            <Divider />
            <Button
              onClick={handleSignIn}
              variant="contained"
              fullWidth
              sx={{ bgcolor: '#4285F4', color: 'white', '&:hover': { bgcolor: '#3c78e6' }, mt: 4 }}
            >
              Sign in with Google
            </Button>
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
