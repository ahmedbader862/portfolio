import { useContext } from 'react';
import { PointerContext } from '../context/PointerContext';

export function usePointer() {
  return useContext(PointerContext);
}


