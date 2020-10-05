import React from 'react';
import { Button_ as Button } from '../Sidepanel.style';
import Form from 'react-bootstrap/Form';
import { generate, solve, changeEntrance } from '../../../actions/Generation.actions';
import { connect } from 'react-redux';

class Creation extends React.Component {
    render() {
        const { active, generate, changeEntrance, solve } = this.props;
        return (
            <div>
                <hr />
                <div className="row mb-3">
                    <Form.Label className="col-4 ml-auto mt-2">Entrance:</Form.Label>
                    <Form.Control type="text" className="col-6 mr-auto rounded" as="select"
                                    onChange={(e) => changeEntrance(e.target.value.toString())}>
                        <option>Left</option>
                        <option>Right</option>
                        <option>Top</option>
                        <option>Bottom</option>
                    </Form.Control>
                </div>
                <div className="row mb-3">
                    <Button variant="dark" className="col-4 m-auto" onClick={generate}>Generate</Button>
                    <Button variant="dark" className={"col-4 m-auto "} onClick={solve}>Solve</Button>
                </div>
                <div className="row">
                    <Button variant="dark" 
                            className={"col-10 m-auto " + (active ? "" : "disabled")}
                            disabled={!active}
                            onClick={generate}>
                            Skip Animation
                    </Button>
                </div>
                <hr />
            </div>
        );
    }
}

const mapStateToProps = function(state) { 
    return { 
        active: state.generation.active
    } 
};

const mapDispatchToProps = function(dispatch) {
    return {
        generate        : ()            => { dispatch(generate()) },
        changeEntrance  : (entrance)    => { dispatch(changeEntrance(entrance)) },
        solve           : ()            => { dispatch(solve()) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Creation);