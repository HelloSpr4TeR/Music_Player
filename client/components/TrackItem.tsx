import { ITrack } from '@/types/track'
import { Card, Grid2, IconButton } from '@mui/material';
import React, { useState } from 'react'
import styles from '../styles/TrackItem.module.scss'
import { useRouter } from 'next/router';
import { useActions } from '@/hooks/useActions';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import clsx from 'clsx';


interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
    const router = useRouter()
    const { playTrack, setActiveTrack } = useActions()
    const { active: currentTrack, pause } = useTypedSelector(state => state.player)
    const isCurrent = currentTrack?._id === track._id
    const isButtonDisabled = isCurrent

    const play = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (isButtonDisabled) return;

        setActiveTrack(track)
        playTrack()
    }

    return (
        <Card
            className={clsx(styles.track, { [styles.active]: active })}
            onClick={() => router.push('/tracks/' + track._id)}>
            <div className={styles.mediaContainer}>
                <IconButton onClick={play} disabled={isButtonDisabled}>
                    {!isCurrent || pause
                        ? <FaPlayCircle className={styles.faPlayPause} />
                        : <FaPauseCircle className={styles.faPlayPause} />
                    }
                </IconButton>
                <img
                    width={70}
                    height={70}
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${track.picture}`}
                    alt={track.name}
                />
            </div>
            <Grid2 container direction='column' className={styles.info}>
                <div>{track.name}</div>
                <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
            </Grid2>
        </Card>
    )
}

export default TrackItem