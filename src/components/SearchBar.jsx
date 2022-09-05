import React from 'react'

function SearchBar(props) {
    return (
        <form className="Search-form" >
            <label htmlFor="searchBar" className='Search-label' >
                <input
                    placeholder='search'
                    type="text"
                    id="searchBar"
                    value={props.value}
                    onChange={props.onChange}
                />
            </label>

        </form>

    )
}

export default SearchBar