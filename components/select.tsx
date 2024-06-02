import React from 'react';

interface CustomSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, children }) => {
  return (
    <select className='bg-gray-200 p-16 rounded-md font-bold shadow-lg' value={value} onChange={onChange} style={{ padding: '0.5em', margin: '0.5em 0', width: '100%', }}>
      {children}
    </select>
  );
};

export default CustomSelect;
