import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageArea, SearchArea } from './styled';
import { PageContainer} from '../../components/MainComponents';
import useApi from '../../helpers/OlxAPI';
import AdItem from '../../components/partials/AdItem';

const Page = () => {

    const api = useApi();

    const [stateList, setStateList] = useState([]);     // list of states   
    const [categories, setCategories] = useState([]);   // list of categories
    const [adList, setAdList] = useState([]);           // list of ads

    // get states
    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    },[]);

    // get categories
    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    },[]);

    // get recent ads
    useEffect(() => {
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort : 'desc',
                limit : 20
        });
        setAdList(json);
        //setAdList(json.ads);
        }
        getRecentAds();
    },[]);
    return (
        <>
            <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method="GET" action="/ads">
                            <input type="text" name="q" placeholder="O que você procura?" />
                            <select name="state">
                                {stateList?.map((i,k) =>
                                    <option key = {k} value = {i.name} >{i.name}</option>)}
                            </select>
                            <button>Pesquisar</button>  
                        </form>
                    </div>
                    <div className="categoryList" >
                        {categories?.map((categories,k) =>
                            <Link key = {k} to={`/ads?cat=${categories.slug}`} className="categoryItem">
                                <img src={categories.img} alt="" />
                                <span>{categories.name}</span>
                            </Link>
                         )}
                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>
                <PageArea>
                  <h2>Anúncios Recentes</h2>
                    <div className="list">
                        {adList.map((allads,k)=> 
                            <AdItem key = {k} data = {allads} />
                        )}
                    </div>
                    <Link to="/ads" className = "seeAllLink" > Ver todos </Link>
                    <br></br>                   
                    <hr />
                    <br></br>
                    Sobre a OLX, Termos de uso, Política de privacidade, e Proteção à Propriedade Intelectual
                    © Bom Negócio Atividades de Internet Ltda. Rua do Catete, 359, Flamengo - 22220-001 - Rio de Janeiro, RJ
                </PageArea>
            </PageContainer>
        </>    
    );
}
export default Page;