import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <h2> Nada por aqui! </h2>
      <button onClick={ () => navigate('/') }>Retornar</button>
    </>
  );
}

export default NotFound;
