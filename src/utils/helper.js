import axios from 'axios';
import SyncStorage from 'sync-storage';
export const BASE_URL = 'https://ravendel-backend.hbwebsol.com';

export const deleteProductVariation = (id) => {
  const token = SyncStorage.get('token') || '';
  return axios
    .post(
      `${BASE_URL}/api/misc/delete_variation`,
      {
        id: id,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    )
    .then(function (response) {
      if (response.data.success) {
        return Promise.resolve(true);
      }
    });
};

export const allPossibleCases = (arr) => {
  if (arr.length === 1) {
    let comb = [];
    for (const i of arr[0]) {
      comb.push([i]);
    }

    return comb;

    //return arr[0];
  } else {
    var result = [];
    var allCasesOfRest = allPossibleCases(arr.slice(1)); // recur with the rest of array
    for (var i = 0; i < allCasesOfRest.length; i++) {
      for (var j = 0; j < arr[0].length; j++) {
        let comb = [];
        comb.push(arr[0][j]);
        if (Array.isArray(allCasesOfRest[i])) {
          for (const k of allCasesOfRest[i]) {
            comb.push(k);
          }
        } else {
          comb.push(allCasesOfRest[i]);
        }
        result.push(comb);
      }
    }
    return result;
  }
};

export const unflatten = (arr) => {
  var tree = [],
    mappedArr = {},
    arrElem,
    mappedElem;

  // First map the nodes of the array to an object -> create a hash table.
  for (var i = 0, len = arr.length; i < len; i++) {
    arrElem = arr[i];
    mappedArr[arrElem.id] = arrElem;
    mappedArr[arrElem.id].children = [];
  }

  for (var id in mappedArr) {
    if (mappedArr.hasOwnProperty(id)) {
      mappedElem = mappedArr[id];
      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem.parentId) {
        mappedArr[mappedElem.parentId].children.push(mappedElem);
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem);
      }
    }
  }
  return tree;
};

export const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

export const getUpdatedUrl = async (table, url) => {
  const token = SyncStorage.get('token') || '';
  return axios
    .post(
      `${BASE_URL}/api/misc/checkurl`,
      {
        url: url,
        table: table,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    )
    .then(function (response) {
      if (response.data.success) {
        return Promise.resolve(response.data.url);
      }
    });
};
