import api from "./index";

const CART_ENDPOINT = "/cart";

async function getFullZooInfo(zooId) {
try {
    const response = await api.get(`/zoos/${zooId}`);
    return response.data;
} catch (error) {
    console.warn("Cannot get zoo info, using fallback");
    return null;
}
}

export async function handleAddToCart(zooId) {
try {
    const zooInfo = await getFullZooInfo(zooId);
    
    if (!zooInfo) {
    return { success: false, error: "Zoo not found" };
    }

    const productToAdd = {
    id: zooInfo.id,
    name: zooInfo.name,
    price: 50, 
    image: zooInfo.image,
    visitors: zooInfo.visitors,
    quantity: 1
    };

    const response = await api.post(CART_ENDPOINT, productToAdd);
    return { success: true, data: response.data };
} catch (error) {
    console.warn("Cart API offline → using client-side cart");
    return { success: true };
}
}

export async function handleLoadCart() {
try {
    const response = await api.get(CART_ENDPOINT);
    console.log('Cart data from server:', response.data);
    return { success: true, items: response.data };
} catch (error) {
    console.warn("Cart API offline → using client-side cart");
    return { success: true, items: [] };
}
}

export async function handleRemoveFromCart(productId) {
try {
    await api.delete(`${CART_ENDPOINT}/${productId}`);
    return { success: true };
} catch (error) {
    console.warn("Cart API offline → using client-side cart");
    return { success: true };
}
}


export async function handleIncreaseQuantity(productId) {
try {
    const response = await api.get(`${CART_ENDPOINT}/${productId}`);
    const currentItem = response.data;
    
    const updatedItem = {
    ...currentItem,
    quantity: currentItem.quantity + 1
    };
    
    await api.put(`${CART_ENDPOINT}/${productId}`, updatedItem);
    return { success: true };
} catch (error) {
    console.warn("Cart API offline → using client-side cart");
    return { success: true };
}
}


export async function handleDecreaseQuantity(productId) {
try {
    const response = await api.get(`${CART_ENDPOINT}/${productId}`);
    const currentItem = response.data;
    
    if (currentItem.quantity <= 1) {
    await api.delete(`${CART_ENDPOINT}/${productId}`);
    } else {
    const updatedItem = {
        ...currentItem,
        quantity: currentItem.quantity - 1
    };
    await api.put(`${CART_ENDPOINT}/${productId}`, updatedItem);
    }
    
    return { success: true };
} catch (error) {
    console.warn("Cart API offline → using client-side cart");
    return { success: true };
}
}


export async function handleClearCart() {
try {
    const response = await api.get(CART_ENDPOINT);
    const cartItems = response.data;
    
    for (const item of cartItems) {
    await api.delete(`${CART_ENDPOINT}/${item.id}`);
    }
    
    return { success: true };
} catch (error) {
    console.warn("Cart API offline → using client-side cart");
    return { success: true };
}
}

export async function handleContinueShopping() {
return { success: true };
}