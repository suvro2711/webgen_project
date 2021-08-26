import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { useProducts } from '../../context'
import './searchBar.scss'

const SearchBar = () => {
    const { setSearchedProductString } = useProducts()
    return (<div className='search_container'>
        <div className='search_logo'>
            <SearchIcon color='disabled'></SearchIcon>
        </div>
        <input
            onChange={e => setSearchedProductString(e.target.value)}
            placeholder='Search'
            className='search_input'
        />
    </div>
    )
}

export default SearchBar