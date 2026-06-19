import { useState } from 'react';
import { Button, List, ListItem, ListItemText, Paper, Stack, TextField, Typography } from '@mui/material';
import { useCategoriesQuery, useCreateCategoryMutation } from '../services/adminApi';

export function CategoriesPage() {
  const [name, setName] = useState('');
  const { data = [] } = useCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();

  const submit = async () => {
    if (!name.trim()) return;
    await createCategory({ name }).unwrap();
    setName('');
  };

  return (
    <Paper sx={{ p: 2 }} elevation={0}>
      <Typography variant="h6" sx={{ mb: 2 }}>Category Management</Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <TextField size="small" label="Category name" value={name} onChange={(event) => setName(event.target.value)} />
        <Button variant="contained" onClick={submit}>Create</Button>
      </Stack>
      <List dense>{data.map((category) => <ListItem key={category._id}><ListItemText primary={category.name} secondary={category.slug} /></ListItem>)}</List>
    </Paper>
  );
}
