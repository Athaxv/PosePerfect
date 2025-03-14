import React from 'react'

import { ReactNode } from 'react';
import Provider from './provider';

function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Provider>
        {children}
        </Provider>
    </div>
  )
}

export default layout