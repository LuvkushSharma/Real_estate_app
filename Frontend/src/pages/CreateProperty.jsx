import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Input,
  CircularProgress,
} from "@mui/material";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const CreateProperty = () => {
  const navigate = useNavigate();
  const baseUrl = "http://localhost:3000";

  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [title , setTitle] = useState("");
  const [description , setDescription] = useState("");
  const [price , setPrice] = useState("");
  const [location , setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [propertyType, setPropertyType] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {title , description , price , imageUrl , location , propertyType};

    console.log('data', data);

    try {
      const res = await axios.post('http://localhost:3000/api/v1/properties', data , { headers: {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json'
    } , withCredentials: true });

      navigate('/properties');

    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    console.log("event.target.files[0]", event.target.files[0].name);
    setImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "dost_luvkush");
      formData.append("cloud_name", "dx2vel6vy");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dx2vel6vy/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const cloudinaryImageUrl = response.data.secure_url; // Extract Cloudinary image URL

      console.log('cloudinaryImageUrl', cloudinaryImageUrl);

      setImageUrl(cloudinaryImageUrl);

      console.log("Image uploaded successfully:", cloudinaryImageUrl);

      setImageUrl(cloudinaryImageUrl);
      setUploading(false);
      console.log("Image uploaded successfully:", response.data.imageUrl);
      // Optionally, you can update the profile picture in the UI after successful upload
    } catch (error) {
      console.error("Image upload failed:", error);
      setUploading(false);
    }
  };


  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography component="h1" variant="h5">
          Create New Property
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Property Title"
            name="title"
            autoComplete="title"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="description"
            label="Property Description"
            id="description"
            autoComplete="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="location"
            label="Property Location"
            id="location"
            autoComplete="location"
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="price"
            label="Property Price"
            id="price"
            autoComplete="price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <FormControl variant="outlined" margin="normal" required fullWidth>
            <InputLabel id="property-type-label">Property Type</InputLabel>
            <Select
              labelId="property-type-label"
              id="propertyType"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              label="Property Type"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="House">House</MenuItem>
              <MenuItem value="Apartment">Apartment</MenuItem>
              <MenuItem value="Condo">Condo</MenuItem>
            </Select>
          </FormControl>
          <Box mt={3}>
          <Input type="file" onChange={handleImageChange} />
          <Button
            variant="contained"
            onClick={handleImageUpload}
            disabled={uploading}
            sx={{
              ml: 2,
              backgroundColor: uploading ? "#adb5bd" : "#343a40",
              color: uploading ? "#6c757d" : "#fff",
              "&:hover": {
                backgroundColor: uploading ? "#adb5bd" : "#495057",
              },
            }}
          >
            {uploading ? <CircularProgress size={24} /> : "Upload Image"}
          </Button>
        </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateProperty;
