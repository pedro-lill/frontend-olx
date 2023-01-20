import styled from "styled-components";

export const HeaderArea = styled.div`
    background-color: #FFF;
    height: 60px;
    border-bottom: 1px solid #CCC;

    .container {
        max-width: 1000px; // limit the width of the container
        margin: auto; // center the container
        display: flex;  // make the elements inside the container to be side by side
    }

    a {
        text-decoration: none;
    }

    .logo {
        flex: 1; // make the logo to take all the space available
        display: flex; // make the elements inside the logo to be side by side
        align-items: center; // align the elements inside the logo to be in the center
        height: 60px;

        .logo-1, .logo-2, .logo-3 {
            font-size: 27px;
            font-weight: bold;  
        }
        .logo-1 {color: #FF0000;}
        .logo-2 {color: #00FF00;}
        .logo-3 {color: #0000FF;}
    }

    nav {
        padding-top: 10px;
        padding-bottom: 10px;

        ul, li {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        ul {
            display: flex; // make the elements inside the ul to be side by side
            align-items: center; // align the elements inside the ul to be in the center
            height: 40px;  // set the height of the ul

        }
        li {
            margin-left: 20px;
            margin-right: 20px;

            a, button{
                border 0;
                background: none;
                color: #000;
                font-size: 14px;
                text-decoration: none;
                cursor: pointer;

                &:hover {
                    color: #999;
                }

                &.button {
                    background-color: #FF8100;
                    border-radius: 4px;
                    color: #FFF;
                    padding: 5px 10px;
                }
                &.button:hover {
                    background-color: #E57706;
                    
                }

            }

        }
    }

    @media (max-width: 600px) {
        
        & {
            height: auto;
        }
        
        .container {
            flex-direction: column; 
        }

        .logo{
            justify-content: center;
            margin 20px 0;
        }

        nav ul {
            flex-direction: column;
            height: auto;
        }

        nav li {
            margin: 10px 0;
            
        }
    }


`;