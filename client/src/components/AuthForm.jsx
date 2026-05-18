import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';

export function AuthForm({ title, subtitle, submitLabel, fields, error, onSubmit, footer }) {
  return (
    <Paper elevation={0} sx={{ p: { xs: 3, sm: 4 }, border: '1px solid #d0d5dd', borderRadius: 3 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4">{title}</Typography>
          <Typography sx={{ mt: 1, color: '#344054' }}>
            {subtitle}
          </Typography>
        </Box>
        {error ? <Alert severity="error">{error}</Alert> : null}
        <Box component="form" onSubmit={onSubmit}>
          <Stack spacing={2}>
            {fields.map((field) => (
              <TextField key={field.name} fullWidth required {...field} />
            ))}
            <Button type="submit" variant="contained" size="large">
              {submitLabel}
            </Button>
          </Stack>
        </Box>
        {footer}
      </Stack>
    </Paper>
  );
}
