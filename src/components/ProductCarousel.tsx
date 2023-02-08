import { Carousel, Container, Row, Col, Button} from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import StoreItems from '../data/items.json';
import { formatCurrency } from '../utilities/formatCurrency';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export function ProductCarousel(props) {

    const {getItemQuantity,increaseQuantity, decreaseQuantity, removeFromCart} = useShoppingCart();
    const quantity = getItemQuantity(props.id);
    
    const idProduct = props.id;

    const product = StoreItems.find(i => i.id === idProduct);

    return(
        <Container>
        <Row>
          <Col xs={12} md={8} lg={6} className="mb-5">
            <Carousel>
              {product?.images.map((url, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={url} alt="" />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col xs={12} md={4} className='ms-2'>
            <h3>Product: {product?.name} </h3>
            <p><b>Price:</b> {product?.price} $US</p>
            <p className='mb-5'><b>Description:</b> {product?.description}</p>
            <div className='mt-auto'>
                    {quantity === 0 ? (
                        <Button className='w-100' variant="outline-primary" onClick={() => increaseQuantity(idProduct)}>+ Add To Cart</Button>
                    ) 
                    : <div className='d-flex align-items-center flex-column'
                    style={{gap: ".5rem"}}>
                        <div className="d-flex align-items-center justify-content-center"
                        style={{gap: ".5rem"}}>
                            <Button size='sm' variant='none' onClick={() => decreaseQuantity(idProduct)}><RemoveIcon style={{color: "blue"}} /></Button>
                            <div className="">
                                <span className="fs-3">{quantity}</span>
                                in cart
                            </div>
                            <Button size='sm' variant='none' onClick={() => increaseQuantity(idProduct)}><AddIcon style={{color: "blue"}} /></Button>
                        </div>
                        <Button className='ms-auto' size='sm' variant='none'  onClick={() => removeFromCart(idProduct)}><DeleteIcon style={{color: "red"}} /></Button>
                    </div>}
            </div>
          </Col>
        </Row>
      </Container>
    )
}