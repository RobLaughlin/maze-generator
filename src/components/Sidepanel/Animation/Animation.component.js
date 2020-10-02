import React from 'react';
import Form from 'react-bootstrap/Form';

class Animation extends React.Component {
    render() {
        return(
            <div>
                <h4 className="m-auto text-center">Animation</h4>
                <div className="row mt-3 mr-1 ml-1">
                    <Form.Label className="col-4 ml-2 mt-1">Framerate:</Form.Label>
                    <Form.Control className="col-7 mr-3" type="range"/>
                </div>
                <div className="row mr-1 ml-1">
                    <Form.Label className="col-4 ml-2 mt-1">Enable:</Form.Label>
                    <Form.Check className="mr-auto mt-auto mb-auto p-0"/>
                </div>
                <hr />
            </div>
        );
    }
}

export default Animation;