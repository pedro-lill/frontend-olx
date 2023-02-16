import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { PageArea, OthersArea } from './styled';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import useApi from '../../helpers/OlxAPI';
import AdItem from '../../components/partials/AdItem';
import Modal from '../../components/partials/Modal';

const Page = () => {
    const api = useApi();

    const [userInfo, setUserInfo] = useState({});       // user info
    const [modalOpen, setModalOpen] = useState(false);  // modal open
    const [modalAd, setModalAd] = useState({});         // get info from ad
    const [stateList, setStateList] = useState([]);     // list of states
    const history = useHistory();                       // history

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [disabled, setDisabled] = useState(false); // disable the button when the user clicks on it
    const [error, setError] = useState('');

    // get user info
    useEffect(() => {
        const getUserInfo = async () => {
            const user = await api.getUserInfo();
            setUserInfo(user);
            setEmail(user.email);
        };
        getUserInfo();
    }, [api]);

    // hidden scrool when modal is open
    useEffect(() => {
        if (modalOpen) {
            document.querySelector('body').style.overflow = 'hidden';
        } else {
            document.querySelector('body').style.overflow = 'auto';
        }
    }, [modalOpen]);

    // get states
    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, [api]);

    // update user info
    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError('');

        if (password !== confirmPassword) {
            setError('Senhas não conferem');
            setDisabled(false);
            return;
        }
        const json = await api.updateUser({
            name: userInfo.name.length > 0 ? userInfo.name : undefined,
            state: userInfo.state.length > 0 ? userInfo.state : undefined,
            email: userInfo.email !== email ? email : undefined,
            password: password.length > 0 ? password : undefined,
        });

        if (json.error) {
            setError(json.error); // if there is an error, set the error message
        } else {
            history.go(0)
        }
        setDisabled(false);
    }

    // get ads and set modal(open)
    const handleClick = (ad) => {
        setModalOpen(true);
        setModalAd(ad)
    }

    return (
        <>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} data={modalAd} setData={setModalAd} />
            <PageContainer>
                <PageTitle>Minha Conta</PageTitle>
                <PageArea>
                    {error &&
                        <ErrorMessage>{error}</ErrorMessage>
                    }
                    <form onSubmit={handleSubmit}>
                        <label className='area'>
                            <div className='area--title'>Nome Completo</div>
                            <div className='area--input'>
                                <input
                                    type='text'
                                    disabled={disabled}
                                    value={userInfo.name}
                                    onChange={e => setUserInfo({ ...userInfo, name: e.target.value })}
                                    required
                                />
                            </div>
                        </label>
                        <label className='area'>
                            <div className='area--title'>Estado</div>
                            <div className='area--input'>
                                <select 
                                    value = {stateList.find(state => state.name === userInfo.state)?._id}
                                    onChange={e => setUserInfo({ ...userInfo, state: e.target.value })}
                                    required >
                                    <option></option>
                                    {stateList.map((state, k) =>
                                        <option key={k}
                                            value={state._id}>
                                            {state.name}
                                        </option>)}
                                </select>
                            </div>
                        </label>
                        <label className='area'>
                            <div className='area--title'>E-mail</div>
                            <div className='area--input'>
                                <input
                                    type='email'
                                    disabled={disabled}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                        <label className='area'>
                            <div className='area--title'>Senha</div>
                            <div className='area--input'>
                                <input
                                    type='password'
                                    disabled={disabled}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </label>
                        <label className="area">
                            <div className="area--title ">Confirme a senha</div>
                            <div className="area--input">
                                <input
                                    type="password"
                                    disabled={disabled}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>
                        </label>
                        <label className='area'>
                            <div className='area--title'></div>
                            <div className='area--input'>
                                <button disabled={disabled}>Alterar Cadastro</button>
                            </div>
                        </label>
                    </form>
                </PageArea>
                <OthersArea>
                    {userInfo.ads &&
                        <>
                            <h2>
                                Meus Anúncios
                            </h2>
                            <div className="list">
                                {userInfo.ads.map((otherOferts, k) => // map em ads
                                    <div className="adjust-button">
                                        <AdItem key={k} data={otherOferts._doc} />
                                        <button onClick={() => handleClick({...otherOferts._doc, category:otherOferts.catogory})}>
                                            {<img src="edit.png" height="50%" width="min-content" alt="" />}
                                            <span>
                                                Editar Anúncio
                                            </span>
                                        </button>
                                    </div>
                                )
                                }
                            </div>
                        </>
                    }
                </OthersArea>
            </PageContainer>
        </>
    );
}
export default Page;

