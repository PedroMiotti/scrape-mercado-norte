'use client';

import React, { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';

export function Providers({ children }: { children: React.ReactNode }) {

  return (
    <CacheProvider>
        <ChakraProvider>
          {children}
        </ChakraProvider>
    </CacheProvider>
  );
}
