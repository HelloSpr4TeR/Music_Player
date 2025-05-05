import { ITrack } from '@/types/track'
import { Card, Grid2, IconButton } from '@mui/material';
import React from 'react'
import styles from '../styles/TrackItem.module.scss'
import { Pause } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useActions } from '@/hooks/useActions';
import { FaPlayCircle } from 'react-icons/fa';

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
    const router = useRouter()
    const { playTrack, pauseTrack, setActiveTrack } = useActions()

    const play = (e: React.MouseEvent) => {
        e.stopPropagation()
        setActiveTrack(track)
        playTrack()
    }

    return (
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            <div className={styles.mediaContainer}>
            <IconButton onClick={play}>
                {!active
                    ? <FaPlayCircle size={30}/>
                    : <Pause />
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