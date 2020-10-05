import React from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { changeWidth, changeHeight, changeDensity } from '../../../actions/Dimensions.actions';
import MediaQuery from 'react-responsive';

class Dimensions extends React.Component {
    constructor(props) {
        super(props);
        this.widthChanged = this.widthChanged.bind(this);
        this.heightChanged = this.heightChanged.bind(this);
        this.densityChanged = this.densityChanged.bind(this);
    }

    render() {
        return(
            <div>
                <MediaQuery maxWidth={this.props.MAX_WIDTH}>
                    <h4 className="mt-auto ml-auto mr-auto mb-3 text-center font-weight-light">Density</h4>
                </MediaQuery>
                <MediaQuery minWidth={this.props.MIN_WIDTH}>
                    <h4 className="m-auto text-center font-weight-light">Dimensions &amp; Density</h4>
                    <div className="row mt-3 mr-1 ml-1">
                        <Form.Label className="col-4 ml-2 mt-1">Width:</Form.Label>
                        <Form.Control className="col-7 mr-3" type="range" 
                            onChange={this.widthChanged}
                            min={this.props.width.min.toString()} 
                            max={this.props.width.max.toString()} 
                            value={this.props.width.val.toString()}
                        />
                    </div>
                    <div className="row mr-1 ml-1">
                        <Form.Label className="col-4 ml-2 mt-1">Height:</Form.Label>
                        <Form.Control className="col-7 mr-3" type="range" 
                            onChange={this.heightChanged}
                            min={this.props.height.min.toString()} 
                            max={this.props.height.max.toString()} 
                            value={this.props.height.val.toString()}
                        />
                    </div>
                </MediaQuery>
                <div className="row mr-1 ml-1">
                    <Form.Label className="col-4 ml-2 mt-1">Spacing:</Form.Label>
                    <Form.Control className="col-7 mr-3" type="range" step="10" 
                        onChange={(e) => {this.densityChanged(e, this.props.mazeDims.width, this.props.mazeDims.height)}} 
                        min={this.props.density.min.toString()} 
                        max={this.props.density.max.toString()} 
                        value={this.props.density.val.toString()}
                    />
                </div>
                <hr />
            </div>
        );
    }

    widthChanged(e) { this.props.setWidth(parseInt(e.target.value)) }
    heightChanged(e) { this.props.setHeight(parseInt(e.target.value)) }

    densityChanged(e, mazeWidth, mazeHeight) {
        const density = parseInt(e.target.value)
        const maxWidth = Math.floor(mazeWidth / density);
        const maxHeight = Math.floor(mazeHeight / density);
        
        this.props.setDensity(density);
        this.props.setWidth(maxWidth, maxWidth);
        this.props.setHeight(maxHeight, maxHeight);
    }
}

const mapStateToProps = function(state) {
    return {
        width: state.dimensions.width,
        height: state.dimensions.height,
        density: state.dimensions.density,
        mazeDims: state.dimensions.mazeDims,
        MIN_WIDTH: state.CONSTANTS.MIN_WIDTH,
        MAX_WIDTH: state.CONSTANTS.MAX_WIDTH,
    }
};

const mapDispatchToProps = function(dispatch) {
    return {
        setWidth    : (width, max, min)         => { dispatch(changeWidth(width, max, min)) },
        setHeight   : (height, max, min)        => { dispatch(changeHeight(height, max, min)) },
        setDensity  : (density)                 => { dispatch(changeDensity(density)) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dimensions);