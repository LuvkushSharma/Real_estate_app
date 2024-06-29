import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Box,
} from "@mui/material";

import PaymentIcon from "@mui/icons-material/Payment";

import Stripe from "react-stripe-checkout";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [locationFilter, setLocationFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("");

  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating fetching data from API
        const response = await fetch("http://localhost:3000/api/v1/properties");
        const data = await response.json();
        setProperties(data.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching properties data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [locationFilter, minPriceFilter, maxPriceFilter, propertyTypeFilter]);

  const applyFilters = () => {
    let filtered = properties.filter((property) => {
      // Default to true to show all properties when no filters are applied
      let meetsLocation = true;
      let meetsMinPrice = true;
      let meetsMaxPrice = true;
      let meetsPropertyType = true;

      if (
        locationFilter &&
        !property.location.toLowerCase().includes(locationFilter.toLowerCase())
      ) {
        meetsLocation = false;
      }

      if (minPriceFilter && property.price < minPriceFilter) {
        meetsMinPrice = false;
      }

      if (maxPriceFilter && property.price > maxPriceFilter) {
        meetsMaxPrice = false;
      }

      if (propertyTypeFilter && property.propertyType !== propertyTypeFilter) {
        meetsPropertyType = false;
      }

      return (
        meetsLocation && meetsMinPrice && meetsMaxPrice && meetsPropertyType
      );
    });

    setFilteredProperties(filtered);
  };

  const handleSearch = () => {
    applyFilters();
  };

  const resetFilters = () => {
    setLocationFilter("");
    setMinPriceFilter("");
    setMaxPriceFilter("");
    setPropertyTypeFilter("");
    setFilteredProperties(properties); // Reset to all properties
  };

  const baseUrl = "http://localhost:3000";

  const handlePaymentClick = (totalAmount, token) => {
    // Add your logic for handling the click event here
    try {
      axios
        .post(
          `${baseUrl}/api/v1/users/pay`,
          {
            token: token.id,
            amount: totalAmount,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          // console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error("Error processing payment:", error);
      // Handle error
    }
  };

  const tokenHandler = (token) => {
    handlePaymentClick(500, token);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }



  return (
    <div>
      <h1>Properties Page</h1>
      <Box sx={{ mb: 4 }}>
        <FormControl sx={{ mr: 2, mb: 2 }} variant="outlined">
          <TextField
            label="Location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </FormControl>
        <FormControl sx={{ mr: 2, mb: 2 }} variant="outlined">
          <TextField
            label="Min Price"
            type="number"
            value={minPriceFilter}
            onChange={(e) =>
              setMinPriceFilter(
                e.target.value === "" ? "" : parseInt(e.target.value)
              )
            }
          />
        </FormControl>
        <FormControl sx={{ mr: 2, mb: 2 }} variant="outlined">
          <TextField
            label="Max Price"
            type="number"
            value={maxPriceFilter}
            onChange={(e) =>
              setMaxPriceFilter(
                e.target.value === "" ? "" : parseInt(e.target.value)
              )
            }
          />
        </FormControl>
        <FormControl sx={{ mr: 2, mb: 2 }} variant="outlined">
          <InputLabel id="property-type-label">Property Type</InputLabel>
          <Select
            labelId="property-type-label"
            id="propertyType"
            value={propertyTypeFilter}
            onChange={(e) => setPropertyTypeFilter(e.target.value)}
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
        <br />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="outlined" onClick={resetFilters} sx={{ ml: 2 }}>
          Reset
        </Button>
      </Box>
      <Grid container spacing={3}>
        {filteredProperties.length === 0
          ? properties.map((property) => (
              <Grid item key={property._id} xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={property.photo || "https://via.placeholder.com/150"}
                    alt={property.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {property.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {property.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${property.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Location: {property.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Property Type: {property.propertyType}
                    </Typography>
                    <IconButton>
                      <Stripe
                        stripeKey="pk_test_51OxrLtSE58zGqWNRmKoIytwdUsKsxkq8AfTJ4Sb2Gb04ufHCOJRH93Wvw3JLjTtoJAZBs2w2v9NF9equYEaGOWRf00sjXJgD8j"
                        token={tokenHandler}
                        amount={500}
                        name="Payment"
                      >
                        <PaymentIcon style={{ color: "#3a7ca5" }} />
                      </Stripe>
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : filteredProperties.map((property) => (
              <Grid item key={property._id} xs={12} sm={6} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={property.photo || "https://via.placeholder.com/150"}
                    alt={property.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {property.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {property.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${property.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Location: {property.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Property Type: {property.propertyType}
                    </Typography>
                    <IconButton>
                      <Stripe
                        stripeKey="pk_test_51OxrLtSE58zGqWNRmKoIytwdUsKsxkq8AfTJ4Sb2Gb04ufHCOJRH93Wvw3JLjTtoJAZBs2w2v9NF9equYEaGOWRf00sjXJgD8j"
                        token={tokenHandler}
                        amount={500}
                        name="Payment"
                      >
                        <PaymentIcon style={{ color: "#3a7ca5" }} />
                      </Stripe>
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
      </Grid>
    </div>
  );
};

export default Properties;
