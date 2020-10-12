import React from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { setFramerate, enable, disable } from '../../../actions/Animation.actions';

class Animation extends React.Component {
    constructor(props) {
        super(props);
        this.framerateChanged       = this.framerateChanged.bind(this);
        this.enableAnimationChanged = this.enableAnimationChanged.bind(this);
    
    }
    render() {
        const { min, max, val } = this.props.framerate;
        const enabled = this.props.animationEnabled;

        return(
            <div>
                <h4 className="m-auto text-center font-weight-light">Animation</h4>
                <div className="row mt-3 mr-1 ml-1">
                    <Form.Label className="col-4 ml-2 mt-1">Framerate:</Form.Label>
                    <Form.Control className="col-7 mr-3" type="range" 
                        min={min.toString()} 
                        max={max.toString()}  
                        step="1" 
                        value={val.toString()}
                        onChange={this.framerateChanged}/>
                </div>
                <div className="row mr-1 ml-1">
                    <Form.Label className="col-4 ml-2 mt-1">Enable:</Form.Label>
                    <Form.Check className="mr-auto mt-auto mb-auto p-0" checked={enabled} onChange={this.enableAnimationChanged}/>
                </div>
                <hr />
            </div>
        );
    }

    framerateChanged(e) {
        this.props.setFPS(parseInt(e.target.value))
    }

    enableAnimationChanged(e) {
        if (e.target.checked)   { this.props.enableAnimation() }
        else                    { this.props.disableAnimation() }
    }
}

const mapStateToProps = function(state) {
    return {
        framerate       : state.animation.framerate,
        animationEnabled: state.animation.enabled
    }
};

const mapDispatchToProps = function(dispatch) {
    return {
        setFPS:             (fps)   => { dispatch(setFramerate(fps)) },
        enableAnimation:    ()      => { dispatch(enable()) },
        disableAnimation:   ()      => { dispatch(disable()) }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Animation);