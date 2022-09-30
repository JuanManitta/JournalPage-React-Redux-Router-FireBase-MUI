import { Link as RouterLink} from 'react-router-dom'

import { Google } from "@mui/icons-material"
import { Button, Grid, TextField, Typography, Link, Alert } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth)

  const isAuthenticating = useMemo( () => status === 'checking', [status])
  

  const dispatch = useDispatch()
  const { email, password, onInputChange, formState} = useForm(formData);

  const onSubmit = ( event ) =>{
    event.preventDefault();

    dispatch(startLoginWithEmailPassword({email, password}))
    
  };

  const onGoogleSignIn = () =>{

    dispatch(startGoogleSignIn())
    
  }


  return (
    <AuthLayout title='Login'>

          <form onSubmit={onSubmit} 
          className='animate__animated animate__fadeIn animate__faster'>
            <Grid container>
              <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField 
                label="Correo" 
                type="email" 
                placeholder="correo@google.com"
                fullWidth
                name='email'
                value={email}
                onChange={onInputChange}
                />
              </Grid>

              <Grid item xs={ 12 } sx= {{ mt: 2 }}>
                <TextField 
                label="Contraseña" 
                type="password" 
                placeholder="contraseña"
                fullWidth
                name='password'
                value={password}
                onChange={onInputChange}
                />
              </Grid>
              <Grid container spacing={ 2 } sx={{ mb:2, mt:1  }}>

                <Grid 
                display={!!errorMessage ? '': 'none' }
                item xs={12} sm={12} >

                  <Alert severity='error'>{errorMessage}</Alert>
                  
                </Grid>
                <Grid item xs={12} sm={6} >
                  <Button 
                  disabled={ isAuthenticating } 
                  variant="contained" 
                  fullWidth
                  type='submit'>
                    Login
                  </Button>
                </Grid>

                <Grid item xs={12} sm={6} >
                  <Button
                  disabled={ isAuthenticating } 
                  variant="contained" 
                  fullWidth
                  onClick={onGoogleSignIn}>
                    <Google/>
                    <Typography sx={{ ml: 1 }}> Google </Typography>
                    
                  </Button>
                </Grid>

              </Grid>

              <Grid container direction='row' justifyContent='end'>
                <Link component={ RouterLink } color='inherit' to="/auth/register">
                  Crear una cuenta
                </Link>
              </Grid>

            </Grid>
          </form>
    </AuthLayout>
    )
}
