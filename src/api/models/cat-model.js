// mock data
const catItems = [
  {
    cat_id: 9592,
    cat_name: 'Frank',
    weight: 11,
    owner: 3609,
    filename: 'f3dbafakjsdfhg4',
    birthdate: '2021-10-12',
  },
  {
    cat_id: 9590,
    cat_name: 'Mittens',
    weight: 8,
    owner: 3602,
    filename: 'f3dasdfkjsdfhgasdf',
    birthdate: '2021-10-12',
  },
];

const listAllCats = () => {
  return catItems;
};

const findCatById = (id) => {
  return catItems.find((item) => item.cat_id == id);
};

const addCat = (cat, filename) => {
  const {cat_name, weight, owner, birthdate} = cat;
  const newId = catItems[0].cat_id + 1;
  catItems.unshift({
    cat_id: newId,
    cat_name,
    weight,
    owner,
    filename,
    birthdate,
  });
  return {cat_id: newId};
};

const removeCat = (id) => {
  const cat = findCatById(id);
  return cat ? catItems.pop(cat) : false;
};

const updateCat = (cat) => {
  // check if cat with id exists
  const oldCatData = findCatById(cat.cat_id);
  if (!oldCatData) {
    return null;
  }

  // keep old cat data and update with new data
  const updatedCat = {
    ...oldCatData,
    ...cat,
  };
  return updatedCat;
};

export {listAllCats, findCatById, addCat, removeCat, updateCat};
