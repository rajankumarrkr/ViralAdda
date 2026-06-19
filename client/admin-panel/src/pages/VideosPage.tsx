import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useApproveVideoMutation, useDeleteVideoMutation, useRejectVideoMutation, useVideosQuery } from '../services/adminApi';

export function VideosPage() {
  const { data = [] } = useVideosQuery();
  const [approve] = useApproveVideoMutation();
  const [reject] = useRejectVideoMutation();
  const [deleteVideo] = useDeleteVideoMutation();

  return (
    <Paper sx={{ p: 2 }} elevation={0}>
      <Typography variant="h6" sx={{ mb: 2 }}>Video Management</Typography>
      <Table size="small">
        <TableHead><TableRow><TableCell>Title</TableCell><TableCell>Creator</TableCell><TableCell>Status</TableCell><TableCell>Views</TableCell><TableCell align="right">Actions</TableCell></TableRow></TableHead>
        <TableBody>
          {data.map((video) => (
            <TableRow key={video._id}>
              <TableCell>{video.title}</TableCell>
              <TableCell>{video.uploadedBy?.username}</TableCell>
              <TableCell>{video.status}</TableCell>
              <TableCell>{video.views}</TableCell>
              <TableCell align="right">
                <Button size="small" onClick={() => approve(video._id)}>Approve</Button>
                <Button size="small" color="warning" onClick={() => reject(video._id)}>Reject</Button>
                <Button size="small" color="error" onClick={() => deleteVideo(video._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
