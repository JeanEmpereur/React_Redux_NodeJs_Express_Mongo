import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ProductService from "../../api/product.service";
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Product = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [product, setProduct] = React.useState(true);

    const handleDelete = () => {
        ProductService.deleteProduct(product._id);
    };
    React.useEffect(() => {
        async function getData() {
            let splitter = window.location.href.split('/');
            let id = splitter[splitter.length - 1];
            await ProductService.getOneProduct(id)
            .then(response => {
                setProduct(response.data);
            })
        }
        getData();
    }, []);
    if (!currentUser) {
        return <Navigate to="/login" />;
    }
    
    return (
        <Container sx={{ py: 8 }}>
            <Card
            sx={{ width: '100%', display: 'flex', flexDirection: 'column'}}
            >
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    Name : "{product.name}"
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Typography sx={{ margin: 1 }}>
                        Type : {product.type}
                    </Typography>
                    <Typography sx={{ margin: 1 }}>
                        Price : {product.price}€
                    </Typography>
                    <Typography sx={{ margin: 1 }}>
                        Rating : {product.rating}/10
                    </Typography>
                    <Typography sx={{ margin: 1 }}>
                        Warranty : {product.warranty_years} years
                    </Typography>
                    <Typography sx={{ margin: 1 }}>
                        Available : {product.available ? 'yes' : 'no'}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Button size="small" href={"/product/" + product._id + "/edit"}>Edit</Button>
                <Button size="small" onClick={handleDelete} href="/products">Delete</Button>
            </CardActions>
            </Card>
        </Container>
    )
}

export default Product;