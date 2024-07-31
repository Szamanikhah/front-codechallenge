
import DataTableContainer from './containers/dataTableContainer';
import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';



const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};


const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(event.target.checked);
  };

  const { width, height } = useWindowSize();
  const backgroundColor2 = isDarkMode ? '#21201F' : 'white';
  return (
      <Box style={{ backgroundColor:backgroundColor2,width: width ,height: height, display:'flex', alignItems:'flex-start',overflowY: 'auto', flexGrow: 1}}>
        <DataTableContainer isDarkMode={isDarkMode} handleChange={handleChange} />
      </Box>
  );
};
export default App;




