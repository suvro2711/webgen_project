import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import { useProducts } from '../../context'
import Product from '../atoms/product'
import Modal from './modal'
import PageIndex from './pageIndex'
import './productHolder.scss'

const ProductHolder = ({ setModal, modal }) => {

    const productsInCurrentPage = (arr, curPage, ITEMS_PER_PAGE = 6) => {
        const currentProducts = []
        const startIndex = (curPage - 1) * ITEMS_PER_PAGE
        const maxIndex = (curPage * ITEMS_PER_PAGE) - 1
        const endIndex = arr.length - 1 > maxIndex ? maxIndex : arr.length - 1
        for (let i = startIndex; i <= endIndex; i++) {
            currentProducts.push(products[i])
        }
        return currentProducts
    }
    const numberOfPages = (arr, ITEMS_PER_PAGE = 6) => {
        const filledPages = Math.floor(arr.length / ITEMS_PER_PAGE)
        const leftOverProducts = arr.length % ITEMS_PER_PAGE
        return leftOverProducts ? filledPages + 1 : filledPages
    }

    const { products } = useProducts()

    const [currentPage, setCurrentPage] = useState(1)
    const currentProducts = productsInCurrentPage(products, currentPage)

    const previousPage = () => {
        const previousPage = 1 < currentPage ? currentPage - 1 : 1
        setCurrentPage(previousPage)
    }
    const nextPage = () => {
        const previousPage = numberOfPages(products) > currentPage ? currentPage + 1 : currentPage
        setCurrentPage(previousPage)
    }

    return (
        <>
            <div className='product_holder'>
                <div className='product_holder_leftButtonHolder'>
                    <div className='product_holder_leftButtonHolder_container'>
                        <IconButton
                            onClick={previousPage}
                            color="primary"
                            aria-label="upload picture"
                            component="span">
                            <ChevronLeftOutlinedIcon />
                        </IconButton>
                    </div>
                </div>
                {currentProducts.map(product => <Product
                    key={product.id}
                    product={product}
                    setModal={setModal}>
                </Product>)}
                <div className='product_holder_rightButtonHolder'>
                    <div className='product_holder_rightButtonHolder_container'>
                        <IconButton
                            onClick={nextPage}
                            color="primary"
                            aria-label="upload picture"
                            component="span">
                            <ChevronRightOutlinedIcon />
                        </IconButton>
                    </div>
                </div>
                <PageIndex
                    numberOfPages={numberOfPages(products)}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
            {
                modal.state &&
                <Modal setModal={setModal} modal={modal} />
            }
        </>
    )
}

export default ProductHolder