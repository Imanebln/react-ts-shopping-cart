import {Card, Button} from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utilities/formatCurrency';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
// import {LazyLoadImage} from "react-lazy-load-image-component";

type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

export function StoreItem({id, name, price, imgUrl} : StoreItemProps){

    const {getItemQuantity,increaseQuantity, decreaseQuantity, removeFromCart} = useShoppingCart();
    const quantity = getItemQuantity(id);

    return (
        <Card className='h-100'>
            <Card.Img
            variant="top" 
            src={imgUrl} 
            height="300px"
            style={{objectFit: "cover"}} 
            />
            <Card.Body className='d-flex flex-column' >
                <Card.Title className='d-flex justify-content-between
                align-items-baseline mb-4'>
                    <span className='fs-2'>{name}</span>
                    <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
                </Card.Title>
                <div className='mt-auto'>
                    {quantity === 0 ? (
                        <Button className='w-100' variant="outline-primary" onClick={() => increaseQuantity(id)}>+ Add To Cart</Button>
                    ) 
                    : <div className='d-flex align-items-center flex-column'
                    style={{gap: ".5rem"}}>
                        <div className="d-flex align-items-center justify-content-center"
                        style={{gap: ".5rem"}}>
                            <Button size='sm' variant='none' onClick={() => decreaseQuantity(id)}><RemoveIcon style={{color: "blue"}} /></Button>
                            <div className="">
                                <span className="fs-3">{quantity}</span>
                                in cart
                            </div>
                            <Button size='sm' variant='none' onClick={() => increaseQuantity(id)}><AddIcon style={{color: "blue"}} /></Button>
                        </div>
                        <Button className='ms-auto' size='sm' variant='none'  onClick={() => removeFromCart(id)}><DeleteIcon style={{color: "red"}} /></Button>
                    </div>}
                </div>
            </Card.Body>
        </Card>
    )
}