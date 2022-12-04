import * as React from 'react';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ProductService from "../../api/product.service";
import { useSelector } from 'react-redux';


const Products = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [allproducts, setProducts] = React.useState([]);
    React.useEffect(() => {
        async function getData() {
            await ProductService.getAllProducts()
            .then(response => {
                setProducts(response.data);
            })
        }
        getData();
    }, []);
    
    if (!currentUser) {
        return <Navigate to="/login" />;
    }
    
    return (
        <Container sx={{ py: 8 }} maxWidth="md">
            <Button variant="contained" sx={{ mt: 3, mb: 2 }} href="/products/add">
                Add Product
            </Button>
            <Grid container spacing={4}>
                {allproducts.map((card) => (
                <Grid item key={card._id} xs={12} sm={6} md={4} href={"/product/" + card._id}>
                    <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                        </Typography>
                        <Typography>
                            Type : {card.type}
                        </Typography>
                            Price : {card.price}€
                        <Typography>
                            Rating : {card.rating}/10
                        </Typography>
                        <Typography>
                            Waranty : {card.waranty}years
                        </Typography>
                        <Typography>
                            Available : {card.available ? 'yes' : 'no'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" href={"/product/" + card._id}>View</Button>
                        <Button size="small" href={"/product/" + card._id + "/edit"}>Edit</Button>
                    </CardActions>
                    </Card>
                </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Products;