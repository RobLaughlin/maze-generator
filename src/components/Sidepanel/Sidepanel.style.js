import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

const Container = styled.div`
    min-width: 300px;
    margin-top: 0;
    height: 100vh;
    min-height: 700px;
`;

const Title = styled.h1`
    font-size: 32px;
    text-align: center;
    margin: 0px;
    padding-top: 8px;
    font-family: Times;
`;

const Button_ = styled(Button)`
    padding-left: 16px;
    padding-right: 16px;
`;

export { Container, Title, Button_ };