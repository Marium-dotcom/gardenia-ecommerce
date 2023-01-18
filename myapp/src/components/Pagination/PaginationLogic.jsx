import React from 'react'
import Pagination from 'react-bootstrap/Pagination';

export default function PaginationLogic({currentPage,totalProducts,setCurrentPage,itemPerPage}) {

    const pagination_no = []


    function pgn(pagination_no) {

      setCurrentPage(pagination_no)
      
    }

    function nxtPgn(currentPage) {
      setCurrentPage(currentPage+1)

    }


    function prevPgn(currentPage) {
      setCurrentPage(currentPage-1)

    }
    for(let i = 1; i<= Math.ceil(totalProducts/itemPerPage); i++) {
        pagination_no.push(i)

    }

  return (
    <div className="d-flex justify-content-evenly">
            <Pagination className='text-center  mt-5'>
           
      <Pagination.Prev onClick={()=>prevPgn(currentPage)} className={currentPage === 1 ? `${"d-none"}`: null} />
  
        {pagination_no.map((no)=>{return (<>
          <Pagination.Item  onClick={()=>pgn(no) }>{no}</Pagination.Item>

    </>)})}
    <Pagination.Next  onClick={()=>nxtPgn(currentPage)} className={currentPage === pagination_no[pagination_no.length - 1]? `${"d-none"}`:null} />

    </Pagination>

 {/* Page  {currentPage} of {Math.ceil(totalPages)} */}
    </div>
  )
}
