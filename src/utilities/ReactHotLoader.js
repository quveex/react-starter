import React from 'react';

const ReactHotLoader = process.env.NODE_ENV === 'production'
  ? ({ children }) => React.Children.only(children)
  : require('react-hot-loader').AppContainer;

export default ReactHotLoader;
