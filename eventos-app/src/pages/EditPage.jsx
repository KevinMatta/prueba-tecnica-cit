import EventForm from '../components/EventForm';
import { updateEvent } from '../services/EventService';
import { useRef, useEffect, useState } from 'react';
import { Toast } from 'primereact/toast';
import { useParams } from 'react-router-dom';
import { getEvent } from '../services/EventService';
function EditPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  //carga el evento del id que se va editar
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await getEvent(id);
        setEvent(event);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvent();
  }, [id]);

  const toast = useRef(null);

  //actualiza valores del evento
  const handleSave = async (data) => {
    try {
      const result = await updateEvent(id, data);
      result &&
        toast.current.show({
          severity: 'success',
          summary: 'Exito',
          detail: 'Evento creado',
          life: 3000,
        });
    } catch (error) {
      console.error(error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo crear el evento',
        life: 3000,
      });
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      {event ? (
        <div>
          <h2>Editar Evento</h2>
          <EventForm data={event} onSave={handleSave} />
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default EditPage;
