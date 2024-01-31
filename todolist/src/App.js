import React from 'react';
import Todo from './Todo';
import { GlobalStyle } from './styled';

const App = () => {
  return (
    <div>
      <GlobalStyle />
      <Todo />
    </div>
  );
};

export default App;
