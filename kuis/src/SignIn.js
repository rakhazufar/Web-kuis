import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Kuis from './Kuis';
import axios from 'axios';
import { ClassNames } from '@emotion/react';

const theme = createTheme();

export default function SignIn() {
  const [user, setUser] = React.useState(null)
  const [error, setError] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        username: data.get('username'),
        password: data.get('password'),
      })
      setUser(res.data)
      window.localStorage.setItem('USER_WEB_KUIS', JSON.stringify(res.data))
    } catch(err) {
      setError(true)
      console.log(err)
    }
  };

  React.useEffect(()=>{
    const dataUser = window.localStorage.getItem('USER_WEB_KUIS')
    setUser(JSON.parse(dataUser))
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
        border={2}
        padding={5}
        borderRadius={5}
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {user? (
            <Typography component="h1" variant="h5" fontSize={30} marginBottom={3}>
            Welcome, {user.username}
          </Typography>
          ) : (
            <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          )
          }
         {user ?
         (<Kuis></Kuis>)
         : 
         (
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {error && <Typography color="red">Username atau password salah!</Typography>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
         )}
          
        </Box>
      </Container>
    </ThemeProvider>
  );
}