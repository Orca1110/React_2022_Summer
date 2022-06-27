import React from "react";
import './Hello.css';
import styled from 'styled-components';

function Hello(){
    const PracticeStyle ={
        marginTop : '10px',
        backgroundColor : 'blue',
    };

    const StyledButton = styled.button`
        color : red;
        background-color : gray;
    `

    return (
    <> 
        <div style={PracticeStyle}> Hello World! </div>
        <div className="red"> Hello World!</div>
    </>
    // <StyledButton>My Button</StyledButton>
    );
}
export default Hello;