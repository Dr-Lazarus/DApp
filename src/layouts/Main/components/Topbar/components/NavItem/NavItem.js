import React, { useState, useEffect, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const NavItem = ({ items, colorInvert = false }) => {
  const theme = useTheme();
  const [activeLink, setActiveLink] = useState('');
  let role = null;
  

  useEffect(() => {
    setActiveLink(window && window.location ? window.location.pathname : '');
    const userAddress = localStorage.getItem('Address');
    role = localStorage.getItem('Role');
    console.log(userAddress)
    console.log(role)
  }, []);

  return (
    <Box>
      {items.map((p, i) => (
        (role == 2 && p.title =="Create Campaign") ? null:(
        <Button
          component={'a'}
          href={p.href==="Register" ?null : p.href}
          key={i}
          sx={{
            marginLeft: 4,
            justifyContent: 'flex-start',
            color:
              activeLink === p.href
                ? theme.palette.primary.main
                : theme.palette.text.primary,
            backgroundColor:
              activeLink === p.href
                ? alpha(theme.palette.primary.main, 0.1)
                : 'transparent',
            fontWeight: activeLink === p.href ? 700 : 500,

          }}
          onClick={p.onClick ===p.href? null : p.onClick}
        >
          {p.title}
          {p.isNew && (
            <Box
              padding={0.5}
              display={'inline-flex'}
              borderRadius={1}
              bgcolor={'primary.main'}
              marginLeft={2}
            >
              <Typography
                variant={'caption'}
                sx={{ color: 'common.white', lineHeight: 1 }}
              >
                new
              </Typography>
            </Box>
          )}
        </Button>)
      ))}
    </Box>
  );
};

NavItem.propTypes = {
  items: PropTypes.array.isRequired,
  colorInvert: PropTypes.bool,
};

export default NavItem;