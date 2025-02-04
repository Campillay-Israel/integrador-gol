import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrden } from "../store/ordenesSlice";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const OrdenDetail = () => {
  const { id } = useParams();
  const orden = useSelector((state) =>
    state.ordenes.items.find((orden) => orden._id === id)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (!orden) {
      navigate("/");
    }
  }, [orden, navigate]);

  const handleDelete = () => {
    dispatch(deleteOrden(id));
    navigate("/");
  };

  if (!orden) return <Typography>Cargando...</Typography>;

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", textAlign: "center" }}>
        <CardContent>
        <Typography variant="h4" gutterBottom>
            Detalles de la Orden
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Destino:</strong> {orden.destino}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Contenido:</strong> {orden.contenido}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Estado:</strong> {orden.estado}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Creado por:</strong> {orden.creadoPor}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Modificado por:</strong> {orden.modificadoPor || "N/A"}
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button
              component={Link}
              to={`/edit/${orden._id}`}
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
              startIcon={<EditIcon />}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenDialog(true)}
              startIcon={<DeleteIcon />}
            >
              Eliminar
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Modal de Confirmación */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Está seguro de que quiere eliminar esta orden?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrdenDetail;