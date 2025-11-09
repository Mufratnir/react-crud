import React, { useEffect, useState } from "react";

const Search = ( props) => {

    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const value = searchValue.toLowerCase();

        const filtered = props.data.filter((row) => {
            const name = row.name?.toLowerCase() || "";
            const email = row.email?.toLowerCase() || "";
            return name.includes(value) || email.includes(value);
        });

        props.onFilter(filtered);
    }, [searchValue, props.data]);

    return (
        <div className="search-box relative">
            <input
                id="search"
                placeholder="Search user ....."
                className="bg-white h-12 pl-10 pr-2.5 rounded-4xl w-full outline-none"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className="search-icon absolute top-[14px] left-[13px]">
                <span className="material-symbols-outlined">search</span>
            </div>
        </div>
    );
};

export default Search;