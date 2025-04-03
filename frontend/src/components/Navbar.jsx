import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import LightMode from '@mui/icons-material/LightMode'
import DarkMode from '@mui/icons-material/DarkMode'
import FormatListBulletedAddIcon from '@mui/icons-material/FormatListBulletedAdd';
import { Link } from 'react-router-dom'
const Navbar = ({theme,setTheme}) => {

  return (
    <AppBar position='sticky'>
        <Toolbar sx={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
            <Box component={Link} to={'/'} sx={{textDecoration:'none',color:'white'}}>
            <Typography variant='h6' sx={{fontSize: {md:'1.5rem',xs:'1.2rem',fontFamily:'cursive'}}}>
                Products Store 
            </Typography>
            </Box>
            <Box>
            <IconButton 
              component={Link}
              to='/create'
              sx={{
                borderRadius: "4px",
                mr:2,
                backgroundColor: theme === 'light' ? 'rgba(116, 153, 222, 0.63)' : '#444',
                color:'white'
              }}
            >
              <FormatListBulletedAddIcon />
            </IconButton>
            <IconButton
              sx={{
                borderRadius: "4px",
                backgroundColor: theme === "light" ? "rgba(116, 153, 222, 0.63)" : "#444",
                color: theme === "light" ? "orange" : "white",
                transition: "all 0.3s ease-in-out"
              }}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
                {theme==='light'? <LightMode /> : <DarkMode />}
            </IconButton>
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar