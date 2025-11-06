import { createContext } from 'react';

export const TransitionContext = createContext({
  isOpen: false,
  title: '',
  durationMs: 4700,
  open: () => {},
  close: () => {},
  setFooterSlice: () => {},
});


