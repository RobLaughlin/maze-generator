import React from 'react';
import {Container, Title} from './Sidepanel.style';
import Creation from './Creation/Creation.component';
import Dimensions from './Dimensions/Dimensions.component';
import Animation from './Animation/Animation.component';

function Sidepanel() {
    return (
        <Container id="sidepanel">
            <Title>Maze Creator</Title>
            <Creation />
            <Dimensions />
            <Animation />
        </Container>
    );
}

export default Sidepanel;