import styled from 'styled-components';

export const PageTitle = styled.h1`
    font-size: 27px;
    margin-left: 10px;
`;

export const PageArea = styled.div`
    form {  
        background-color: #FFF; // white
        border-radius: 3px; // make the corners round
        padding: 10px; // padding inside the form
        box-shadow: 0px 0px 3px #999; 

        .area {
            display: flex;
            align-items: center;
            padding: 10px;
            max-width: 500px;
        }

        .area--title{
            width: 200px;
            text-align: right;  
            padding-right: 20px;
                
            font-weight: bold;
            font-size: 14px;
        }

        .area--input{
            flex: 1;

            input {
                width: 100%;
                font-size: 14px;
                padding: 5px;
                border: 1px solid #DDD;
                border-radius: 3px;
                outline: 0;
                transition: all ease .4s;

                &:focus{
                    border: 1px solid #333;
                    color: #333;
                }
            }

            button{
                background-color: #0089FF;
                border: 0;
                outline: 0;
                padding: 5px 10px;
                border-radius: 4px;
                color: #FFF;
                font-size: 15px;
                cursor: pointer;

                &:hover, :focus{
                    background-color: #006FCE;
                }
                
            }
            input:checked{
                background-color: blue; 
            }
        }
    }

    @media (max-width: 600px) {
        form {
            .area {
                flex-direction: column;
            
               .area--title{
                    width: 100%;
                    text-align: left;   
                    margin-bottom: 10px;
                }
                .area--input{
                    width: 100%;
                    flex: initial;
                    flex-direction: column;
                    margin-bottom: 10px;

                    button{
                        width: 100%;
                        margin-top: 10px;
                    }

                    select{
                        width: 33%;

                    }
                }
            }
       }
    }

`;


export const OthersArea = styled.div`
    
    h2{
        font-size: 20px;
        margin-left: 10px;
    }

    button{
        background-color: #0089FF;
        border-radius: 4px;
        border : 0;
        color: #FFF;
        font-size: 15px;
        cursor: pointer;
        width: auto;
        height : 30px;
        margin-right:10px;

        &:hover, :focus{
            background-color: #006FCE ;
        }

        span{
            font-size: 15px;
            margin-left: 5px;
        }
    }

    .list{
        display: flex;
        flex-wrap: wrap;

        .adjust-button{
            display : flex;
            width: 33%;
            min-width:200px;
            flex-wrap : wrap;
            justify-content: flex-end;
        }

    }

    @media (max-width: 600px){
        margin-left:0;

        .list{
            flex-direction: column;
            align-items: center;
            width: 100vw;
        
            .adjust-button{
            width: 100%;
            justify-content: center;

                button{
                    width: 70%;
                    margin: 0 10px;
                }
            
                .aditem{
                    width: 100%;
                    max-width:290px;
                    flex-wrap: wrap;
                    margin: 0;
                    padding:0;
                }
            }

        }
    }

`;