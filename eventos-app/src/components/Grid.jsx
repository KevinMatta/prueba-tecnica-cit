import EventCard from './EventCard';
import './styles/Grid.css';

function Grid({ events, onRefresh }) {
  //grid para mostrar eventos
  return (
    <div className="events-container">
      {events.map((event) => (
        <div key={event._id}>
          <EventCard event={event} onRefresh={onRefresh} />
        </div>
      ))}
    </div>
  );
}

export default Grid;
