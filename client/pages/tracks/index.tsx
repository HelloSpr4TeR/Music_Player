import TrackList from '@/components/TrackList'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import MainLayout from '@/layouts/MainLayout'
import { NextThunkDispatch } from '@/store/store'
import { fetchTracks, searchTracks } from '@/store/slices/trackSlice'
import { Box, Button, Card, Grid2, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { wrapper } from '../../store/store'
import { useDispatch } from 'react-redux'
import styles from '../../styles/TrackList.module.scss'

const index = () => {
  const router = useRouter()
  const { tracks, error } = useTypedSelector(state => state.track)
  const [query, setQuery] = useState<string>('')
  const dispatch = useDispatch() as NextThunkDispatch
  const [timer, setTimer] = useState(null)

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    if (timer) {
      clearTimeout(timer)
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value))
      }, 500)
    )
    await dispatch(await searchTracks(e.target.value))
  }

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    )
  }

  return (
    <MainLayout title={'Список треков - музыкальная площадка'}>
      <Grid2 container justifyContent="center" className={styles.container}>
        <Card className={styles.card}>
          <Box p={3}>
            <Grid2 container justifyContent="space-between" className={styles.header}>
              <h1>Список треков</h1>
              <Button
                onClick={() => router.push('/tracks/create')}
                className={styles.button}
              >
                Загрузить
              </Button>
            </Grid2>
          </Box>
          <TextField
            fullWidth
            value={query}
            onChange={search}
            className={styles.searchField}
            placeholder="Поиск треков..."
          />
          <TrackList tracks={tracks} className={styles.trackList} />
        </Card>
      </Grid2>
    </MainLayout>
  )
}

export default index

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  const dispatch = store.dispatch as NextThunkDispatch
  await dispatch(await fetchTracks())
})