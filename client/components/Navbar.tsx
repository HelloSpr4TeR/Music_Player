import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import { useRouter } from 'next/router';
import { Album, Home, QueueMusic } from '@mui/icons-material';


const menuItems = [
  { text: 'Главная', href: '/' },
  { text: 'Список треков', href: '/tracks' },
  { text: 'Список альбомов', href: '/albums' },
]

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter()

  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node) &&
        open
      ) {
        handleDrawerClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            onClick={() => router.push('/tracks')}
            sx={{
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'color 0.3s',
              '&:hover': {
                color: '#90caf9',
              },
            }}>
            SoundNest 🎧
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        ref={drawerRef}
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundImage: 'url("/images/sidebar-bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: '#fff',
          },
        }}
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List sx={{ padding: 0 }}>
          {menuItems.map(({ text, href }, index) => (
            <ListItem key={href} disablePadding sx={{ marginBottom: 1 }}>
              <ListItemButton
                onClick={() => router.push(href)}
                sx={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  {index === 0 ? <Home sx={{ color: '#007bff' }} /> : ""}
                  {index === 1 ? <QueueMusic sx={{ color: '#007bff' }} /> : ""}
                  {index === 2 ? <Album sx={{ color: '#007bff' }} /> : ""}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    fontWeight: 500,
                    color: '#333',
                    fontSize: '16px',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}