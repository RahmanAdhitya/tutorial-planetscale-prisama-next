import * as React from 'react';

const GradientColor = () => {
  return {
    direction: {
      right: 'linear-gradient(90deg, rgba(132,94,194,1) 15%, rgba(0,142,155,0.7112068965517242) 76%)',
      radial: 'linear-gradient(5deg, rgba(0,129,207,1) 28%, rgba(0,142,155,1) 47%)',
    },
  };
  // if (direction === 'right') {
  //   return 'linear-gradient(to right, #845ec2, #4d7dda, #0095e0, #00a9da, #00b9cc, #00bdcf, #00c0d1, #00c4d4, #3abce5, #6db2e9, #95a7e1, #b39cd0)';
  // } else if (direction === 'bottom-top') {
  //   return 'linear-gradient(to right top, #845ec2, #8d69c5, #9775c8, #9f80ca, #a88ccd, #9d96d8, #90a0e1, #84aae7, #4bb5ec, #00bfe2, #00c6ca, #00c9a7)';
  // } else if (direction === 'top-buttom') {
  //   return 'linear-gradient(to right bottom, #845ec2, #8d69c5, #9775c8, #9f80ca, #a88ccd, #9d96d8, #90a0e1, #84aae7, #4bb5ec, #00bfe2, #00c6ca, #00c9a7)';
  // }
};

export default GradientColor;
