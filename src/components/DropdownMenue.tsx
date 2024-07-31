
import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import DensityMediumOutlinedIcon from '@mui/icons-material/DensityMediumOutlined';
import IconButton from '@mui/material/IconButton';

import {
    Paper,
    FormControlLabel,
    Checkbox,
    Box,
  } from '@mui/material';

  interface ColumnData {
    id: number;
    name: string;
    show: boolean;  
  }

interface props {
    ColumnDatas: ColumnData[];
    toggleColumn: (index:number) => void;
    isDarkMode:boolean;
}

const MenuListComposition:React.FC<props> = ({ColumnDatas,toggleColumn,isDarkMode}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const textColor = isDarkMode ? 'white' : 'black';
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  
  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row" spacing={2}>
      <Box sx={{zIndex:'10'}}>
        <IconButton
          ref={anchorRef}
          aria-label="toggle column"
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          sx = {{color:textColor}}
        >
          <DensityMediumOutlinedIcon/>
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper sx={{backgroundColor:'white'}} >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList 
                    sx={{display:'flex',flexDirection:'column',zIndex: 1}}
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                     {ColumnDatas.map(ColumnDatas=>( <FormControlLabel control={<Checkbox checked = {ColumnDatas.show} onChange={()=> toggleColumn(ColumnDatas.id)}/>} label={ColumnDatas.name} /> ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </Stack>
  );
}


export default MenuListComposition;