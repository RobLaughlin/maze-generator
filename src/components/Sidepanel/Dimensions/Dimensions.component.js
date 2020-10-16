import React from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { changeWidth, changeHeight, changeDensity } from '../../../actions/Dimensions.actions';
import MediaQuery from 'react-responsive';
import { Warn } from './Dimensions.styled';
import ReactTooltip from 'react-tooltip';

class Dimensions extends React.Component {
    constructor(props) {
        super(props);
        this.widthChanged   = this.widthChanged.bind(this);
        this.heightChanged  = this.heightChanged.bind(this);
        this.densityChanged = this.densityChanged.bind(this);
    }

    render() {
        const { width, height, density, mazeDims, MIN_WIDTH, MAX_WIDTH } = this.props;

        return(
            <div>
                <MediaQuery maxWidth={MAX_WIDTH}>
                    <h4 className="mt-auto ml-auto mr-auto mb-3 text-center font-weight-light">Density</h4>
                </MediaQuery>
                <MediaQuery minWidth={MIN_WIDTH}>
                    <h4 className="m-auto text-center font-weight-light">Dimensions &amp; Density</h4>
                    <div className="row mt-3 mr-1 ml-1">
                        <Form.Label className="col-4 ml-2 mt-1">Width:</Form.Label>
                        <Form.Control className="col-7 mr-3" type="range" 
                            onChange={this.widthChanged}
                            min={width.min.toString()} 
                            max={width.max.toString()} 
                            value={width.val.toString()}
                        />
                    </div>
                    <div className="row mr-1 ml-1">
                        <Form.Label className="col-4 ml-2 mt-1">Height:</Form.Label>
                        <Form.Control className="col-7 mr-3" type="range" 
                            onChange={this.heightChanged}
                            min={height.min.toString()} 
                            max={height.max.toString()} 
                            value={height.val.toString()}
                        />
                    </div>
                </MediaQuery>
                <div className="row mr-1 ml-1">
                    <Form.Label className="col-4 ml-2 mt-1">Spacing:</Form.Label>
                    <Form.Control className="col-5" type="range" step="10" 
                        onChange={(e) => {this.densityChanged(e,
                            width,
                            height,
                            mazeDims.width,
                            mazeDims.height)}} 
                        min={density.min.toString()} 
                        max={density.max.toString()} 
                        value={density.val.toString()}
                    />
                    <Warn
                        data-multiline={true}
                        data-tip="Setting the spacing too low can<br>impact performance for very large mazes."
                        className="col-2 m-auto"
                        style={{ visibility: (((density.val / (density.max - density.min)) < 0.3) ? 'visible' : 'hidden') }}>
                    </Warn>
                </div>
                <hr />
                <ReactTooltip />
            </div>
        );
    }

    widthChanged(e)     { this.props.setWidth(parseInt(e.target.value)) }
    heightChanged(e)    { this.props.setHeight(parseInt(e.target.value)) }

    // Rescale maze dimensions on density change
    densityChanged(e, oldWidth, oldHeight, mazeWidth, mazeHeight) {
        const density   = parseInt(e.target.value);
        const maxWidth  = Math.floor(mazeWidth / density);
        const maxHeight = Math.floor(mazeHeight / density);
        let relWidth  = Math.round((oldWidth.val / oldWidth.max) * maxWidth);
        let relHeight = Math.round((oldHeight.val / oldHeight.max) * maxHeight);
        
        if (relWidth === 0) { relWidth = 1; }
        if (relHeight === 0) { relHeight = 1; }

        this.props.setDensity(density);
        this.props.setWidth(relWidth, maxWidth);
        this.props.setHeight(relHeight, maxHeight);
    }
}

const mapStateToProps = function(state) {
    return {
        width       : state.dimensions.width,
        height      : state.dimensions.height,
        density     : state.dimensions.density,
        mazeDims    : state.dimensions.mazeDims,
        MIN_WIDTH   : state.CONSTANTS.MIN_WIDTH,
        MAX_WIDTH   : state.CONSTANTS.MAX_WIDTH,
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