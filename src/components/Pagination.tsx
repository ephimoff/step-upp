import { ChevronLeft, ChevronRight } from 'lucide-react';
import { searchPerPage } from '@/data/data';

type Props = {
  resultsCount: number;
  currentPage: number;
  setCurrentPage: any;
};

const Pagination = ({ resultsCount, currentPage, setCurrentPage }: Props) => {
  const finalPage = Math.ceil(resultsCount / searchPerPage);
  const prevPage = Math.max(currentPage - 1, 0);
  // const nextPage = Math.min(currentPage + 1, finalPage);

  const goToPage = (page: number) => {
    console.log('page', page);
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-between">
      <button
        className={`${
          !prevPage && 'btn-disabled text-gray-400 dark:text-gray-700'
        } btn btn-sm`}
        disabled={!prevPage}
        onClick={() => goToPage(currentPage - 1)}
      >
        <ChevronLeft size={18} />
        Previous page
      </button>
      <button
        className={`${
          currentPage === finalPage &&
          'btn-disabled text-gray-400 dark:text-gray-700'
        } btn btn-sm`}
        disabled={currentPage === finalPage}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next page
        <ChevronRight size={18} />
      </button>
    </div>
  );
};
export default Pagination;
