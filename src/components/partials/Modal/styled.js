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
        padding : 5px;
        position: relative;

        .body{
            form {
                background-color: #f2f2f2; // white
                border-radius: 3px; // make the corners round
                padding: 10px; // padding inside the form
                box-shadow: 0px 0px 3px #999; 
                
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
            margin:0;
           .right{
                text-align: right;
                margin-right: 5px;
                position: absolute ;
                top:0;
                right:0;

                button{
                all:unset;
                cursor: pointer;
                margin-right: 3px;
                    &:hover {
                        color: #999;
                    }
                }
           }
           .left{
                text-align: left;
                margin-left: 10px;
                position: relative ;

                .h1{
                    font-size: 10px;
                    font-weight: bold;
                }
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

                &:hover{
                    background-color: #006FCE;
                }
            }
                
        }
    }
`;