import React, { Component } from 'react';


class Index extends Component {
    render() {
        return (
             <div className="row">
                <div className="col-8 col-sm-8 col-md-4 col-lg-4 offset-2 offet-sm-2 offset-md-4 offset-lg-4">
                    <ul className="pagination text-center">
                        <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Index;