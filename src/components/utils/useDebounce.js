import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    //delay 후에 콜백함수 실행

    return () => {
      clearTimeout(timer);
    }; //value 변경 시점에 clearTimeout
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
