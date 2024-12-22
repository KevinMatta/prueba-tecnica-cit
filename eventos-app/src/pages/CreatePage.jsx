import EventForm from '../components/EventForm';
import { createEvent } from '../services/EventService';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
function CreatePage() {
  const toast = useRef(null);

  //guarda el evento
  const handleSave = async (data) => {
    try {
      const result = await createEvent(data);
      result &&
        toast.current.show({
          severity: 'success',
          summary: 'Exito',
          detail: 'Evento creado',
          life: 3000,
        });
    } catch {
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
      <h2>Crear Evento</h2>
      <EventForm onSave={handleSave} />
    </div>
  );
}

export default CreatePage;
