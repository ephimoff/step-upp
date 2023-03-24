import { Search as SearchIcon, RefreshCw } from 'lucide-react';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

type Props = {
  returnSearchResults: any;
  showAll: any;
  workspaceId: string;
};

const Search = ({ returnSearchResults, showAll, workspaceId }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [success, setSuccess] = useState(false);

  const searchUsers = async (value: string, workspaceId: string) => {
    try {
      const response = await fetch(
        `/api/profile?query=${value}&workspaceId=${workspaceId}`
      );
      if (response.status === 200) {
        setSuccess(true);
      }
      const searchResponse = await response.json();

      returnSearchResults(searchResponse);
      return searchResponse;
    } catch (error) {
      console.error(error);
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
              className="group ml-2 flex items-center transition duration-700"
            >
              <RefreshCw size={16} className="group-hover:animate-spin" />
            </button>
          </Form>
        )}
      </Formik>
      {success && <p>Search results:</p>}
    </div>
  );
};
export default Search;
