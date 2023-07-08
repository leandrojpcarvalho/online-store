import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="nada">
      <h2> Nada por aqui! </h2>
      <button className="button" onClick={ () => navigate('/') }>Retornar</button>
    </div>
  );
}

export default NotFound;
