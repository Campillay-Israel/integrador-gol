import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Avatar, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { auth } from "../components/firebase";
import { signOut } from "firebase/auth";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Usuario cerró sesión");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo y Título */}
        <Box display="flex" alignItems="center">
          <Avatar src="/logo192.png" alt="Logo" sx={{ width: 40, height: 40, mr: 1 }} />
          <Typography variant="h6" component={Link} to="/" color="inherit" sx={{ textDecoration: "none" }}>
            GESTIÓN LOGÍSTICA
          </Typography>
        </Box>

        {/* Usuario y Cerrar Sesión */}
        {user ? (
          <Box display="flex" alignItems="center">
            <Typography variant="body1" sx={{ mr: 1 }}>
              {user.email}
            </Typography>
            <Avatar sx={{ bgcolor: "secondary.main", width: 32, height: 32, mr: 2 }} />
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        ) : (
          <Button component={Link} to="/login" color="inherit">
            Iniciar Sesión
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;