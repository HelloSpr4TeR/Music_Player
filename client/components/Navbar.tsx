import React, { useEffect, useRef, useState } from 'react';
import { AppBar, Box, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import SidebarDrawer from './SidebarDrawer';
import { menuItems } from './menuItems';
import RepeatIcon from '@mui/icons-material/Repeat';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import styles from '../styles/Navbar.module.scss'


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const drawerRef = useRef<HTMLDivElement>(null);

  const { setShuffleMode } = useActions();
  const isShuffle = useTypedSelector(state => state.player.isShuffle);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node) && open) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleShuffleToggle = () => {
    setShuffleMode(!isShuffle);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={[{ mr: 2 }, open && { display: 'none' }]}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            onClick={() => router.push('/tracks')}
            sx={{
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'color 0.3s',
              '&:hover': { color: '#90caf9' },
            }}
          >
            SoundNest 🎧
          </Typography>
          <IconButton onClick={handleShuffleToggle} className={styles.shuffle}>
            {isShuffle ? <ShuffleIcon /> : <RepeatIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <SidebarDrawer
        open={open}
        onClose={() => setOpen(false)}
        menuItems={menuItems}
        ref={drawerRef}
      />
    </Box>
  );
}