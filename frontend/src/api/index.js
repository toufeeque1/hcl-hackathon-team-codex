import axios from 'axios';
import { products as mockProducts } from './mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.error("Unauthorized access - Redirecting to login...");
        }
        return Promise.reject(error);
    }
);

const USE_MOCK = true;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
let currentProducts = [...mockProducts];

export const api = {
    // GET /api/products
    getProducts: async () => {
        if (!USE_MOCK) return apiClient.get('/products').then(res => res.data);
        await delay(500);
        return { data: [...currentProducts] };
    },

    // GET /api/products/category/{id}
    getProductsByCategory: async (category) => {
        if (!USE_MOCK) return apiClient.get(`/products/category/${category}`).then(res => res.data);
        await delay(500);
        return { data: currentProducts.filter(p => p.category.toLowerCase() === category.toLowerCase()) };
    },

    // POST /api/orders
    createOrder: async (orderData) => {
        if (!USE_MOCK) return apiClient.post('/orders', orderData).then(res => res.data);
        await delay(800);

        // Simulate inventory reduction
        orderData.items.forEach(orderItem => {
            const product = currentProducts.find(p => p.id === orderItem.id);
            if (product) {
                product.stock = Math.max(0, product.stock - orderItem.quantity);
            }
        });

        return {
            data: {
                success: true,
                orderId: `ORD-${Math.floor(Math.random() * 10000)}`,
                message: "Order placed successfully!"
            }
        };
    },

    // PUT /api/cart
    updateCart: async (cartData) => {
        if (!USE_MOCK) return apiClient.put('/cart', cartData).then(res => res.data);
        await delay(300);
        return { data: { success: true, message: "Cart synced." } };
    }
};
