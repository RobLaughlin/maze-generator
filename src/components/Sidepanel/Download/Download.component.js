import React from 'react';
import Form from 'react-bootstrap/Form';
import { Button_ as Button } from '../Sidepanel.style';

class Download extends React.Component {
    render() {
        return(
            <div>
                <h4 className="m-auto text-center font-weight-light">Download Maze</h4>
                <div className="row mt-3 mr-1 ml-1">
                    <Form.Control type="text" className="col-10 m-auto rounded" as="select">
                        <option>*.PNG</option>
                        <option>*.PNG With Solution</option>
                    </Form.Control>
                    <Button variant="dark" className="col-10 ml-auto mr-auto mt-3">Download</Button>
                </div>
                <hr />
            </div>
        );
    }
}

export default Download;