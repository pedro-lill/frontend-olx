import React from 'react';
import { ModalLayout } from './styled';

const Modal = ({ modalOpen, setModalOpen }) => {

    return (
        <>
            <ModalLayout className={`${!modalOpen ? "closed" : "open"}`}  >
                <div className= "modal" >
                    <div className="header">
                        <button onClick={() => setModalOpen(false)} className='close'>X</button>
                    </div>
                    <div className="body">
                        Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Ex nisi impedit necessitatibus,
                        voluptatum ea ut atque minus!
                        Quo ipsum necessitatibus odit facilis qui soluta,
                        eos ipsa dolorem quas, dignissimos saepe.

                    </div>
                    <div className="footer">
                        <button>Alterar cadastro</button>
                    </div>

                </div>
            </ModalLayout>

        </>
    )


}

export default Modal;