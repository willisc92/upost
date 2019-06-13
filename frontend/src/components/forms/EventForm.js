import React from "react";
import { connect } from "react-redux";
import { getAllCommunities } from "../../actions/communities";

export class EventForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: this.props.event ? this.props.event.location : "",
            community: this.props.event ? this.props.event.community : null,
            capacity: this.props.event ? this.props.event.capacity : 0,
            planned_start_date: this.props.event ? this.props.event.planned_start_date : null,
            planned_end_date: this.props.event ? this.props.evvent.planned_end_date : null
        };
    }

    componentWillMount() {
        this.props
            .getAllSchools()
            .then(() => {})
            .catch((error) => {
                console.log(JSON.stringify(error, null, 2));
            });
    }

    render() {
        return <div>ENTER FORM HERE</div>;
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAllCommunities: () => dispatch(getAllCommunities())
});

export default connect(
    null,
    mapDispatchToProps
)(EventForm);
