import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import {useLocalStorage} from '../hooks/useLocalStorage';

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    openCart: () => void,
    closeCart: () => void,
    getItemQuantity: (id: number) => number,
    increaseQuantity: (id: number) => void,
    decreaseQuantity: (id: number) => void,
    removeFromCart: (id: number) => void,
    cartQuantity: number,
    cartItems: CartItem[]
}

type CartItem = {
    id: number,
    quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({children}: ShoppingCartProviderProps){

    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[]);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }
    const increaseQuantity = (id: number) => {
        setCartItems(currentItems => {
            if(cartItems.find(item => item.id === id) == null){
                return [...currentItems, { id, quantity: 1}];
            } else{
                return currentItems.map(item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity + 1}
                    }else {
                        return item;
                    }
                })
            }
        })
    }
    const decreaseQuantity = (id: number) => {
        setCartItems(currentItems => {
            if(cartItems.find(item => item.id === id)?.quantity === 1){
                return currentItems.filter(item => item.id !== id);
            } else{
                return currentItems.map(item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity - 1}
                    }else {
                        return item;
                    }
                })
            }
        })
    }
    const removeFromCart = (id: number) => {
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id !== id);
        })
    }

    return (
    <ShoppingCartContext.Provider 
    value={{
        getItemQuantity, 
        increaseQuantity, 
        decreaseQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart
    }}
    >
        {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>

    )
}