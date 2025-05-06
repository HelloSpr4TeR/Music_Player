import { Close, Pause, PlayArrow, VolumeUp } from '@mui/icons-material'
import { Grid2, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styles from '../styles/Player.module.scss'
import TrackProgress from './TrackProgress'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import VolumeProgress from './VolumeProgress'
import { useMediaQuery } from '@mui/material';


let audio;

const Player = () => {
  const { pause, volume, active, duration, currentTime } = useTypedSelector(state => state.player)
  const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack, clearActiveTrack, playNextTrack } = useActions()

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      play();
    }

    return () => {
      if (audio) {
        audio.pause();
        pauseTrack();
      }
    };
  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = `${process.env.NEXT_PUBLIC_API_URL}/${active.audio}`
      audio.volume = volume / 100
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration))
      }
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime))
      }
    }
    audio.onended = () => {
      playNextTrack();
    };
  }

  const play = () => {
    if (pause) {
      playTrack()
      audio.play()
    } else {
      pauseTrack()
      audio.pause()
    }
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100
    setVolume(Number(e.target.value))
  }

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value)
    setCurrentTime(Number(e.target.value))
  }

  const handleClose = () => {
    if (audio) {
      pauseTrack();
      audio.pause()
    }

    setActiveTrack(null);
    clearActiveTrack();
  }

  if (!active) {
    return null
  }

  const truncate = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
  };

  return (
    <div className={styles.player}>
      <div className={styles.controls}>
        <IconButton onClick={play}>
          {pause ? <PlayArrow /> : <Pause />}
        </IconButton>
        <img
          className={styles.img}
          src={`${process.env.NEXT_PUBLIC_API_URL}/${active.picture}`}
          alt={active.name}
        />
        <Grid2 container direction='column' style={{ width: 200, margin: '0 20px' }} className={styles.trackInfo}>
          <div className={styles.truncatedText} style={{ fontSize: 15 }}>
            {active?.name ? (isSmallScreen ? truncate(active.name, 18) : active.name) : ""}
          </div>
          <div style={{ fontSize: 12, color: 'gray' }}>
            {active?.artist ? (isSmallScreen ? truncate(active.artist, 20) : active.artist) : ""}
          </div>
        </Grid2>
        <div className={styles.volumeWrapper}>
          <VolumeUp style={{ marginLeft: 'auto' }} />
          <VolumeProgress left={volume} right={100} onChange={changeVolume} className={styles.volumeProgress} />
        </div>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </div>

      <div className={styles.progressWrapper}>
        <TrackProgress
          left={currentTime}
          right={duration}
          onChange={changeCurrentTime}
          className={styles.trackProgress}
        />
      </div>
    </div>
  )
}

export default Player;