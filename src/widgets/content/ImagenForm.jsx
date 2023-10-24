import { Button } from '@material-tailwind/react'
import { TextField } from '@mui/material'
import { createRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { contentType } from './contentType'

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer'
}

export function ImageForm({ onAddContent }) {
  const titleRef = createRef()
  const durationRef = createRef()
  const [imageUrl, setImageUrl] = useState('')
  const [droppedFiles, setDroppedFiles] = useState([])
  const [imagePreview, setImagePreview] = useState(null) // Estado para la vista previa de la imagen

  const handleAddImageContent = () => {
    const type = contentType.IMAGEN

    const newContent = {
      type,
      title: titleRef.current.value,
      duration: durationRef.current.value,
      path: imageUrl
    }

    onAddContent(newContent)

    titleRef.current.value = null
    durationRef.current.value = null
    setImageUrl('')
    setImagePreview(null)
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setDroppedFiles(acceptedFiles)

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        const imageUrl = URL.createObjectURL(file)
        setImageUrl(imageUrl)
      }
    }
  })

  return (
    <div>
      <h2 className="mb-2">Subir Imagen</h2>
      <form>
        <TextField
          id="standard-multiline-flexible"
          label="Título"
          multiline
          maxRows={4}
          variant="standard"
          className="my-4"
          fullWidth
          // value={titleRef.current.value}
          inputRef={titleRef}
        />

        <TextField
          id="standard-multiline-flexible"
          label="Duración"
          multiline
          maxRows={4}
          variant="standard"
          className="mb-4"
          fullWidth
          inputRef={durationRef}
        />

        <div className="my-5" {...getRootProps()} style={dropzoneStyle}>
          <input {...getInputProps()} />
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Vista previa de la imagen"
              style={{ maxWidth: '100%', maxHeight: '200px' }}
            />
          ) : (
            <p>Arrastra una imagen aquí o haz clic para seleccionarla</p>
          )}
        </div>

        <Button
          variant="contained"
          onClick={handleAddImageContent}
          size="medium"
          className="text-center"
        >
          Agregar Contenido
        </Button>
      </form>
    </div>
  )
}
