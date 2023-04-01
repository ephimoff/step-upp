export const generateSlug = (name: string): string => {
  if (!name) return '';
  const arr = name.split(' ');
  if (arr.length == 1) return arr[0];
  let slug = '';
  arr.map((e, index) => {
    if (index != arr.length - 1) {
      slug += e.toLowerCase() + '-';
    } else {
      slug += e.toLowerCase();
    }
  });
  return slug;
};

export const generateUniqueSlug = (slug: string): string => {
  const arr = slug.split('-'); // split slug into array by '-'
  const number = arr[arr.length - 1]; // get the last element of it
  let newArray: string[] = [];

  // if the last element is number then add 1 to it
  if (!isNaN(Number(number))) {
    arr.splice(arr.length - 1, 1, String(Number(number) + 1));
  } else {
    arr.push('1');
  }
  newArray = arr;
  let uniqueSlug: string = '';
  newArray.map((e, index) => {
    if (index != newArray.length - 1) {
      uniqueSlug += e + '-';
    } else {
      uniqueSlug += e;
    }
  });
  return uniqueSlug;
};

export const suggestName = (email: string): string => {
  const domain = email.split('@');
  const name = domain[1].split('.');
  return name[0].toUpperCase();
};

export const parseLinkedinUrl = (url: string): string => {
  const username = url.split('/in/');
  return username[1].split('/')[0];
};
export const parseTwitterUrl = (url: string): string => {
  if (url.includes('@')) {
    return url.split('@')[1];
  }
  return url;
};
export const parseGithubUrl = (url: string): string => {
  if (url.includes('github.com/')) {
    // const username = url.split('github.com/');
    return url.split('github.com/')[1].split('/')[0];
  }
  return url;
};
