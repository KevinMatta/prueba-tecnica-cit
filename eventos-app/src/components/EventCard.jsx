import { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { deleteEvent } from '../services/EventService';
import { useNavigate } from 'react-router-dom';
import './styles/EventCard.css';

function EventCard({ event, onRefresh }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const navigate = useNavigate();

  //elimina un evento
  const handleDelete = async () => {
    try {
      await deleteEvent(event._id);
      onRefresh(event._id);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  //botones de modal
  const deleteDialog = (
    <div>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => setShowDeleteDialog(false)}
        severity="danger"
        outlined
      />
      <Button
        label="Eliminar"
        icon="pi pi-check"
        onClick={handleDelete}
        autoFocus
        severity="danger"
      />
    </div>
  );

  return (
    <Card
      title={event.titulo}
      className="custom-card"
      style={{ width: '100%' }}
    >
      {/* no visualiza mas de 30 caracteres para que sea responsivo */}
      <p>
        {event.descripcion.length > 30
          ? `${event.descripcion.substring(0, 30)}...`
          : event.descripcion}
      </p>
      <p>
        <strong>Categoría:</strong> {event.categoria}
      </p>
      <p>
        <strong>Fecha:</strong> {new Date(event.fecha_inicio).toDateString()}{' '}
      </p>

      {/* Botones */}
      <div className="flex flex-row column-gap-2 justify-content-center">
        <Button
          label="Editar"
          icon="pi pi-pencil"
          className="p-button-warning"
          onClick={() => navigate(`/edit/${event._id}`)}
          size="small"
        />
        <Button
          label="Eliminar"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => setShowDeleteDialog(true)}
          size="small"
        />
        <Button
          label="Detalles"
          icon="pi pi-info-circle"
          onClick={() => navigate(`/details/${event._id}`)}
          size="small"
        />
      </div>

      {/* Modal de confirmacion */}
      <Dialog
        visible={showDeleteDialog}
        style={{ width: '450px' }}
        header="Confirmación"
        modal
        footer={deleteDialog}
        onHide={() => setShowDeleteDialog(false)}
      >
        <p>¿Estás seguro de que quieres eliminar este evento?</p>
      </Dialog>
    </Card>
  );
}

export default EventCard;
