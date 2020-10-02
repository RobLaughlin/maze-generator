import React from 'react';
import {Container, Title} from './Sidepanel.style';
import Creation from './Creation/Creation.component';
import Dimensions from './Dimensions/Dimensions.component';

function Sidepanel() {
    return (
        <Container id="sidepanel">
            <Title>Maze Creator</Title>
            <Creation />
            <Dimensions />
        </Container>
    );
}

export default Sidepanel;