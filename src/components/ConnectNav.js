import { useSelector } from 'react-redux'
import { Avatar, Card, Badge } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react';
import { currencyFormatter, getAccountBalance, payoutSetting } from '../actions/stripe';
import { SettingOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'

import 'moment/locale/es';
moment.locale('es');

const { Meta } = Card;
const { Ribbon } = Badge;

const ConnectNav = () => {
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState(0);
    const { auth } = useSelector((state) => ({ ...state }));
    const { user, token } = auth;

    useEffect(() => {
        getAccountBalance(auth.token).then(res => {
            setBalance(res.data);
        })
    }, [])

    const handlePayoutSettings = async () => {
        setLoading(true);

        try {
            const res = await payoutSetting(token);

            window.location.href = res.data.url;
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast("Acceso a configuracion desabilitada. Intentelo otra ves");
        }
    }

    return (
        <div className="d-flex justify-content-around">
            <Card>
                <Meta 
                    avatar={ <Avatar>{user.name[0]}</Avatar> } 
                    title={user.name} 
                    description={`Se unió ${moment(user.createdAt).fromNow()}`} />
            </Card>
            {
                auth &&
                auth.user &&
                auth.user.stripe_seller &&
                auth.user.stripe_seller.charges_enabled && (
                    <>
                        <Ribbon text="Disponible" color="grey">
                            <Card className="bg-light pt-1">
                                {balance && balance.pending && balance.pending.map((bp, i) => (
                                    <span key={i} className="lead">
                                        {currencyFormatter(bp)}
                                    </span>
                                ))}
                            </Card>
                        </Ribbon>
                        <Ribbon text="Pagos" color="silver">
                            <Card 
                                onClick={handlePayoutSettings}
                                className="bg-light pointer">
                                    <SettingOutlined className="h5 pt-2" />
                            </Card>
                        </Ribbon>
                    </>
                )
            }
        </div>
    )
}

export default ConnectNav;