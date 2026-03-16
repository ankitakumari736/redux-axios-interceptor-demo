import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prev) => {
            const found = prev.find(p => p.id === product.id);

            if (found) {
                if (found.quantity >= 5) return prev;

                return prev.map(p =>
                    p.id === product.id
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                );
            }

            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const decreaseQty = (id) => {
        setCart(prev =>
            prev
                .map(p =>
                    p.id === id ? { ...p, quantity: p.quantity - 1 } : p
                )
                .filter(p => p.quantity > 0)
        );
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(p => p.id !== id));
    };

    const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                decreaseQty,
                removeFromCart,
                totalAmount
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
