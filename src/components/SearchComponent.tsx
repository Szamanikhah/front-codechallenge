
import { TextField,InputAdornment,useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


interface Props {
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
    searchText:string;
    isDarkMode:boolean;

}

const SearchComponent: React.FC<Props> = ({handleSearch,searchText,isDarkMode}) => {

  const textColor1 = isDarkMode ? 'white' : '#b71c1c';
  const backgroundColor1 =  isDarkMode ? '#474745' : '#eeeeee';
  const isSmallScreen = useMediaQuery('(max-width:500px)');

  return(
    <TextField 
    label={isSmallScreen ? "" : "Search"}
    value={searchText}
    fullWidth
    variant="outlined"
    onChange={handleSearch}
    InputProps={{
      endAdornment: (
        <InputAdornment  position='start' >
          <SearchIcon  fontSize='large' sx={{color:textColor1}}/>
        </InputAdornment>
      ),
    }}
    sx={{width:'85%',backgroundColor:backgroundColor1,  color:textColor1,
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#eeeeee', // Default border color 
          color:textColor1  
         
        },
        '&:hover fieldset': {
          borderColor: '#757575', // Hovered border color
         
        },
        '&.Mui-focused fieldset': {
          borderColor: '#424242', // Focused border color
         
        },
      },
    }}
   

/>
  );


}


export default SearchComponent ;
