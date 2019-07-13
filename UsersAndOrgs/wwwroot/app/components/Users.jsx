var React = require("react");

class Users extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>Users component {this.props}</div>
        );
    }
}