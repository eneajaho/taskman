import React from 'react'

function SearchField({ searchChange }) {
    return (
        <div>
            <input
                className="search-field shadow"
                type="search"
                placeholder="Search Projects"
                onChange={searchChange}
            />
        </div>
    )
}

export default SearchField
