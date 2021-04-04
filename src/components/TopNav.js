import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom"

const TopNav = () => {
  const dispatch = useDispatch();
  const {auth} = useSelector((state) => ({...state}));
  const history = useHistory();

  const logout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: null
    });
    localStorage.removeItem('auth');
    history.push("/login");
  }

  return (
    <div className="nav bg-light d-flex justify-content-between">
      <Link className="nav-link" to="/">
        Inicio
      </Link>

      {
        auth !== null && (
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        )
      }

      {
        auth !== null && (
          <a 
            className="nav-link pointer"
            onClick={logout}>
            Cerrar Sesion
          </a>
        )
      }

      {
        auth === null && (
          <>
            <Link className="nav-link" to="/login">
              Iniciar Sesion
            </Link>
            <Link className="nav-link" to="/register">
              Registrar
            </Link>
          </>
        )
      }
    </div>
  )
}

export default TopNav;