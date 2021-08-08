import React from 'react';

interface ListProps {
  color?: string;
}

const List: React.FC<ListProps> = ({ color }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 29 20'
    width='29'
    height='20'
  >
    <g
      fill='none'
      stroke={color || '#99b898'}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      transform='translate(1 1.43)'
    >
      <path d='M7 .57h20m-20 8h20m-20 8h20'></path>
      <circle cx='1' cy='1' r='1' transform='translate(0 -.43)'></circle>
      <circle cx='1' cy='1' r='1' transform='translate(0 7.57)'></circle>
      <circle cx='1' cy='1' r='1' transform='translate(0 15.57)'></circle>
    </g>
  </svg>
);

export default List;
