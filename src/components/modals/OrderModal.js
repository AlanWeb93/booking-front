import {Modal} from 'antd';

const OrderModal = ({session, orderedBy, showModal, setShowModal}) => {
    return (
        <Modal 
            visible={showModal}
            title="Informacion orden de pago"
            onCancel={() => setShowModal(!showModal)}
         >
             <p>intento de pago: {session.payment_intent} </p>
             <p>estado de pago: {session.payment_status} </p>
             <p>
                monto total: {session.currency.toUpperCase()}{" "}
                {session.amount_total / 100}
             </p>
             <p>Id cliente Stripe: {session.customer} </p>
             <p>Cliente: {orderedBy.name} </p>
        </Modal>
    )
}

export default OrderModal;