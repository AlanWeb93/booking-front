import { LoadingOutlined } from '@ant-design/icons'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInLocalStorage } from '../actions/auth';
import { getAccountStatus } from '../actions/stripe';

const StripeCallback = ({history}) => {
    const { auth } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth && auth.token) accountStatus()
    }, [auth])

    const accountStatus = async () => {
        try {
            const res = await getAccountStatus(auth.token);
            console.log("estado de cuanta de usuario en stripe callback", res);
            updateUserInLocalStorage(res.data, () => {
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: res.data
                });

                window.location.href = "/dashboard/seller";
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="d-flex justify-content-center p-5">
            <LoadingOutlined className="display-1 p-5 text-danger" />
        </div>
    ) 
}

export default StripeCallback;