import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { PageArea, Fake, OthersArea, BreadChumb } from './styled';
import useApi from '../../helpers/OlxAPI';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';

import { PageContainer } from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';

const Page = () => {

    const api = useApi();
    const { id } = useParams();
    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState({
        category: "",
        title: ""
    });

    // scroll up when select other ad
    useEffect (() => {
        window.scrollTo(0, 0);
    }, [adInfo]);

    


    const formatDate = (date) => {
        let cdate = new Date(date);

        let months = [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro'
        ];
        let cday = cdate.getDate();
        let cmonth = cdate.getMonth();
        let cyear = cdate.getFullYear();

        return `${cday} de ${months[cmonth]} de ${cyear}`;
    }

    useEffect(() => {
        const getAdInfo = async (id) => {
            const json = await api.getAd(id, true);
            if (json === null) {
                alert("Anúncio não encontrado!");
                history.go(-1);
            }

            setAdInfo(json);
            setLoading(false);
        }
        getAdInfo(id);
    }, [id]);


    return (
        <PageContainer>
            {adInfo.category &&
                <BreadChumb>
                    Você está aqui:
                    <Link to="/">Home</Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>
                    /
                    <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.category.slug}`}>{adInfo.category.name}</Link>
                    / {adInfo.title}

                </BreadChumb>
            }


            <PageArea>
                <div className="leftSide">
                    <div className="box">
                        <div className="adImage">
                            {loading && <Fake height={300} />}
                            {adInfo.images &&
                                <Slide>
                                    {adInfo.images.map((img, k) =>
                                        <div key={k} className="each-slide-effect ">
                                            <div style={{ 'backgroundImage': `url(${img})`, width: "100%", height: "100%" }}>

                                            </div>
                                        </div>
                                    )}

                                </Slide>
                            }
                        </div>
                        <div className="adInfo">
                            <div className="adName">
                                {loading && <Fake height={20} />}
                                {adInfo.title &&
                                    <h2>{adInfo.title}</h2>
                                }
                                {adInfo.dateCreated &&
                                    <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                                }
                            </div>
                            <div className="adDescription">
                                {loading && <Fake height={100} />}
                                {adInfo.description}
                                <hr />
                                {adInfo.views &&
                                    <small>Visualizações: {adInfo.views}</small>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="box box--padding">
                        {loading && <Fake height={20} />}
                        {adInfo.priceNegotiable &&
                            "Preço Negociável"
                        }
                        {!adInfo.priceNegotiable && adInfo.price &&
                            <div className="price">
                                Preço: <span>R$ {adInfo.price}</span>
                            </div>
                        }
                    </div>
                    {loading && <Fake height={50} />}
                    {adInfo.userInfo &&
                        <>
                            <a href={`mailto:${adInfo.userInfo.email}`} className="contactSellerLink"  >Fale com o vendedor!</a>
                            <div className="createdBy box box--padding">
                                <strong>{adInfo.userInfo.name}</strong>
                                <small>E-mail: {adInfo.userInfo.email}</small>
                                <small>Estado: {adInfo.stateName}</small>

                            </div>
                        </>
                    }
                </div>

            </PageArea>
            <OthersArea>
                {adInfo.others &&
                    <>
                        <hr />
                        <h2>
                            Outras ofertas do vendedor
                        </h2>
                        <div className="list">
                            {adInfo.others.map((otherOferts, k) =>
                                <AdItem key={k} data={otherOferts} />
                            )}
                        </div>
                    </>
                }
            </OthersArea>
        </PageContainer>

    );
}

export default Page;