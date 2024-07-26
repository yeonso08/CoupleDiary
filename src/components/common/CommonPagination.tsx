import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination";
import { useNavigate } from 'react-router-dom';
import { ChevronDoubleLeft, ChevronDoubleRight } from "../../icons";

interface CommonPaginationProps {
    currentPage: number;
    total: number;
}

const CommonPagination = ({ currentPage, total }: CommonPaginationProps) => {
    const navigate = useNavigate();
    const totalPages = Math.ceil(total / 10) || 0;

    const visiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
        startPage = Math.max(1, endPage - visiblePages + 1);
    }

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    const handlePageChange = (page: number) => {
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        navigate(`?page=${page}`, { replace: false });
    };

    return (
        <Pagination>
            <PaginationContent className={'gap-0'}>
                {currentPage > 1 && (
                    <PaginationItem className={'hidden md:flex'}>
                        <PaginationLink className={'hidden md:flex'} onClick={() => handlePageChange(currentPage - 10)}>
                            <ChevronDoubleLeft />
                        </PaginationLink>
                        <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                    </PaginationItem>
                )}
                {pageNumbers.map(page => (
                    <PaginationItem key={page}>
                        <PaginationLink onClick={() => handlePageChange(page)} isActive={page === currentPage}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {currentPage <= totalPages - 3 && totalPages > 5 ? (
                    <>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink onClick={() => navigate(`?page=${totalPages}`)}>{totalPages}</PaginationLink>
                        </PaginationItem>
                    </>
                ) : null}
                {currentPage < totalPages && (
                    <PaginationItem className={'hidden md:flex'}>
                        <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                        <PaginationLink className={'hidden md:flex'} onClick={() => handlePageChange(currentPage + 10)}>
                            <ChevronDoubleRight />
                        </PaginationLink>
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
}

export default CommonPagination;
