import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useAnalyticsQuery } from '../services/adminApi';

export function AnalyticsPage() {
  const { data = [] } = useAnalyticsQuery();
  return (
    <Paper sx={{ p: 2 }} elevation={0}>
      <Typography variant="h6" sx={{ mb: 2 }}>Most Viewed Videos</Typography>
      <Table size="small">
        <TableHead><TableRow><TableCell>Video</TableCell><TableCell>Creator</TableCell><TableCell>Views</TableCell><TableCell>Likes</TableCell></TableRow></TableHead>
        <TableBody>
          {data.map((video) => (
            <TableRow key={video._id}>
              <TableCell>{video.title}</TableCell>
              <TableCell>{video.uploadedBy?.username}</TableCell>
              <TableCell>{video.views}</TableCell>
              <TableCell>{video.likesCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
