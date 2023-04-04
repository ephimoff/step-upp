import { Search as SearchIcon, RefreshCw } from 'lucide-react';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { log } from 'next-axiom';

type Props = {
  returnSearchResults: any;
  showAll: any;
  workspaceId: string;
};

const Search = ({ returnSearchResults, showAll, workspaceId }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [success, setSuccess] = useState(false);

  const searchUsers = async (value: string, workspaceId: string) => {
    const functionName = 'searchUsers';
    const url = `/api/profile?query=${value}&workspaceId=${workspaceId}`;
    const method = 'GET';
    try {
      const response = await fetch(url);
      log.info(
        `${functionName} function -  ${method} ${url} response: ${response.status}`
      );
      if (response.status < 300) {
        log.debug(
          `${functionName} function - ${method} ${url} response: `,
          response
        );
        setSuccess(true);
      }
      const searchResponse = await response.json();
      // console.log('response', searchResponse);

      returnSearchResults(searchResponse);
      return searchResponse;
    } catch (error) {
      log.error(`${functionName} function - ${method} ${url} error: ${error}`);
    }
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          searchValue: searchValue,
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          searchUsers(values.searchValue, workspaceId);
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
                showAll();
                setSuccess(false);
                resetForm;
              }}
              className="group ml-2 flex items-center text-gray-500 transition duration-700"
            >
              Reset
              {/* <RefreshCw size={16} className="group-hover:animate-spin" /> */}
            </button>
          </Form>
        )}
      </Formik>
      {success && <p>Search results:</p>}
    </div>
  );
};
export default Search;
