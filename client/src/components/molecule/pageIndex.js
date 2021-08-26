import React from 'react'
import PageNumber from '../atoms/pageNumber'
import './pageIndex.scss'

const PageIndex = ({ numberOfPages, setCurrentPage, currentPage }) => {

    const pages = []
    for (let i = 1; i <= numberOfPages; i++) {
        pages.push(i)
    }
    return (
        <div className='pageIndex'>
            {pages.map(pageNumber =>
                <PageNumber
                    key={pageNumber}
                    number={pageNumber}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            )}
        </div>
    )
}

export default PageIndex