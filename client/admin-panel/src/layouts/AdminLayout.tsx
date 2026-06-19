import { Outlet, NavLink } from 'react-router-dom';
import { AppBar, Box, Button, Drawer, Toolbar, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MovieIcon from '@mui/icons-material/Movie';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import InsightsIcon from '@mui/icons-material/Insights';

const links = [
  { to: '/', label: 'Dashboard', icon: <DashboardIcon /> },
  { to: '/videos', label: 'Videos', icon: <MovieIcon /> },
  { to: '/users', label: 'Users', icon: <PeopleIcon /> },
  { to: '/categories', label: 'Categories', icon: <CategoryIcon /> },
  { to: '/analytics', label: 'Analytics', icon: <InsightsIcon /> }
];

export function AdminLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #e5e7eb', ml: '240px' }}>
        <Toolbar><Typography variant="h6">ViralAdda Admin</Typography></Toolbar>
      </AppBar>
      <Drawer variant="permanent" PaperProps={{ sx: { width: 240, p: 2, borderRight: '1px solid #e5e7eb' } }}>
        <Typography variant="h6" sx={{ px: 1, py: 2 }}>ViralAdda</Typography>
        {links.map((link) => (
          <Button key={link.to} component={NavLink} to={link.to} startIcon={link.icon} sx={{ justifyContent: 'flex-start', mb: 0.5 }}>
            {link.label}
          </Button>
        ))}
      </Drawer>
      <Box component="main" sx={{ ml: '240px', width: '100%', p: 3, pt: 10 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
