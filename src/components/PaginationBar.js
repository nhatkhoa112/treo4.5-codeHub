import React from 'react';
import { Pagination } from 'react-bootstrap';


const PaginationBar = ({pageNumber,onSearchCodeHub, totalRound}) => {
    return (
        <div>
            <Pagination>
                <Pagination.First onClick={(e) => onSearchCodeHub(e , 1)} />
                <Pagination.Prev onClick={(e) => onSearchCodeHub(e , pageNumber-1)}/>
                {pageNumber > 1 && (<Pagination.Item onClick={(e) => onSearchCodeHub(e,pageNumber-1)}>
                    {pageNumber -1}
                </Pagination.Item>)
                }
                <Pagination.Item active onClick={(e) => onSearchCodeHub(e,pageNumber)}>{pageNumber}</Pagination.Item>
                <Pagination.Item onClick={(e) => onSearchCodeHub(e,pageNumber+1)}>{pageNumber +1}</Pagination.Item>
                <Pagination.Next onClick={(e) => onSearchCodeHub(e , pageNumber+1)} />
                <Pagination.Last  onClick={(e) => onSearchCodeHub(e , totalRound +1)} />
            </Pagination>
        </div>
    )
}

export default PaginationBar
