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
        border: 1px solid black ;
        border-radius: 5px;
        background-color: #f2f2f2;
        padding : 5px;

        
        
        .header{
            width: 100% ;
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            

            button{
                all:unset;
                cursor: pointer;
                margin-right: 3px;
                &:hover {
                    color: #999;
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