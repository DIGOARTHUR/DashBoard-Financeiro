import styled from "styled-components";

export const Container = styled.div `
display:grid ;
grid-template-columns: repeat(3,1fr) ;
gap: 2rem;
margin-top:-7rem ;
div{
    background: var(  --shape);
    border-radius:0.25px ;
    
    width:352px ;
    height:136px ;
    padding: 1.5rem 2rem ;
    color: var(--text-title);

    header {
        display:flex ;
        justify-content:space-between;
        align-items: center ;
    }
    strong{
        display: block ;
        margin-top:1rem;
        font-size:2rem;
        font-weight:500;
        line-height:3rem ;
    }

    &.highlight-background{
        background: var(--green) ;
        color:#FFF;
    }
}

`
