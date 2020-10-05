import React from 'react';
import {Container, Title} from './Sidepanel.style';
import Creation from './Creation/Creation.component';
import Dimensions from './Dimensions/Dimensions.component';
import Animation from './Animation/Animation.component';
import Download from './Download/Download.component';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';

class Sidepanel extends React.Component {
    render() {
        const { MIN_WIDTH, MAX_WIDTH } = this.props;
        return (
            <div>
                <MediaQuery minWidth={MIN_WIDTH}>
                    <Container id="sidepanel" className="border-bottom border-right border-dark" style={{ height: '100vh' }}>
                        <Title>Maze Creator</Title>
                        <Creation />
                        <Dimensions />
                        <Animation />
                        <Download />
                    </Container>
                </MediaQuery>
                <MediaQuery maxWidth={MAX_WIDTH}>
                    <Container id="sidepanel" className="border-bottom border-right border-dark"  style={{ height: '100%' }}>
                        <Title>Maze Creator</Title>
                        <Creation />
                        <Dimensions />
                        <Animation />
                        <Download />
                    </Container>
                </MediaQuery>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        MIN_WIDTH: state.CONSTANTS.MIN_WIDTH,
        MAX_WIDTH: state.CONSTANTS.MAX_WIDTH
    }
};

export default connect(mapStateToProps)(Sidepanel);