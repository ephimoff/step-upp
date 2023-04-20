import { Search as SearchIcon } from 'lucide-react';
import { Field, Form, Formik } from 'formik';
import { useState, useEffect, useCallback } from 'react';
import { fetcher } from '@/utils/fetch';

type Props = {
  returnSearchResults: any;
  page: number;
  workspaceId: string;
  setCurrentPage: any;
};

const Search = ({
  returnSearchResults,
  page,
  workspaceId,
  setCurrentPage,
}: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [success, setSuccess] = useState(false);

  const searchUsers = useCallback(
    async (value: string, workspaceId: string, page: number) => {
      const response = await fetcher(
        'searchUsers',
        `/api/profile?query=${value}&workspaceId=${workspaceId}&page=${page}`
      );
      const { searchResults, count } = response;
      // console.log('searchResults', searchResults);
      // console.log('count', count);
      returnSearchResults(searchResults, count);
      return { searchResults, count };
    },
    [returnSearchResults]
  );

  useEffect(() => {
    searchUsers('', workspaceId, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId, page]);

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          searchValue: searchValue,
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          searchUsers(values.searchValue, workspaceId, 1);
          setSubmitting(false);
        }}
      >
        {({ values, errors, isSubmitting, resetForm }) => (
          <Form className="flex">
            <div className="relative flex flex-1 items-center py-3">
              <Field
                name="searchValue"
                type="text"
                className="input border border-slate-400 bg-slate-300"
                placeholder="Search here..."
              />
              <button type="submit" className="absolute right-2">
                <SearchIcon className="text-slate-500" />
              </button>
            </div>

            <button
              type="reset"
              onClick={() => {
                setSearchValue('');
                setCurrentPage(1);
                searchUsers('', workspaceId, 1);
                setSuccess(false);
                resetForm;
              }}
              className="group ml-2 flex items-center text-gray-500 transition duration-700"
            >
              Reset
            </button>
          </Form>
        )}
      </Formik>
      {success && <p>Search results:</p>}
    </div>
  );
};
export default Search;
