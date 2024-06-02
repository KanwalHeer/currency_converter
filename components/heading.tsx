import React from 'react';

interface HeadingProps {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ as: Component = 'h1', children }) => {
  return <Component style={{ fontSize: '2em', margin: '0.5em 0',color:"white",fontWeight:"bolder" }}>{children}</Component>;
};

export default Heading;
