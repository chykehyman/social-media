import { Popup } from 'semantic-ui-react';
import React from 'react';

const ToolTip = ({ content, children }) => (
  <Popup inverted content={content} trigger={children} />
);

export default ToolTip;
