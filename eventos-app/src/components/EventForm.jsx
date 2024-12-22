import { useState, useRef, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
import { useNavigate } from 'react-router-dom';

const EventForm = ({ data, onSave }) => {
  const navigate = useNavigate();
  //valores de formulario
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    fecha_inicio: null,
    fecha_fin: null,
    categoria: '',
  });
  //mensajes de error
  const [errors, setErrors] = useState({
    titulo: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    categoria: '',
  });

  //carga valores de formulario al editar
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFormData({
        ...data,
        fecha_inicio: data.fecha_inicio ? new Date(data.fecha_inicio) : null,
        fecha_fin: data.fecha_fin ? new Date(data.fecha_fin) : null,
      });
    }
  }, [data]);

  const toast = useRef(null);

  //actualiza valores de inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  //actualiza valores de fechas
  const handleDateChange = (e, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: e.value,
    }));
  };

  // Validaciones del formulario
  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    if (!formData.titulo) {
      formErrors.titulo = 'El título es requerido';
      valid = false;
    }
    if (!formData.descripcion) {
      formErrors.descripcion = 'La descripción es requerida';
      valid = false;
    }
    if (!formData.fecha_inicio) {
      formErrors.fecha_inicio = 'La fecha de inicio es requerida';
      valid = false;
    }
    if (!formData.fecha_fin) {
      formErrors.fecha_fin = 'La fecha de fin es requerida';
      valid = false;
    }
    if (
      formData.fecha_inicio &&
      formData.fecha_fin &&
      formData.fecha_inicio > formData.fecha_fin
    ) {
      formErrors.fecha_fin =
        'La fecha de fin debe ser mayor a la fecha de inicio';
      valid = false;
    }
    if (!formData.categoria) {
      formErrors.categoria = 'La categoría es requerida';
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  //envia formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      // const result = await createEvent(formData);
      setFormData({
        titulo: '',
        descripcion: '',
        fecha_inicio: null,
        fecha_fin: null,
        categoria: '',
      });
      setErrors({
        titulo: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        categoria: '',
      });
      navigate('/');
    } else {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete todos los campos requeridos',
        life: 3000,
      });
    }
  };

  return (
    <div className="card">
      <Toast ref={toast} />
      {/* formulario */}
      <form onSubmit={handleSubmit}>
        <div className="formgrid grid">
          <div className="field col-12 md:col-6 p-fluid">
            <label htmlFor="titulo">Título</label>
            <InputText
              id="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Título del evento"
              className={errors.titulo ? 'p-invalid' : ''}
            />
            {errors.titulo && (
              <small className="p-error">{errors.titulo}</small>
            )}
          </div>

          <div className="field col-12 md:col-6 p-fluid">
            <label htmlFor="fecha_inicio">Fecha de inicio</label>
            <Calendar
              id="fecha_inicio"
              value={formData.fecha_inicio}
              onChange={(e) => handleDateChange(e, 'fecha_inicio')}
              dateFormat="yy-mm-dd"
              showIcon
              className={errors.fecha_inicio ? 'p-invalid' : ''}
            />
            {errors.fecha_inicio && (
              <small className="p-error">{errors.fecha_inicio}</small>
            )}
          </div>

          <div className="field col-12 md:col-6 p-fluid">
            <label htmlFor="categoria">Categoría</label>
            <Dropdown
              id="categoria"
              value={formData.categoria}
              onChange={handleChange}
              options={[
                { label: 'Tecnologia', value: 'tecnologia' },
                { label: 'Musica', value: 'musica' },
                { label: 'Arte', value: 'arte' },
              ]}
              placeholder="Selecciona una categoria"
              className={errors.categoria ? 'p-invalid' : ''}
            />
            {errors.categoria && (
              <small className="p-error">{errors.categoria}</small>
            )}
          </div>

          <div className="field col-12 md:col-6 p-fluid">
            <label htmlFor="fecha_fin">Fecha de fin</label>
            <Calendar
              id="fecha_fin"
              value={formData.fecha_fin}
              onChange={(e) => handleDateChange(e, 'fecha_fin')}
              dateFormat="yy-mm-dd"
              showIcon
              className={errors.fecha_fin ? 'p-invalid' : ''}
            />
            {errors.fecha_fin && (
              <small className="p-error">{errors.fecha_fin}</small>
            )}
          </div>

          <div className="field col-12 p-fluid">
            <label htmlFor="descripcion">Descripción</label>
            <InputText
              id="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción del evento"
              className={errors.descripcion ? 'p-invalid' : ''}
            />
            {errors.descripcion && (
              <small className="p-error">{errors.descripcion}</small>
            )}
          </div>
        </div>

        <Button type="submit" label="Crear Evento" className="p-mt-2" />
      </form>{' '}
      {/*Fin de formulario*/}
    </div>
  );
};

export default EventForm;
