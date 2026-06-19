import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useBlockUserMutation, useDeleteUserMutation, useUnblockUserMutation, useUsersQuery } from '../services/adminApi';

export function UsersPage() {
  const { data = [] } = useUsersQuery();
  const [block] = useBlockUserMutation();
  const [unblock] = useUnblockUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  return (
    <Paper sx={{ p: 2 }} elevation={0}>
      <Typography variant="h6" sx={{ mb: 2 }}>User Management</Typography>
      <Table size="small">
        <TableHead><TableRow><TableCell>Username</TableCell><TableCell>Email</TableCell><TableCell>Role</TableCell><TableCell>Status</TableCell><TableCell align="right">Actions</TableCell></TableRow></TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.isBlocked ? 'Blocked' : 'Active'}</TableCell>
              <TableCell align="right">
                {user.isBlocked ? <Button size="small" onClick={() => unblock(user._id)}>Unblock</Button> : <Button size="small" color="warning" onClick={() => block(user._id)}>Block</Button>}
                <Button size="small" color="error" onClick={() => deleteUser(user._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
