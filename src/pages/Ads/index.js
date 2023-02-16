import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { PageArea } from './styled';
import { PageContainer } from '../../components/MainComponents';
import useApi from '../../helpers/OlxAPI';
import AdItem from '../../components/partials/AdItem';
let timer;

const Page = () => {
    const api = useApi();
    const history = useHistory();

    // get the query string
    const useQueryString = () => {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQueryString();

    const [q, setQ] = useState(query.get('q') != null ? query.get('q') : '');                   // query string
    const [cat, setCat] = useState(query.get('cat') != null ? query.get('cat') : '');           // category
    const [state, setState] = useState(query.get('state') != null ? query.get('state') : '');   // state

    const [adsTotal, setAdsTotal] = useState(0);                     // total of ads
    const [stateList, setStateList] = useState([]);                 // list of states
    const [categories, setCategories] = useState([]);               // list of categories
    const [adList, setAdList] = useState([]);                       // list of ads
    const [pageCount, setPageCount] = useState(0);                  // total of pages
    const [currentPage, setCurrentPage] = useState(1);              // current page
    const [loading, setLoading] = useState(true);                   // loading
    const [resultOpacity, setResultOpacity] = useState(1);          // opacity of the result

    // get ads, max 6 per page
    const getAdsList = async () => {
        setLoading(true);
        let offset = (currentPage - 1) * 6;
        const json = await api.getAds({
            sort: 'desc',
            limit: 6,
            q,
            cat,
            state,
            offset
        });
        setAdList(json.ads);
        setAdsTotal(json.total);
        setResultOpacity(1);
        setLoading(false);
    }

    // opacity of the result
    useEffect(() => {
        setResultOpacity(0.3);
        getAdsList();
    },[currentPage]);
    
    // total of pages
    useEffect(() => {
        if (adList.length > 0) {
            setPageCount(Math.ceil(adsTotal / adList.length));
        } else {
            setPageCount(0);
        }
    }, [adsTotal]);

    // get the query string
    useEffect(() => {
        let queryString = [];
        if (q) {
            queryString.push(`q=${q}`);
        }
        if (cat) {
            queryString.push(`cat=${cat}`);
        }
        if (state) {
            queryString.push(`state=${state}`);
        }
        history.replace({
            search: `?${queryString.join('&')}`
        });
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(getAdsList, 1500);
        setResultOpacity(0.3);
        setCurrentPage(1); // sempre que mudar a busca, voltar para a pagina 1

    }, [q, cat, state]);

    // get the states
    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }
        getStates();
    }, []);

    // get the categories
    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    // pagination
    let pagination = [];
    for (let pags = 1; pags <= pageCount; pags++) {
        pagination.push(pags);
    }
    return (
        <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <form method="GET">
                        <input
                            type="text"
                            name="query"
                            placeholder="O que você procura?"
                            value={q}
                            onChange={e => setQ(e.target.value)}
                        />
                        <div className="filterName">Estado:</div>
                        <select name="state" value={state} onChange={e => setState(e.target.value)} >
                            <option></option>
                            {stateList.map((state, k) =>
                                <option key={k} value={state.name}>{state.name}</option>
                            )
                            }
                        </select>
                        <div className="filterName" >Categoria:</div>
                        <ul>
                            {categories.map((cats, k) =>
                                <li key={k}
                                    className={cat === cats.slug ? `categoryItem active` : `categoryItem`}
                                    onClick={() => setCat(cats.slug)}
                                >
                                    <img src={cats.img} alt="iamgem da categoria" />
                                    <span>{cats.name}</span>
                                </li>
                            )}
                        </ul>
                    </form>
                </div>
                <div className="rightSide">
                    <h2>Resultado da busca</h2>
                    {loading && adList.length === 0 &&
                        <div className="listWarning">
                            Carregando...
                        </div>
                    }
                    {!loading && adList.length === 0 &&
                        <div className="listWarning">
                            Não encontramos resultados.
                        </div>
                    }
                    <div className="list" style={{ opacity: resultOpacity }}>
                        {adList.map((item, k) =>
                            <AdItem
                                key={k}
                                data={item}
                            />
                        )}
                    </div>
                    <div className="pagination">
                        {pagination.map((pags, k) =>
                            <div key={k}
                                onClick={() => setCurrentPage(pags)}
                                className={pags === currentPage ? 'pagItem active' : 'pagItem'} >
                                {pags}
                            </div>
                        )}
                    </div>
                </div>
            </PageArea>
        </PageContainer>
    );
}
export default Page;