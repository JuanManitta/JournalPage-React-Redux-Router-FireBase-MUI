import { Link as RouterLink} from 'react-router-dom'

import { Button, Grid, TextField, Typography, Link, Alert } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWhiteEmailPassword } from '../../store/auth/thunks';
import { useMemo } from 'react';

const formData ={
  email: '',
  password: '',
  displayName: ''
};
const formValidations = {
  email: [ (value) => value.includes('@'), 'El email no es valido'],
  password: [ (value) => value.length >= 6, 'El password debe tener 6 o mas caracteres'],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio'],
};

export const RegisterPage = () => {

  const dispatch = useDispatch()
  const [formSubmitted, setFormSubmitted] = useState(false)

  const { status, errorMessage} = useSelector( state => state.auth)
  const isChekingAuthentication = useMemo( () => status === 'checking', [status])


  const {
    displayName, email, password, onInputChange, formState,
    isFormValid, emailValid, passwordValid, displayNameValid
  } = useForm(formData, formValidations);


  const onSubmit = (event) =>{
    setFormSubmitted(true)
    event.preventDefault()

    if (!isFormValid) return;

    dispatch( startCreatingUserWhiteEmailPassword (formState ) )
  }

  return (
    <AuthLayout title='Crear cuenta'>

          <form onSubmit={onSubmit} 
          className='animate__animated animate__fadeIn animate__faster'>
            <Grid container>

              <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField
                name='displayName'
                value={displayName}
                onChange={onInputChange} 
                label="Nombre completo" 
                type="text" 
                placeholder="Nombre Apellido"
                fullWidth
                error={ !!displayNameValid && formSubmitted }
                helperText={ formSubmitted ? displayNameValid : '' }
                />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt: 2}}>
                <TextField
                name='email'
                value={email}
                onChange={onInputChange}  
                label="Correo" 
                type="email" 
                placeholder="correo@google.com"
                fullWidth
                error={ !!emailValid && formSubmitted }
                helperText={ formSubmitted ? emailValid : '' }
                />
              </Grid>

              <Grid item xs={ 12 } sx= {{ mt: 2 }}>
                <TextField
                name='password'
                value={password}
                onChange={onInputChange}  
                label="Contraseña" 
                type="password" 
                placeholder="contraseña"
                fullWidth
                error={ !!passwordValid && formSubmitted }
                helperText={ formSubmitted ? passwordValid : '' }
                />
              </Grid>
              <Grid container spacing={ 2 } sx={{ mb:2, mt:1  }}>

                <Grid 
                item 
                xs={12} 
                display={!!errorMessage ? '': 'none' }
                >
                 <Alert severity='error'>{ errorMessage }</Alert>
                </Grid>

                <Grid item xs={12} >
                  <Button
                  disabled={ isChekingAuthentication }
                  type='submit' 
                  variant="contained" 
                  fullWidth>
                    Crear cuenta
                  </Button>
                </Grid>
              </Grid>

              <Grid container direction='row' justifyContent='end'>
                <Typography sx={{ mr:1 }}>¿Ya tienes cuenta?</Typography>
                <Link component={ RouterLink } color='inherit' to="/auth/login">
                  Ingresar
                </Link>
              </Grid>

            </Grid>
          </form>
    </AuthLayout>
    )
}
