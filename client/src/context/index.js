import React, { useState, createContext, useContext, useEffect } from 'react'
import axios from 'axios'

const ProductContext = createContext()

const productAPI = "http://localhost:3001/products"
const deleteProductAPI = "http://localhost:3001/delete_product"
const updateProductAPI = "http://localhost:3001/update_product"



export const useProducts = () => useContext(ProductContext)

export const ProductProvider = ({ children, products }) => {

    const [UIProductState, setUIProductState] = useState([])
    const [searchedProductString, setSearchedProductString] = useState('')
    const userEmail = localStorage.getItem('email')

    useEffect(() => {
        if (searchedProductString.trim()) {
            const searchedProductList = products.filter(product => {
                return product.name.toLowerCase().startsWith(searchedProductString.trim().toLowerCase())
            })
            setUIProductState(searchedProductList)
        } else {
            setUIProductState(products)
        }
    }, [products, searchedProductString])

    const addProduct = (product) => {
        const { name, price, description, password, image } = product
        const data = new FormData()
        data.append("name", name)
        data.append("price", price)
        data.append("description", description)
        data.append("password", password)
        data.append("image", image)
        data.append("add_by_user", userEmail)
        axios.post(productAPI, data).then(res => {
            console.log(res)
            setUIProductState([...UIProductState, res.data.product])
        })
    }
    const updateProduct = (product) => {
        const { id, name, price, description, image, imageLink } = product
        console.log('update product called..')
        console.log('upade product context:', { id, name, price, description, image })
        const data = new FormData()
        data.append("id", id)
        data.append("name", name)
        data.append("price", price)
        data.append("description", description)
        data.append("image", image)
        data.append("add_by_user", userEmail)
        data.append("imageLink", imageLink)
        axios.post(updateProductAPI, data).then(res => {
            console.log(res)
            const newProductList = UIProductState.map(product => {
                if (product.id == res.data.product.id) {
                    return res.data.product
                }
                return product
            })

            console.log('newProductList:', newProductList)
            setUIProductState(newProductList)
        })
    }

    const deleteProduct = (product) => {
        axios.post(deleteProductAPI, product).then(res => {
            console.log(res.data)
            const newProductList = UIProductState.filter(product => !(product.id === res.data.id))
            setUIProductState(newProductList)
        })
    }

    return (
        <ProductContext.Provider value={{
            products: UIProductState,
            setProducts: setUIProductState,
            addProduct,
            deleteProduct,
            updateProduct,
            searchedProductString,
            setSearchedProductString
        }}>
            {children}
        </ProductContext.Provider>
    )
}

