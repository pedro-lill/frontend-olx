import styled from 'styled-components';

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

            input, select, textarea {
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
            textarea{
                height: 150px;
                resize: none;

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

                &:hover{
                    background-color: #006FCE;
                }

            }
            input:checked{
                background-color: blue;
                width: 20px;
                height: 20px;
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
                        width: 100%;
                        font-size: 14px;
                        padding: 5px;
                        border: 1px solid #DDD;
                        border-radius: 3px;
                        outline: 0;
                        transition: all ease .4s;
                    }
                    
                }
            }
       }
    }


`;