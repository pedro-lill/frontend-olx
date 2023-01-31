import styled from "styled-components";

export const ModalLayout = styled.div`
    display: flex ;
    justify-content: center;
    align-items: center;
    width : 100vw;
    height: 100vh ;
    margin: 0;
    position : fixed;
    z-index: 999;
    top:0;
    background-color: #EEEEEE77;
    &.closed{
            display: none;
        }

    .modal{
        max-width: 800px;
        max-height: 800px;
        min-height: 500px;
        background-color: #f2f2f2;
        position: relative;
        box-shadow: 0px 0px 3px #999; 
        border-radius: 3px;

        .body{
            form {
                background-color: #f2f2f2; // white
                border-radius: 3px; // make the corners round
                padding: 10px; // padding inside the form
                
                
                button{
                    display: flex;
                    background-color: #0089FF;
                    border: 0;
                    outline: 0;
                    padding: 5px 10px;
                    border-radius: 4px;
                    text-align: center;
                    align-items: center;
                    justify-content: center;
                    margin-left: 187px;
                    color: #FFF;
                    font-size: 15px;
                    cursor: pointer;

                    &:hover, :focus{
                        background-color: #006FCE;
                    }
                }

                .area {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    max-width: 500px;
                }

                .area--title{
                    width: 200px;
                    text-align: center;  
                    padding-right: 20px;
                    font-weight: bold;
                    font-size: 14px;
                }

                .area--input{
                    flex: 1;
                    input, select, textarea {
                        width: 100%;
                        font-size: 14px;
                        position: center ;
                        margin-right: 20px;
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
                    input:checked{
                        background-color: blue;
                        width: 20px;
                        height: 20px;
                    }

                    textarea{
                        height: 150px;
                        resize: none;
                    }
                }
            }
        }
        
        .header{
            width: 100% ;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 3px 3px 0 0;

            .right{
                position: absolute;
                right: 0;
                top: 0;
                button{
                    display: none;
                    background-color: transparent;
                    border: 0;
                    outline: 0;
                    padding: 5px 10px;
                    border-radius: 4px;
                    color: #333;
                    font-size: 15px;
                    cursor: pointer;
                    margin: 3px;
                    margin-top: auto;
                    &:hover{
                        background-color: #CCC;
                    }
                }

            }
           
            h1{
                font-size: 30px;
                font-weight: bold;
            }
        }

        .footer{
            width: 100% ;
            display: flex;
            justify-content: center;
            align-items: center;

            button{
                background-color: #0089FF;
                border: 0;
                outline: 0;
                padding: 5px 10px;
                border-radius: 4px;
                color: #FFF;
                font-size: 15px;
                cursor: pointer;
                margin: 3px;
                margin-top: auto;

                &:hover{
                    background-color: #006FCE;
                }
            }
                
        }
    }

    @media (max-width: 600px) {
        .modal{
            // deixar a altura do modal responsiva
            max-height: 100vh;
            max-width: 100vw;
            padding: 5 px;
            border-radius: 0;
            .header{
                h1{
                font-size: 20px;
                margin: 10px auto 1px;
                }
                .right{               
                    button{
                        display: block;
                        margin-top:5px;
                    }

                }

            }
            .body{
                form{
                    .area{
                        flex-direction: column;
                        .area--title{
                            width: 100%;
                            text-align: left;
                            margin-bottom: 5px;
                        }
                        .area--input{
                            width: 100%;
                            input, select, textarea{
                                width: 100%;
                            }
                        }
                    }
                    button{
                        margin-left: 0;
                        width: 100%;
                    }
                }
            }
            
        }
    }
`;

