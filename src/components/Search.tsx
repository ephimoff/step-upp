import { Search as SearchIcon, RefreshCw } from 'lucide-react';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

type Props = {
  returnSearchResults: any;
  showAll: any;
};

const Search = ({ returnSearchResults, showAll }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [success, setSuccess] = useState(false);

  const searchUsers = async (value: string) => {
    try {
      const response = await fetch(`/api/profile?query=${value}`);
      if (response.status === 200) {
        setSuccess(true);
      }
      const searchResponse = await response.json();
      // console.log('searchResponse', searchResponse);

      returnSearchResults(searchResponse);
      return searchResponse;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        searchValue: searchValue,
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        searchUsers(values.searchValue);
        // returnSearchResults(21);
        // console.log(result);
        setSubmitting(false);
      }}
    >
      {({ values, errors, isSubmitting }) => (
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
            type="button"
            onClick={() => {
              setSearchValue('');
              showAll();
            }}
            className="group ml-2 flex items-center transition duration-700"
          >
            <RefreshCw size={16} className="group-hover:animate-spin" />
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default Search;
