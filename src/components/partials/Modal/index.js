import React, { useState, useRef, useEffect } from 'react';
import { ModalLayout } from './styled';
import { useHistory } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { ErrorMessage } from '../../MainComponents';
import useApi from '../../../helpers/OlxAPI';


const Modal = ({ modalOpen, setModalOpen, data, setData }) => {

    const api = useApi();
    const fileField = useRef();
    const history = useHistory();
    const [categories, setCategories] = useState([]);   // categories is an array of objects
    const [disabled, setDisabled] = useState(false); // disable the button when the user clicks on it
    const [error, setError] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, [api]);
    const modalWrapper = useRef();


    function closeModal() {
        setModalOpen(false);
    }

    function handleOutsideClick(e) {
        if (e.target === modalWrapper.current) {
            closeModal();
        }
    }

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors = [];
        if (!data.title.trim()) {
            errors.push('Sem título');
        }
        if (!data.category) {
            errors.push('Sem categoria');
        }
        if (!data.price) {
            errors.push('Sem preço');
        }
        if (!data.description.trim()) {
            errors.push('Sem descrição');
        }
        if (errors.length === 0) {
            // send to API
            const fData = new FormData();
            fData.append('title', data.title);
            fData.append('price', data.price);
            fData.append('priceneg', data.priceNegotiable);
            fData.append('desc', data.description);
            fData.append('cat', data.category);

            if (fileField.current.files.length > 0) {
                for (let i = 0; i < fileField.current.files.length; i++) {
                    fData.append('img', fileField.current.files[i]);
                }
            }

            const json = await api.updateAd(fData, data._id);

            if (!json.error) {
                history.push(`/ad/${data._id}`);
                return;
            } else {
                setError(json.error);
            }

        } else {
            setError(errors.join("\n"));
        }

        setDisabled(false);
    }


    const priceMask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ','
    });


    return (
        <>
            <ModalLayout ref={modalWrapper} onClick={handleOutsideClick} className={`${!modalOpen ? "closed" : "open"}`}  >
                <div className="modal" >
                    <div className="header">
                        <div className="left">
                            <h1>Edite o Anúncio</h1>
                        </div>
                        <div className="right">
                            <button onClick={() => setModalOpen(false)} className='close'>X</button>
                        </div>
                    </div>
                    <div className="body">
                        {error &&
                            <ErrorMessage>{error}</ErrorMessage>
                        }
                        <form onSubmit={(e) => handleSubmit(e, data)}>
                            <label className='area'>
                                <div className='area--title'>Titulo</div>
                                <div className='area--input'>
                                    <input
                                        type='text'
                                        disabled={disabled}
                                        value={data.title}
                                        onChange={e => setData({ ...data, title: e.target.value })}
                                        required
                                    />
                                </div>
                            </label>
                            <label className='area'>
                                <div className='area--title'>Categoria</div>
                                <div className='area--input'>
                                    <select
                                        value={data.category}
                                        disabled={disabled}
                                        onChange={e => setData({ ...data, category: e.target.value })}
                                        required
                                    >
                                        <option></option>
                                        {categories && categories.map((cat, k) =>
                                            <option key={k} value={cat.slug}>{cat.name}</option>
                                        )}
                                    </select>
                                </div>
                            </label>
                            <label className='area'>
                                <div className='area--title'>Preço</div>
                                <div className='area--input'>
                                    <MaskedInput
                                        mask={priceMask}
                                        placeholder='R$ '
                                        disabled={disabled || data.priceNegotiable}
                                        value={data.price}
                                        onChange={e => setData({ ...data, price: e.target.value })}
                                    />
                                </div>
                            </label>
                            <label className='area'>
                                <div className='area--title'>Preço Negociável</div>
                                <div className='area--input'>
                                    <input
                                        type='checkbox'
                                        disabled={disabled}
                                        checked={data.priceNegotiable}
                                        onChange={e => setData({ ...data, priceNegotiable: !data.priceNegotiable })}
                                    />
                                </div>
                            </label>
                            <label className='area'>
                                <div className='area--title'>Descrição</div>
                                <div className='area--input'>
                                    <textarea
                                        disabled={disabled}
                                        value={data.description}
                                        onChange={e => setData({ ...data, description: e.target.value })}
                                    ></textarea>
                                </div>
                            </label>
                            <label className='area'>
                                <div className='area--title'>*Imagens</div>
                                <div className='area--input'>
                                    <input
                                        type='file'
                                        disabled={disabled}
                                        ref={fileField}
                                        multiple
                                    />
                                </div>
                            </label>
                            <button disabled={disabled}>Alterar cadastro</button>
                        </form>
                    </div>
                    <div className="footer">
                    </div>
                </div>
            </ModalLayout>

        </>
    )


}

export default Modal;