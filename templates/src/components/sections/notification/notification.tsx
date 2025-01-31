import { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

interface Notification {
    timestamp: string;
    type: string;
  }

const Notification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:8080/abnormal-history', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch notifications');
      }
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Notifications
      </Typography>
      <List>
        {notifications.map((notification, index) => (
          <ListItem key={index} divider>
            <ListItemText
              primary={`Abnormal ${notification.type}`}
              secondary={`Time: ${notification.timestamp}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Notification;
