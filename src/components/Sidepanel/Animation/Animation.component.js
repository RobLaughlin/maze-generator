import React from 'react';
import Form from 'react-bootstrap/Form';
import { connect } from 'react-redux';
import { setFramerate } from '../../../actions/Animation.actions';

class Animation extends React.Component {
    constructor(props) {
        super(props);
        this.framerateChanged = this.framerateChanged.bind(this);
    }
    render() {
        const { min, max, val } = this.props.framerate;

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
                    <Form.Check className="mr-auto mt-auto mb-auto p-0"/>
                </div>
                <hr />
            </div>
        );
    }

    framerateChanged(e) {
        this.props.setFPS(parseInt(e.target.value))
    }
}

const mapStateToProps = function(state) {
    return {
        framerate: state.animation.framerate
    }
};

const mapDispatchToProps = function(dispatch) {
    return {
        setFPS: (fps) => { dispatch(setFramerate(fps)) }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Animation);