import { createContext } from 'react';

export const TransitionContext = createContext({
  isOpen: false,
  title: '',
  durationMs: 1700,
  open: () => {},
  close: () => {},
  setFooterSlice: () => {},
});


