import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { ProductProvider } from '../context'
import ProductHolder from '../components/molecule/productHolder'
import WebgenLogo from '../assets/Webgen'
import SearchBar from '../components/atoms/searchBar'
import LogOff from '../components/atoms/logoff';
import { useHistory } from 'react-router-dom'

import './dashboard.scss'

const productAPI = "http://localhost:3001/products"
const AccessTokenAPI = "http://localhost:3001/access"

const Dashboard = () => {
    const initialModal = {
        state: false,
        product: false,
        value: {}
    }
    const { push } = useHistory(null)
    const [products, setProducts] = useState([])
    const [modal, setModal] = useState(initialModal)

    useEffect(() => {
        axios.post(AccessTokenAPI, {
            email: localStorage.getItem('email'),
            AccessToken: localStorage.getItem('AccessToken')
        })
            .then(res => console.log(res))
            .catch(err => {
                console.log(err)
                localStorage.clear()
                push('/')
                alert(err)
            })
        axios.get(productAPI).then(res => {
            console.log(res)
            setProducts(res.data.products)
        }
        ).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <ProductProvider products={products} >
            <div className='dashboard'>
                <div className='dashboard_sideNav'>
                    <div className='dashboard_logo'>
                        <WebgenLogo width={100} height={100} />
                    </div>
                    <div>
                        <SearchBar />
                        <button
                            className='dashboard_add_product'
                            onClick={() => setModal({ ...initialModal, state: true })}
                        >
                            <AddCircleOutlineIcon style={{ fontSize: 30 }} />
                        </button>
                        <LogOff />
                    </div>
                </div>
                <div className='dashboard_content'>

                    <ProductHolder
                        setModal={setModal}
                        modal={modal}
                    />
                </div>
            </div>
        </ProductProvider>
    )
}

export default Dashboard