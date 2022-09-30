import { SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, Input, TextField, Typography,  } from "@mui/material"
import { useRef } from "react"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from "../../hooks/useForm"
import { setActiveNote } from "../../store/journal/journalSlice"
import { StartSaveNote, startUploadingFiles } from "../../store/journal/thunk"
import { ImageGallery } from "../components"

export const NoteView = () => {

    const { active:note, messageSaved, isSaving }  = useSelector(state => state.journal);
    const { body, title, date, onInputChange, formState }  = useForm( note );
    const dispatch = useDispatch();

    const dateString = useMemo(() =>{
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [date]);

    const fileInputRef = useRef()

    useEffect(() => {
        dispatch( setActiveNote(formState) )
    }, [formState]);

    useEffect(() => {
        if (messageSaved.length > 0){
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }
      
    }, [messageSaved])

    const onSaveNote = () =>{
        dispatch(StartSaveNote())
    };

    const onFileInputChange = ({target}) =>{
        if( target.files === 0) return;
        dispatch( startUploadingFiles( target.files ) );
    }
    



  return (
    <Grid 
        className='animate__animated animate__fadeIn animate__faster'    
        container 
        direction='row' 
        justifyContent='space-between'
        alignItems='center' 
        sx={{ mb: 1 }}
        >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
        </Grid>
        <Grid item>

            <input
            type='file'
            multiple
            ref={ fileInputRef }
            onChange={onFileInputChange}
            style={{display: 'none'}}
            />
            <IconButton 
                color="primary"
                disabled={isSaving}
                onClick={ () => fileInputRef.current.click() }
                >
                <UploadOutlined/>
            </IconButton>

            <Button
                disabled={isSaving}
                onClick={ onSaveNote } 
                color="primary" 
                sx={{ padding: 2 }}
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb:1 }}
                name="title"
                value={title}
                onChange={onInputChange}
                />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                label="Título"
                minRows={ 5 }
                name="body"
                value={ body }
                onChange={onInputChange}
                />
        </Grid>

        <ImageGallery
        images = {note.imageUrls}
        />


    </Grid>
  )
}
