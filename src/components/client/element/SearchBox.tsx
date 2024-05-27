'use client'

import { FaSearch } from "react-icons/fa";
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

function SearchBox() {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const handleSubmit = (e: any) => {
        e.preventDefault();
        router.push(`/search/${search}`);
    };

    return (
        <>
            <div className="box">
                <form name="search" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder=""
                        className="navbar__input"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button disabled={search === ''} type="submit">
                        <FaSearch className="navbar__search" />
                    </button>
                </form>
            </div>
        </>
    )
}

export default SearchBox;
