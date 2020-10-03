import React from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { changeWidth, changeHeight, changeDensity } from '../../../actions/Dimensions.actions';

class Dimensions extends React.Component {
    constructor(props) {
        super(props);
        this.windowResized = this.windowResized.bind(this);
        this.widthChanged = this.widthChanged.bind(this);
        this.heightChanged = this.heightChanged.bind(this);
        this.densityChanged = this.densityChanged.bind(this);
    }

    render() {
        return(
            <div>
                <h4 className="m-auto text-center font-weight-light">Dimensions &amp; Density</h4>
                <div className="row mt-3 mr-1 ml-1">
                    <Form.Label className="col-4 ml-2 mt-1">Width:</Form.Label>
                    <Form.Control className="col-7 mr-3" type="range" 
                        onChange={(e) => { this.widthChanged(e, document.body.clientWidth) }}
                        min={this.props.width.min.toString()} 
                        max={this.props.width.max.toString()} 
                        value={this.props.width.val.toString()}
                    />
                </div>
                <div className="row mr-1 ml-1">
                    <Form.Label className="col-4 ml-2 mt-1">Height:</Form.Label>
                    <Form.Control className="col-7 mr-3" type="range" 
                        onChange={(e) => { this.heightChanged(e, document.body.clientHeight) }}
                        min={this.props.height.min.toString()} 
                        max={this.props.height.max.toString()} 
                        value={this.props.height.val.toString()}
                    />
                </div>
                <div className="row mr-1 ml-1">
                    <Form.Label className="col-4 ml-2 mt-1">Density:</Form.Label>
                    <Form.Control className="col-7 mr-3" type="range" step="10" min="20" max="200" onChange={this.densityChanged} />
                </div>
                <hr />
            </div>
        );
    }

    componentDidMount() {
        window.addEventListener('resize', this.windowResized);
        this.windowResized();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResized);
    }

    widthChanged(e, width) {
        this.props.setWidth(e.target.value, width - 380, 50);
    }

    heightChanged(e, height) {
        this.props.setHeight(e.target.value, height - 80, 50);
    }

    densityChanged(e) {
        this.props.setDensity(e.target.value);
    }

    windowResized() {
        const width = document.body.clientWidth;
        const height = document.body.clientHeight;
        this.props.setWidth(width - 380, width - 380, 50);
        this.props.setHeight(height - 80, height - 80, 50);
    }
}

const mapStateToProps = function(state) {
    return {
        width: state.dimensions.width,
        height: state.dimensions.height,
        density: state.dimensions.density
    }
};

const mapDispatchToProps = function(dispatch) {
    return {
        setWidth    : (width, max, min)     => { dispatch(changeWidth(width, max, min)) },
        setHeight   : (height, max, min)    => { dispatch(changeHeight(height, max, min)) },
        setDensity  : (density)             => { dispatch(changeDensity(density)) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dimensions);