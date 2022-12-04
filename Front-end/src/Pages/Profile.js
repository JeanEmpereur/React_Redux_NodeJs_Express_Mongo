import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Container, ListItem, ListItemText } from "@mui/material";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <ListItem
      key={currentUser._id}
      disableGutters
      >
        <ListItemText primary={"User \: " + currentUser.username} sx={{ ml: 10 }}/>
        <ListItemText primary={"password \: " + currentUser.password} sx={{ ml: 10 }}/>
      </ListItem>
    </Container>
  );
};

export default Profile;
