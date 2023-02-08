import { ProductCarousel } from "../components/ProductCarousel";
import { useLocation} from "react-router-dom";
export function Product() {

    const location = useLocation();
    const id = location.state;
    console.log({...id});

    return (
        <>
            <ProductCarousel id={id} />
        </>
    )
}