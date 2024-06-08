import { useRef } from 'react';

const useArrayRef = () => {
  const arrayRef = useRef([]);
  arrayRef.current = [];
  return [arrayRef, (ref) => ref && arrayRef.current.push(ref)];
};

export default useArrayRef;
