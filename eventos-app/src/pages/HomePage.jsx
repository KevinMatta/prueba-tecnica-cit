import { useState, useEffect, useRef } from 'react';
import Grid from '../components/Grid';
import { getEvents } from '../services/EventService.js';
// import {eventos} from '../services/mock.js'
import { Toast } from 'primereact/toast';

function HomePage() {
  const [events, setEvents] = useState([]);
  const toast = useRef(null);

  //carga los eventos 1 vez
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  // actualiza la lista de eventos cuando se elimina un evento
  const handleRefresh = async () => {
    try {
      const eventsData = await getEvents();
      setEvents(eventsData);
      toast.current.show({
        severity: 'success',
        summary: 'Evento Eliminado',
        detail: 'El evento ha sido eliminado correctamente',
        life: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <h1 className="p-text-center">Eventos</h1>
      <Grid events={events} onRefresh={handleRefresh} />
    </div>
  );
}

export default HomePage;
