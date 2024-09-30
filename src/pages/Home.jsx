import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Home() {
    const location = useLocation();
    const productsRef = useRef();
    const priceRef = useRef();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://auth-rg69.onrender.com/api/products/all")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    function handleCreateProduct(event) {
        event.preventDefault();

        const newProduct = {
            name: productsRef.current.value,
            price: parseFloat(priceRef.current.value),
        };

        fetch("https://auth-rg69.onrender.com/api/products", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
        .then(res => res.json())
        .then(data => {
            alert("Maxsulot qo'shldi !");
            setProducts(prev => [...prev, data]);
            productsRef.current.value = '';
            priceRef.current.value = '';
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div className='container mx-auto w-full'>
            <h1 className='text-center text-5xl text-purple-600 mt-8 mb-8 font-bold '>Products</h1>
            <form className='w-1/4 mt-20 mb-14 flex flex-col gap-4 mx-auto bg-purple-200 p-6 rounded-xl shadow-purple-800  shadow-2xl' onSubmit={handleCreateProduct}>
                <input className='border outline-purple-700 rounded-md p-3  text-purple-900' ref={productsRef} type="text" placeholder='Product Name' required />
                <input className='border rounded-md p-3 outline-purple-700 text-purple-900' ref={priceRef} type="number" placeholder='Price' required />
                <button className='border border-none rounded-md p-3 bg-purple-500 active:scale-95 text-white text-2xl font-medium' type="submit">Create Product</button>
            </form>

            <h2 className='mt-6 text-center text-purple-600 font-bold text-3xl mb-9' >Existing Products:</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id} className='border-b py-2 text-2xl text-purple-400'>
                        <strong className='text-3xl text-purple-600'>{product.name}</strong> - ${product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
