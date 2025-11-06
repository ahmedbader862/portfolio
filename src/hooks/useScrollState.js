import { useContext } from 'react';
import { ScrollContext } from '../context/ScrollContext';

export function useScrollState() {
  return useContext(ScrollContext);
}




