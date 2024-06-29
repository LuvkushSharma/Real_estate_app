import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, CircularProgress, Container } from '@mui/material';
import { fetchUserData } from './../helper/userAPI';
import { useNavigate } from 'react-router-dom';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: '50px'}} className="home-container">
     <center><img src='https://media.istockphoto.com/id/1192403701/photo/residential-housing-background.jpg?s=612x612&w=0&k=20&c=8iquSynRiqeXDRaE53-0aKNEGe8y7RKslG2SoYwYGAQ='/></center>
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" align="center">
            Welcome to the Real Estate Transaction Management Platform!
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          {loading ? (
            <CircularProgress />
          ) : user ? (
            <>
              <Typography variant="h6">
                Welcome, {user.name}!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
                disabled={!(user.role === 'seller' || user.role === 'agent')}
                onClick={() => navigate('/create-property')}
                style={{ marginTop: '20px' }}
              >
                Create Property
              </Button>
            </>
          ) : (
            <Typography variant="body1">
              No user data available.
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ListAltIcon />}
            onClick={() => navigate('/properties')}
            style={{ marginTop: '20px' }}
          >
            Get Properties List
          </Button>
        </Grid>
      </Grid>

    </Container>
  );
};

export default HomePage;
