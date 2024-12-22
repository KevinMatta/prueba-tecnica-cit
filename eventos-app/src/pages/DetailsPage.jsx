import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEvent } from '../services/EventService';
import { Card } from 'primereact/card';
import { ProgressSpinner } from 'primereact/progressspinner';

function DetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  //carga el evento a mostrar
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const event = await getEvent(id);
        setEvent(event);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  //cargando
  if (loading) {
    return (
      <div
        className="flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <ProgressSpinner />
      </div>
    );
  }

  //no se pudo cargar el evento
  if (!event) {
    return (
      <div
        className="flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <h3>Error: No se pudo cargar el evento</h3>
      </div>
    );
  }

  //evento cargado
  return (
    <div className="p-5">
      <div className="flex justify-content-center mb-5">
        <Card
          title={event.titulo}
          subTitle={`Categoría: ${event.categoria}`}
          className="w-full sm:w-12 md:w-12 lg:w-12 xl:w-12 shadow-3"
        >
          <p className="m-0 mb-3">
            <strong>Descripción:</strong> {event.descripcion}
          </p>
          <p className="m-0 mb-3">
            <strong>Fecha de inicio:</strong>{' '}
            {new Date(event.fecha_inicio).toLocaleDateString()}
          </p>
          <p className="m-0 mb-3">
            <strong>Fecha de fin:</strong>{' '}
            {new Date(event.fecha_fin).toLocaleDateString()}
          </p>
          {/*muestra unicamente si hay una festividada en esa fecha*/}
          {event.festividad && (
            <p className="m-0">
              <strong>Tambien se celebra:</strong> {event.festividad}
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}

export default DetailsPage;
