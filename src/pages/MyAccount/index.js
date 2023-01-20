import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { PageArea, OthersArea } from './styled';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';
import useApi from '../../helpers/OlxAPI';
import { doLogin } from '../../helpers/authHandler';
import AdItem from '../../components/partials/AdItem';
import Modal from '../../components/partials/Modal';
import { ModalLayout } from '../../components/partials/Modal/styled';


const Page = () => {

    const api = useApi();

    const [userInfo, setUserInfo] = useState([]);
    const [modalOpen, setModalOpen ] = useState(false);

    useEffect(() => {
        const getUserInfo = async () => {
            const user = await api.getUserInfo();
            setUserInfo(user);
            setEmail(user.email);
        };
        getUserInfo();
    }, []);


    const [stateList, setStateList] = useState([]);
    const history = useHistory();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

    const [disabled, setDisabled] = useState(false); // disable the button when the user clicks on it
    const [error, setError] = useState('');

    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);


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
            stateLoc: userInfo.state.length > 0 ? userInfo.state : undefined,
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



    return (
        <>
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
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
                                <select value={userInfo.state} onChange={e => setUserInfo({ ...userInfo, state: e.target.value })} required >
                                    <option></option>
                                    {stateList.map((state, k) =>
                                        <option key={k} value={state.name}> {state.name} </option>)}
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
                                {userInfo.ads.map((otherOferts, k) =>
                                    <AdItem key={k} data={otherOferts._doc} />
                                )
                                }
                            </div>
                            <button onClick={() => setModalOpen(true)}>
                                Editar Anuncio
                            </button>
                        </>
                    }
                </OthersArea>

            </PageContainer>
        </>
    );

}

export default Page;

