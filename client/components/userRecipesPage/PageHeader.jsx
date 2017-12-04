import React, { Component } from 'react';


class PageHeader extends Component {
    render() {
        return (
            <section className="cover text-center">
                <div className="col">
                    <h3 className="text-info mb-1">My Recipes</h3>
                </div>
                <hr id="favorites"/>
            </section>
        );
    }
}

export default PageHeader;