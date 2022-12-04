import * as React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Box, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import UserService from "../api/user.service";
import { logout } from '../api/auth';

const ProductEdit = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [user, setUser] = React.useState({
        username: '',
        password: ''
    });

    const handleChange = (prop) => (event) => {
        setUser({ ...user, [prop]: event.target.value });
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOut = React.useCallback(() => {
        dispatch(logout());
        }, [dispatch]);

    const handleEdit = () => {
        UserService.updateUser(user)
        .then(() => {
            if (currentUser._id === user._id) {
                logOut();
            } else {
                navigate('/users');
                window.location.reload();
            }
        });
    };
    
    React.useEffect(() => {
        async function getData() {
            let splitter = window.location.href.split('/');
            let id = splitter[splitter.length - 2];
            await UserService.getOneUser(id)
            .then(response => {
                setUser(response.data);
            })
        }
        getData();
    }, []);
    
    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <Container sx={{ py: 8 }}>
            <Box component="form" onSubmit={handleEdit} noValidate
            sx={{ width: '100%', display: 'flex', flexDirection: 'column'}}
            >
                <TextField
                    margin="normal"
                    id="username"
                    label="Username"
                    autoFocus
                    value={user.username}
                    onChange={handleChange('username')}
                />

                <TextField
                    type="password"
                    margin="normal"
                    id="password"
                    label="Password"
                    value={user.password}
                    onChange={handleChange('password')}
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >Modifier</Button>
            </Box>
        </Container>
    )
}

export default ProductEdit;