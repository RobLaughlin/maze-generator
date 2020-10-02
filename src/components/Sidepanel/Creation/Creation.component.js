import React from 'react';
import { Button_ as Button } from '../Sidepanel.style';
import Form from 'react-bootstrap/Form';

class Creation extends React.Component {
    render() {
        return (
            <div>
                <hr />
                <div className="row mb-3">
                    <Form.Label className="col-4 ml-auto mt-2">Entrance:</Form.Label>
                    <Form.Control type="text" className="col-6 mr-auto rounded" as="select">
                        <option>Left</option>
                        <option>Right</option>
                        <option>Top</option>
                        <option>Bottom</option>
                    </Form.Control>
                </div>
                <div className="row mb-3">
                    <Button variant="dark" className="col-4 m-auto">Generate</Button>
                    <Button variant="dark" className="col-4 m-auto disabled" disabled>Solve</Button>
                </div>
                <div className="row">
                    <Button variant="dark" className="col-10 m-auto disabled" disabled>Skip Animation</Button>
                </div>
                <hr />
            </div>
        );
    }
}

export default Creation;