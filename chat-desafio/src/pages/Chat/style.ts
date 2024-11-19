import styled from "styled-components";

export const Container = styled.div`
height: 700px;
width: 400px;
background-color: #fff;
border-radius: 6px;
-webkit-box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.3);
box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.3);
`;

export const Header = styled.div`
width: 95%;
display:flex;
height: 50px;
padding: 0 10px;
align-items: center;
margin-bottom: 10px;
border-radius: 6px;
border: 1px solid black;
box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.2)
`;

export const Body = styled.div`
padding: 0 10px;
height: 550px;
overflow-y: scroll;
color: #000;
display: flex;
flex-direction: column;
`;

export const Footer = styled.div`
width: 100%;
padding: 0 10px;
box-sizing: border-box;
display:flex;
align-items: center;
bottom: 0;
height: 100px;
`;

