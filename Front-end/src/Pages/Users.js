import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Button, Container } from "@mui/material";
import UserService from "../api/user.service";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Users = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [allusers, setUsers] = useState([]);
    const handleDelete = (event) => {
        let id = event.target.id;
        UserService.deleteUser(id)
        .then(() => {
            UserService.getAllUsers()
            .then(response => {
                setUsers(response.data);
            })
        })
    }
    useEffect(() => {
        async function getData() {
            await UserService.getAllUsers()
            .then(response => {
                setUsers(response.data);
            })
        }
        getData();
    }, []);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <Container>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {allusers.map((user) => (
                    <ListItem
                    key={user._id}
                    disableGutters
                    >
                        <ListItemText primary={user._id === currentUser._id ? "It's ME :) \: " + user.username : "User \: " + user.username} sx={{ ml: 10 }}/>
                        <Button href={'user/' + user._id + '/edit'}>edit</Button>
                        <Button 
                            id={user._id} 
                            onClick={handleDelete}
                            disabled={user._id === currentUser._id ?? true}
                        >delete</Button>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Users;
