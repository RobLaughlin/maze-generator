import React from 'react';
import { Button_ as Button } from '../Sidepanel.style';
import { downloadClicked as dlClicked} from '../../../actions/Download.actions';
import { connect } from 'react-redux';

class Download extends React.Component {
    render() {
        const { downloadClicked } = this.props;
        
        return(
            <div>
                <h4 className="m-auto text-center font-weight-light">Download Maze</h4>
                <div className="row mr-1 ml-1">
                    <Button variant="dark" className="col-10 ml-auto mr-auto mt-3 mb-3" 
                        onClick={e => {downloadClicked(true)}}>
                        Download
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        clicked     : state.download.clicked,
    }
}

const mapDispatchToProps = function(dispatch) {
    return {
        downloadClicked : (click) => { dispatch(dlClicked(click)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Download);