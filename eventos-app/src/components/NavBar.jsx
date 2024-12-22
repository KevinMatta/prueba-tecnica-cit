import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import './styles/NavBar.css';

function NavBar() {
  const navigate = useNavigate();

  //items de navbar
  const items = [
    { label: 'Inicio', icon: 'pi pi-home', command: () => navigate('/') },
    // { label: 'Buscar', icon: 'pi pi-search', command: () => navigate('/search') },
    {
      label: 'Crear Evento',
      icon: 'pi pi-plus',
      command: () => navigate('/create'),
    },
  ];

  return <Menubar className="p-menubar" model={items} />;
}

export default NavBar;
