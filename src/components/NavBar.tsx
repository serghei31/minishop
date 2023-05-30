import {
  AppBar,
  Badge,
  BadgeProps,
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useContext } from 'react';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import CartContext from '../contexts/cartContext';
import useCartItems from '../hooks/useCartItems';

const drawerWidth = 240;

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const StyledButton = styled(Button)({
  color: '#888B8B',
});

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { cartItems } = useContext(CartContext);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const cart = useCartItems();

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6">Minishop</Typography>
      <Divider />
      <List>
        <ListItem key={'Home'} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} href="/">
            <ListItemText primary={'Home'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Catalog'} disablePadding>
          <ListItemButton
            sx={{ textAlign: 'center' }}
            href="#"
            onClick={handleClick}
          >
            <ListItemText primary={'Catalog'} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary="Outdoor" />
            </ListItemButton>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary="Indoor" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItem key={'About'} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} href="#">
            <ListItemText primary={'About'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Blog'} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} href="#">
            <ListItemText primary={'Blog'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Contact'} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} href="#">
            <ListItemText primary={'Contact'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar
        position="static"
        sx={{ boxShadow: 0, background: '#fff', color: '#000' }}
      >
        <StyledToolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Minishop
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <StyledButton key={'Home'} href="/" sx={{ color: '#000' }}>
              Home
            </StyledButton>
            <StyledButton key={'Catalog'} href="#">
              Catalog
            </StyledButton>
            <StyledButton key={'About'} href="#">
              About
            </StyledButton>
            <StyledButton key={'Blog'} href="#">
              Blog
            </StyledButton>
            <StyledButton key={'Contact'} href="#">
              Contact
            </StyledButton>
          </Box>
          <IconButton aria-label="cart" href="/cart">
            <StyledBadge
              badgeContent={
                cartItems.length > 0 ? cartItems.length : cart.length
              }
              color="secondary"
              showZero
            >
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </StyledToolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default NavBar;
