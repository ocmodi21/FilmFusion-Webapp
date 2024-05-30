export default function useStorage() {
  const setDataToStorage = (key: string, data: string) => {
    localStorage.setItem(key, data);
  };

  const getDataFromStorage = (key: string) => {
    return localStorage.getItem(key);
  };

  const removeDataFromStorage = (key: string) => {
    return localStorage.removeItem(key);
  };

  const clearDataFromStorage = () => {
    return localStorage.clear();
  };

  return {
    setDataToStorage,
    getDataFromStorage,
    removeDataFromStorage,
    clearDataFromStorage,
  };
}
