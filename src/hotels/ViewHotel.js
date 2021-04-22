import React, { useEffect, useState } from 'react'
import { diffDays, isAlreadyBooked, read } from '../actions/hotel';
import moment from 'moment';
import { getSessionId } from '../actions/stripe';
import {loadStripe} from '@stripe/stripe-js';
import { useSelector } from 'react-redux';

const ViewHotel = ({ match, history }) => {
    const [hotel, setHotel] = useState({});
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [alreadyBooked, setAlreadyBooked] = useState(false);

    const {auth} = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadSellerHotel();
    }, []);

    const loadSellerHotel = async () => {
        let res = await read(match.params.hotelId);

        setHotel(res.data);
        setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
    }

    useEffect(() => {
        if (auth && auth.token) {
            isAlreadyBooked(auth.token, match.params.hotelId)
                .then((res) => {
                    if (res.data.ok) setAlreadyBooked(true);
                });
        }
    }, []);

    const handleClick = async (e) => {
        e.preventDefault();

        if (!auth || !auth.token) {
            history.push("/login");
            return;
        }

        setLoading(true);
        if (!auth) history.push('/login');
        
        let res = await getSessionId(auth.token, match.params.hotelId);
        
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
        
        stripe.redirectToCheckout({
            sessionId: res.data.sessionId,
        })
        .then((result) => console.log(result))
    }

    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h2>{hotel.title}</h2>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <br />
                        <img
                            src={image}
                            alt={hotel.title}
                            className="img img-fluid m-2" />
                    </div>
                    <div className="col-md-6">
                        <br />
                        <b>{hotel.content}</b>
                        <p className="alert alert-info mt-3">{hotel.price}</p>
                        <p className="card-text">
                            <span className="float-right text-primary">
                                por {diffDays(hotel.from, hotel.to)}{" "}
                                {diffDays(hotel.from, hotel.to) <= 1 ? " dia" : " dias"}
                            </span>
                        </p>
                        <p>
                            Desde <br /> {" "} 
                            {moment(new Date(hotel.from)).format('MMMM Do YYYY, h:mm:ss a')}
                        </p>
                        <p>
                            Hasta <br /> {" "} 
                            {moment(new Date(hotel.to)).format('MMMM Do YYYY, h:mm:ss a')}
                        </p>
                        <i>Posteado por {hotel.postedBy && hotel.postedBy.name}</i>
                        <br />
                        <button 
                            onClick={handleClick} 
                            className="btn btn-block btn-lg btn-primary mt-3"
                            disabled={loading || alreadyBooked}>
                            {
                                loading 
                                ? "Espere..."
                                : alreadyBooked
                                ? "Ya esta reservado"
                                : auth && auth.token ? "Reservar Ahora" : "iniciar sesión para reservar"
                            }
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
 
export default ViewHotel
