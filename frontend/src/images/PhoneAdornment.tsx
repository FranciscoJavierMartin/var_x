import React from 'react';

interface PhoneAdornmentProps {
  color?: string;
}

const PhoneAdornment: React.FC<PhoneAdornmentProps> = ({ color }) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25.173 25.122'>
    <path
      fill='none'
      stroke={color || '#fff'}
      strokeMiterlimit='10'
      strokeWidth='2'
      d='M23.509 19.127a20.48 20.48 0 00-4.074-2.721c-1.356-.683-1.468-.739-2.534.053-.711.528-1.184 1-2.016.823a10.8 10.8 0 01-4.222-2.755 11.155 11.155 0 01-2.82-4.268c-.178-.829.3-1.3.825-2.009.738-1 .682-1.172.051-2.528A18.546 18.546 0 005.99 1.659c-.959-.947-.959-.78-1.577-.523a8.938 8.938 0 00-1.441.768 4.319 4.319 0 00-1.735 1.827c-.347.741-.5 2.477 1.287 5.728a28.374 28.374 0 005.644 7.505 30.883 30.883 0 007.519 5.624c3.614 2.024 5 1.63 5.743 1.284a4.3 4.3 0 001.832-1.73 8.877 8.877 0 00.77-1.44c.259-.613.426-.613-.523-1.575z'
    ></path>
  </svg>
);

export default PhoneAdornment;
