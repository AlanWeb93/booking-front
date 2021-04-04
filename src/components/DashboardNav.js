import { Link } from "react-router-dom"

const DashboardNav = () => {
    const active = window.location.pathname;

    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link
                    className={`nav-link ${active === "/dashboard" && "active"}`} 
                    to="/dashboard">Tus Libros</Link>
            </li>
            <li className="nav-item">
                <Link
                    className={`nav-link ${active === "/dashboard/seller" && "active"}`} 
                    to="/dashboard/seller">Tus Hoteles</Link>
            </li>
        </ul>
    )
}

export default DashboardNav;