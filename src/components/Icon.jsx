import React from 'react';

const ClimaIcon = ({ icon }) => {
  return (
    <img
      src={`http://openweathermap.org/img/w/${icon}.png`}
      alt="Clima Icon"
    />
  );
};

export default ClimaIcon;
