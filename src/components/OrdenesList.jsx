import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdenes } from "../store/ordenesSlice";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
  Button,
  CircularProgress,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ListAltIcon from "@mui/icons-material/ListAlt"; // Icono para el título

import PendingIcon from "@mui/icons-material/Pending";
import TransitIcon from "@mui/icons-material/LocalShipping";
import DeliveredIcon from "@mui/icons-material/CheckCircle";
import DefaultIcon from "@mui/icons-material/HelpOutline";

const OrdenesList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.ordenes);
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    dispatch(fetchOrdenes());
  }, [dispatch]);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Pendiente":
        return "red";
      case "En tránsito":
        return "orange";
      case "Entregado":
        return "green";
      default:
        return "gray";
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case "Pendiente":
        return <PendingIcon fontSize="small" />;
      case "En tránsito":
        return <TransitIcon fontSize="small" />;
      case "Entregado":
        return <DeliveredIcon fontSize="small" />;
      default:
        return <DefaultIcon fontSize="small" />;
    }
  };

  const ordenesFiltradas =
    filtroEstado === "todos"
      ? items
      : items.filter((orden) => orden.estado === filtroEstado);

  if (status === "loading") {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Card sx={{ padding: 3, textAlign: "center" }}>
          <CircularProgress />
          <Typography mt={2}>Cargando...</Typography>
        </Card>
      </Box>
    );
  }
  if (status === "failed") return <Typography>Error: {error}</Typography>;

  return (
    <div style={{ margin: "40px" }}> {/* Aumenta la separación de la navbar */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        {/* Nuevo título con ícono */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Roboto Condensed", sans-serif',
            fontWeight: 700,
            fontSize: "1.8rem",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <ListAltIcon fontSize="large" color="primary" />
          Órdenes
        </Typography>

        {/* Filtro con íconos */}
       <FormControl variant="outlined" sx={{ minWidth: 200 }}>
  <InputLabel id="filtro-estado-label">Filtrar por estado</InputLabel>
  <Select
    labelId="filtro-estado-label"
    value={filtroEstado}
    onChange={(e) => setFiltroEstado(e.target.value)}
    label="Filtrar por estado"
    renderValue={(selected) => {
      const selectedIcon = getEstadoIcon(selected);
      return (
        <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
          <Typography>{selected}</Typography>
          {selectedIcon}
        </Box>
      );
    }}
  >
    <MenuItem value="todos">
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <ListItemText>Todos</ListItemText>
        <DefaultIcon fontSize="small" />
      </Box>
    </MenuItem>
    <MenuItem value="Pendiente">
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <ListItemText>Pendiente</ListItemText>
        <PendingIcon fontSize="small" />
      </Box>
    </MenuItem>
    <MenuItem value="En tránsito">
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <ListItemText>En tránsito</ListItemText>
        <TransitIcon fontSize="small" />
      </Box>
    </MenuItem>
    <MenuItem value="Entregado">
      <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
        <ListItemText>Entregado</ListItemText>
        <DeliveredIcon fontSize="small" />
      </Box>
    </MenuItem>
  </Select>
</FormControl>
      </Box>

      {/* Lista de órdenes */}
      <Box>
        {ordenesFiltradas.map((orden) => (
          <Card
            key={orden._id}
            sx={{
              
              margin: "0 auto",
              mb: 2,
              transition: "transform 0.3s ease-in-out, width 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              transform: hoveredCard === orden._id ? "scale(1.05)" : "scale(1)",
              width: hoveredCard === orden._id ? "95%" : "70%",
              boxShadow: hoveredCard === orden._id ? 5 : 2,
              overflow: "hidden",
              padding: "10px",
            }}
            onMouseEnter={() => setHoveredCard(orden._id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardContent>
              <Box display="flex" alignItems="center">
                <Avatar
                  sx={{
                    bgcolor: getEstadoColor(orden.estado),
                    width: 32,
                    height: 32,
                    mr: 2,
                  }}
                >
                  {getEstadoIcon(orden.estado)}
                </Avatar>
                <Box flexGrow={1}>
                  {/* Tipografía mejorada para el destino */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 600,
                      fontSize: "1.25rem",
                    }}
                  >
                    {orden.destino}
                  </Typography>
                  {hoveredCard === orden._id && (
                    <Typography variant="body2" color="text.secondary">
                      {orden.contenido}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary">
                    Estado: {orden.estado}
                  </Typography>
                </Box>
                {hoveredCard === orden._id && (
                  <Button
                    component={Link}
                    to={`/ordenes/${orden._id}`}
                    variant="outlined"
                    sx={{ mr: 2 }}
                  >
                    Ver Detalles
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Botón flotante para agregar nueva orden */}
      <Fab
        color="primary"
        aria-label="add"
        component={Link}
        to="/create"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default OrdenesList;