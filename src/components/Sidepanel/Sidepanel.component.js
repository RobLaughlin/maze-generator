import React from 'react';
import {Container, Title} from './Sidepanel.style';
import Creation from './Creation/Creation.component';

function Sidepanel() {
    return (
        <Container id="sidepanel">
            <Title>Maze Creator</Title>
            <Creation />
        </Container>
    );
}

export default Sidepanel;