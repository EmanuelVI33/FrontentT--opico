import { Button } from '@material-tailwind/react'
import { TextField } from '@mui/material'
import { useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import 'react-tabs/style/react-tabs.css' // Estilos de react-tabs
import { contentType } from './contentType'

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer'
}

export function VideoForm({ onAddContent }) {
  const titleRef = useRef('')
  const durationRef = useRef('')
  const [videoFile, setVideoFile] = useState(null)
  const [videoPreview, setVideoPreview] = useState('') // Estado para la vista previa del video

  const handleAddVideoContent = () => {
    const type = contentType.VIDEO

    const newContent = {
      type,
      title: titleRef.current.value,
      duration: durationRef.current.value,
      path: videoFile
    }

    onAddContent(newContent)
    setVideoFile(null)
    setVideoPreview('')
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'video/*',
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        setVideoFile(file)
        const videoPreviewUrl = URL.createObjectURL(file)
        setVideoPreview(videoPreviewUrl)
      }
    }
  })

  return (
    <div>
      <h2>Subir Video</h2>
      <form>
        <TextField
          id="standard-multiline-flexible"
          label="Título"
          multiline
          maxRows={4}
          variant="standard"
          className="my-4"
          fullWidth
          inputRef={titleRef}
        />

        <div className="my-5" {...getRootProps()} style={dropzoneStyle}>
          <input {...getInputProps()} />
          {videoPreview ? (
            <video
              controls
              width="100%"
              height="auto"
              src={videoPreview}
              alt="Vista previa del video"
            />
          ) : (
            <p>Arrastra un video aquí o haz clic para seleccionarlo</p>
          )}
        </div>

        <Button
          variant="contained"
          onClick={handleAddVideoContent}
          size="medium"
          className="text-center"
        >
          Agregar Contenido de Video
        </Button>
      </form>
    </div>
  )
}
