import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ConnectNav from "../components/ConnectNav";
import DashboardNav from "../components/DashboardNav"
import {HomeOutlined} from '@ant-design/icons'
import { toast } from 'react-toastify'
import { createConnectAccount } from "../actions/stripe";
import { deleteHotel, sellerHotels } from "../actions/hotel";
import SmallCard from "../components/cards/SmallCard";

const DashboardSeller = () => {
    const { auth } = useSelector((state) => ({ ...state }));
    const [loading, setLoading] = useState(false);
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        loadSellersHotels();
    }, []);

    const loadSellersHotels = async () => {
        let { data } = await sellerHotels(auth.token);
        setHotels(data);
    }

    const handleClick = async () => {
        setLoading(true)
        try {
            let res = await createConnectAccount(auth.token);
            window.location.href = res.data;
            
        } catch (error) {
            console.log(error);
            toast.error("Coneccion a Stripe fallida, Intentelo otra ves.");
            setLoading(false);
        }
    }

    const handleHotelDelete = async (hotelId) => {
        if (!window.confirm("Estas seguro?")) return;
        
        deleteHotel(auth.token, hotelId).then(res => {
            toast.success('Hotel Eliminado');
            loadSellersHotels();
        })
    }

    const connected = () => (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <h2>Tus Hoteles</h2>
                </div>
                <div className="col-md-2">
                    <Link to="/hotels/new" className="btn btn-primary">+ Agregar Nuevo</Link>
                </div>
            </div>
            <div className="row">
                {
                    hotels.map((h) => (
                        <SmallCard 
                            key={h._id} 
                            h={h} 
                            showViewMoreButton={false}
                            owner={true}
                            handleHotelDelete={handleHotelDelete} />
                    ))
                }
            </div>
        </div>
    )

    const notConnected = () => (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                    <div className="p-5 pointer">
                        <HomeOutlined className="h1" />
                        <h4>setup payouts to post hotel rooms</h4>
                        <p className="lead">
                            MERN partners with stripe to transfer earnings to your bank account  
                        </p>
                        <button 
                            disabled={loading}
                            onClick={handleClick} 
                            className="btn btn-primary mb-3">
                            { loading ? "Procesando..." : "Configurar Pagos" }
                        </button>
                        <p className="text-muted">
                            <small>
                                seras redirigido a Stripe para completar el proceso
                            </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <div className="container-fluid bg-secondary p-5">
                <ConnectNav />
            </div>

            <div className="container-fluid">
                <DashboardNav />
            </div>

            {
                auth && 
                auth.user && 
                auth.user.stripe_seller &&
                auth.user.stripe_seller.charges_enabled ?
                connected() : notConnected()
            }

        </>
    )
}

export default DashboardSeller;