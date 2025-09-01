export * from "./constants";

export const setItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    return console.error("can not store token in LS");
  }

  const valueToStore =
    typeof value !== "string" ? JSON.stringify(value) : value;

  localStorage.setItem(key, valueToStore);
};

export const getItemFromLocalStorage = (key) => {
  if(!key){
    return console.error('did not have token in LS');
  }  
  return localStorage.getItem(key);

};

export const removeItemFromLocalStorage = (key) =>{
  if(!key){
    return console.error('not able to find or remove the token-value from LS')
  }
  localStorage.removeItem(key);
}