import React from 'react';

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
    const pages = [];

    // Loop from 1 to totalPages (not 0)
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="pagination flex justify-center items-center mt-7">
            {pages.map((page) => (
                <button
                    key={page}
                    /*{ if(currentPage == page){*/
                    /*    // className="p-5 cursor-pointer caret-amber-50"*/
                    /*}else{*/
                    /*    // className="p-5 cursor-pointer caret-amber-100"*/
                    /*}}*/
                     className ={`p-5 cursor-pointer  rounded-full ${currentPage === page? " bg-blue-400 ml-3" : "bg-white ml-3"}`}



                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;