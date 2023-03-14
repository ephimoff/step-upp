export function generateSlug(name: string) {
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
}

export function generateUniqueSlug(slug: string) {
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
}

export function suggestName(email: string) {
  const domain = email.split('@');
  const name = domain[1].split('.');
  return name[0].toUpperCase();
}
