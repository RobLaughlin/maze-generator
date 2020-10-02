import React from 'react';
import { Button_ as Button } from '../Sidepanel.style';
import Form from 'react-bootstrap/Form';
import { Select } from './Creation.style';

class Creation extends React.Component {
    render() {
        return (
            <div>
                <hr />
                <div className="row mb-2">
                    <div className="m-auto w-100">
                        <Form.Label className="ml-5">Entrance:</Form.Label>
                        <Select type="text" className="ml-4 w-50 rounded pl-1 pt-1 pb-1" as="select">
                            <option>Left</option>
                            <option>Right</option>
                            <option>Top</option>
                            <option>Bottom</option>
                        </Select>
                    </div>
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