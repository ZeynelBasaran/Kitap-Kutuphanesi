import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function AlertMessage({ type, message }) {
    return (
      <Stack sx={{ width: '92%', margin: "10px" }} spacing={2}>
        {(() => {
          switch (type) {
            case "success":
              return (
                <Alert variant="filled" severity="success">
                  {message}
                </Alert>
              );
            case "info":
              return (
                <Alert variant="filled" severity="info">
                  {message} 
                </Alert>
              );
            case "warning":
              return (
                <Alert variant="filled" severity="warning">
                  {message} 
                </Alert>
              );
            case "error":
              return (
                <Alert variant="filled" severity="error">
                  {message}
                </Alert>
              );
            default:
              return null;
          }
        })()}
      </Stack>
    );
  }
  