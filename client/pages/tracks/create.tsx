import FileUpload from '@/components/FileUpload'
import StepWrapper from '@/components/StepWrapper'
import { useInput } from '@/hooks/useInput'
import MainLayout from '@/layouts/MainLayout'
import { Button, TextField, Box } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from '../../styles/CreatePage.module.scss'

const Create = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [picture, setPicture] = useState(null)
  const [audio, setAudio] = useState<File | null>(null)
  const name = useInput('')
  const artist = useInput('')
  const text = useInput('')
  const router = useRouter()

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep(prev => prev + 1)
    } else {
      const formData = new FormData()
      formData.append('name', name.value)
      formData.append('text', text.value)
      formData.append('artist', artist.value)
      formData.append('picture', picture)
      formData.append('audio', audio)
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tracks`, formData)
        .then(resp => router.push('/tracks'))
        .catch(e => console.log(e))
    }
  }

  const back = () => {
    setActiveStep(prev => prev - 1)
  }

  return (
    <MainLayout>
      <div className={styles.createPage}>
        <StepWrapper activeStep={activeStep} className={styles.stepWrapper}>
          {activeStep === 0 && (
            <Box display="flex" flexDirection="column" gap={2} position="relative" sx={{ mt: 1, width: '95%', mx: 'auto' }}>
              <TextField {...name} label="Название трека" fullWidth />
              <TextField {...artist} label="Имя исполнителя" fullWidth />
              <TextField {...text} label="Слова к треку" multiline rows={3} fullWidth />
            </Box>
          )}
          {activeStep === 1 && (
            <FileUpload setFile={setPicture} accept="image/*">
              <Button
                variant="contained"
                sx={{ mt: 2, bgcolor: '#007bff', '&:hover': { bgcolor: '#0056b3' } }}
              >
                Загрузить изображение
              </Button>
            </FileUpload>
          )}
          {activeStep === 2 && (
            <FileUpload setFile={setAudio} accept="audio/*">
              <Button
                variant="contained"
                sx={{ mt: 2, bgcolor: '#007bff', '&:hover': { bgcolor: '#0056b3' } }}
              >
                Загрузить аудио
              </Button>
            </FileUpload>
          )}
        </StepWrapper>
        <div className={styles.stepsNavigation}>
          <Button
            onClick={back}
            disabled={activeStep === 0}
            sx={{ bgcolor: '#007bff', color: '#fff', fontWeight: 'bold', px: 3, py: 1.5, borderRadius: 1, '&:hover': { bgcolor: '#0056b3' }, mb: { xs: 1, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}
          >
            Назад
          </Button>
          <Button
            onClick={next}
            sx={{ bgcolor: '#007bff', color: '#fff', fontWeight: 'bold', px: 3, py: 1.5, borderRadius: 1, '&:hover': { bgcolor: '#0056b3' }, width: { xs: '100%', sm: 'auto' } }}
          >
            Далее
          </Button>
        </div>
      </div>
    </MainLayout>
  )
}

export default Create