import { Grid2, Paper, Typography } from '@mui/material';
import { useDashboardQuery } from '../services/adminApi';

export function DashboardPage() {
  const { data } = useDashboardQuery();
  const cards = [
    ['Total Users', data?.totalUsers ?? 0],
    ['Total Videos', data?.totalVideos ?? 0],
    ['Total Views', data?.totalViews ?? 0],
    ['Total Comments', data?.totalComments ?? 0]
  ];

  return (
    <Grid2 container spacing={2}>
      {cards.map(([label, value]) => (
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={label}>
          <Paper sx={{ p: 2 }} elevation={0}>
            <Typography color="text.secondary">{label}</Typography>
            <Typography variant="h4">{value}</Typography>
          </Paper>
        </Grid2>
      ))}
    </Grid2>
  );
}
