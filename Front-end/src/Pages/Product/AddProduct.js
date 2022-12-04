import * as React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import ProductService from "../../api/product.service";
import { Box, Checkbox, FormControlLabel, InputAdornment, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProductEdit = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [product, setProduct] = React.useState({
        name: '',
        price: 0,
        type: '',
        warranty_years: 0,
        rating: 0,
        available: true
    });

    const handleChange = (prop) => (event) => {
        setProduct({ ...product, [prop]: event.target.value });
    };
    
    const handleChangeCheck = (event) => {
        setProduct({ ...product, available: event.target.checked });
    };

    const navigate = useNavigate();

    const handleAdd = () => {
        ProductService.addProduct(product)
        .then(() => {
            navigate("/products");
            window.location.reload();
        });
    };

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return (
        <Container sx={{ py: 8 }}>
            <Box component="form" onSubmit={handleAdd} noValidate
            sx={{ width: '100%', display: 'flex', flexDirection: 'column'}}
            >
                <TextField
                    margin="normal"
                    id="name"
                    label="Name"
                    autoFocus
                    value={product.name}
                    onChange={handleChange('name')}
                />

                <TextField
                    margin="normal"
                    id="type"
                    label="Type"
                    value={product.type}
                    onChange={handleChange('type')}
                />

                <TextField
                    type="number"
                    id="price"
                    value={product.price}
                    onChange={handleChange('price')}
                    label="Price"
                    margin="normal"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />

                <TextField
                    type="number"
                    id="rating"
                    value={product.rating}
                    onChange={handleChange('rating')}
                    label="Rating"
                    margin="normal"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />

                <TextField
                    margin="normal"
                    type="number"
                    id="warranty"
                    value={product.warranty_years}
                    onChange={handleChange('warranty_years')}
                    label="Warranty"
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />

                <FormControlLabel
                    control={<Checkbox checked={product.available} onChange={handleChangeCheck} />}
                    label="Available"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >Add Product</Button>
            </Box>
        </Container>
    )
}

export default ProductEdit;