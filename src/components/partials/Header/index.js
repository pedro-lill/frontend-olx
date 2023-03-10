import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { HeaderArea } from './styled';
import { isLogged } from '../../../helpers/authHandler';
import { doLogout } from '../../../helpers/authHandler';
import useApi from "../../../helpers/OlxAPI";

const Header = () => {
    const api = useApi();

    const handleLogout = () => {
        doLogout();
        window.location.href = '/';
    }

    const [userInfo, setuserInfo] = useState([]);
    
    const [logged, setLogged] = useState(isLogged());

    useEffect(() => {
        const getUserInfo = async () => {
            const user = await api.getUserInfo();

            setuserInfo(user);
        };
        if (logged) {
            getUserInfo();
        }
    }, [logged]);


    return (
        <HeaderArea>
            <div className='container'>
                <div className='logo'>
                    <Link to='/'>
                        <span className='logo-1'>O</span>
                        <span className='logo-2'>L</span>
                        <span className='logo-3'>X</span>
                    </Link>
                </div>
                <nav>
                    <ul>
                        {!logged &&
                            <>
                                <li>
                                    <Link to='/signin'>Login</Link>
                                </li>
                                <li>
                                    <Link to='/signup'>Cadastrar</Link>
                                </li>
                                <li>
                                    <Link to='/signin' className='button'>Poste um Anúncio</Link>
                                </li>
                            </>
                        }
                        {logged &&
                            <>
                                <li>
                                    <Link to='/myaccount'>
                                        <span>
                                        {userInfo.name}
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/post-an-ad' className='button'>Poste um Anúncio</Link>
                                </li>
                                <li>
                                    <button onClick = {handleLogout} >Sair</button>
                                </li> 
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </HeaderArea>
    );
}
export default Header;