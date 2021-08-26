import React from 'react'
import './pageNumber.scss'
const PageNumber = ({ number, currentPage, setCurrentPage }) => {

    return (
        <div className={currentPage === number ? 'number_large' : 'number'}
            onClick={() => setCurrentPage(number)}
        >{number}</div>
    )
}

export default PageNumber