import React from 'react';
import Form from 'react-bootstrap/Form';

class Dimensions extends React.Component {
    render() {
        return(
            <div>
                <h4 className="m-auto text-center">Dimensions &amp; Density</h4>
                <div className="row mt-3 mr-1 ml-1">
                    <Form.Label className="col-4 ml-2 mt-1">Width:</Form.Label>
                    <Form.Control className="col-7 mr-3" type="range"/>
                </div>
                <div className="row mr-1 ml-1">
                    <Form.Label className="col-4 ml-2 mt-1">Height:</Form.Label>
                    <Form.Control className="col-7 mr-3" type="range"/>
                </div>
                <div className="row mr-1 ml-1">
                    <Form.Label className="col-4 ml-2 mt-1">Density:</Form.Label>
                    <Form.Control className="col-7 mr-3" type="range"/>
                </div>
                <hr />
            </div>
        );
    }
}

export default Dimensions;