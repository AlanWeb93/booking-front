import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userHotelBookings } from "../actions/hotel";
import BookingCard from "../components/cards/BookingCard";
import ConnectNav from "../components/ConnectNav";
import DashboardNav from "../components/DashboardNav"

const Dashboard = () => {
    const [booking, setBooking] = useState([]);
    const { auth } = useSelector((state) => ({ ...state }));
    const { token } = auth;

    useEffect(() => {
        loadUserBookings();
    }, []);

    const loadUserBookings = async () => {
        const res = await userHotelBookings(token);
        setBooking(res.data);
    }

    return (
        <>
            <div className="container-fluid bg-secondary p-5">
                <ConnectNav />
            </div>

            <div className="container-fluid">
                <DashboardNav />
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Tus Reservaciones</h2>
                    </div>
                    <div className="col-md-2">
                        <Link to="/" className="btn btn-primary">Buscar Hoteles</Link>
                    </div>
                </div>
            </div>
            <div className="row">
                {
                    booking.map(b => (
                        <BookingCard 
                            key={b._id} 
                            hotel={b.hotel} 
                            session={b.session}
                            orderedBy={b.orderedBy}
                         />
                    ))
                }
            </div>
        </>
    )
}

export default Dashboard;