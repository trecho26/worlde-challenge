const useLocalStorage = () => {
  const getValue = (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch (err) {
      console.error("Couldn't find value");
    }
  };
  const setValue = (key: string, value: string) => {
    try {
      return localStorage.setItem(key, value);
    } catch (err) {
      console.error("Couldn't store value");
    }
  };
  const removeValue = (key: string) => {
    try {
      return localStorage.removeItem(key);
    } catch (err) {
      console.error("Couldn't remove value");
    }
  };

  return { getValue, setValue, removeValue };
};

export default useLocalStorage;
