import React from 'react';
import { Container } from './Maze.styled';
import { connect } from 'react-redux';

class Maze extends React.Component {
    render() {
        return(
            <Container id="mazeContainer" style={{
                width: this.props.width.val.toString() + 'px',
                height: this.props.height.val.toString() + 'px'
            }}>
            </Container>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        width: state.dimensions.width,
        height: state.dimensions.height
    }
};

export default connect(mapStateToProps)(Maze);