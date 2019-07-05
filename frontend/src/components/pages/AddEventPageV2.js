import React from "react";
import { addEvent } from "../../actions/events";
import { getCurrentUser } from "../../actions/auth";
import EventForm from "../forms/EventForm";
import IncentiveForm from "../forms/IncentiveForm";
import { connect } from "react-redux";
import { startGetPost, clearPosts } from "../../actions/posts";
import { addIncentivePackage } from "../../actions/incentivePackage";
import { RecurringModal } from "../modals/RecurringModal";
import { mapFrequencyToRRule, mapDayToRRule } from "../../utils/recurring";
import { RRule } from "rrule";

// TODO:  Refactor this to be an add Event+Incentive Page, with the option for recurring submit from AddPostPage.
// TODO:  Event and Incentive Forms should save base event/incentive locally to the state, and wait for a final submit.
// TODO:  Create toggle to render IncentiveForm/unrender Event Form.
// TODO:  Add a Save All button that conditionally submits an event, event+incentive, or recurring event+recurring incentive.

class AddEventPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            step: "Event",
            base_event: null,
            base_incentive: null,
            finished: false,
            recurringOpen: false,
            rrule_payload: {
                recurringFrequency: "none",
                endSelection: "none",
                numOccurences: 0,
                endDate: null,
                byweekday: [
                    { id: 0, value: "0", label: "Monday", isChecked: false },
                    { id: 1, value: "1", label: "Tuesday", isChecked: false },
                    { id: 2, value: "2", label: "Wednesday", isChecked: false },
                    { id: 3, value: "3", label: "Thursday", isChecked: false },
                    { id: 4, value: "4", label: "Friday", isChecked: false },
                    { id: 5, value: "5", label: "Saturday", isChecked: false },
                    { id: 6, value: "6", label: "Sunday", isChecked: false }
                ]
            },
            rrule_event_starts: null,
            rrule_event_ends: null,
            rrule_incentive_starts: null,
            rrule_incentive_ends: null,
            error: ""
        };
    }

    componentWillMount() {
        this.props.clearPosts();
        const post_id = this.props.match.params.id;
        getCurrentUser()
            .then((res) => {
                this.props
                    .startGetPost(post_id)
                    .then((post_res) => {
                        if (res.data.username !== post_res.data[0].user) {
                            this.props.history.push(`/myChannels`);
                        }
                    })
                    .catch((err) => {
                        console.log(JSON.stringify(err, null, 2));
                    });
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    }

    toggleForms = () => {
        if (this.state.step === "Event") {
            this.setState({
                step: "Incentive"
            });
        }

        if (this.state.step === "Incentive") {
            this.setState({
                step: "Event"
            });
        }
    };

    goBack = () => {
        const post_id = this.props.match.params.id;
        this.props.history.push(`/myPosts/${post_id}/events`);
    };

    recurringSubmit = async (payload) => {
        await this.setState(() => ({
            rrule_payload: payload,
            recurringOpen: false
        }));

        this.generateEventRule(payload);
        this.generateIncentiveRule(payload);
    };

    recurringOpen = () => {
        this.setState(() => ({
            recurringOpen: true
        }));
    };

    clearBaseIncentive = () => {
        this.setState(() => ({
            base_incentive: null,
            step: "Event",
            rrule_incentive_starts: null,
            rrule_incentive_ends: null
        }));
    };

    generateEventRule = (payload) => {
        if (payload.recurringFrequency === "none") {
            this.setState(() => ({
                rrule_event_starts: null,
                rrule_event_ends: null
            }));
        }

        if (!!this.state.base_event && payload.endSelection === "numOccurence") {
            this.setState(() => ({
                event_error: "",
                rrule_event_starts: new RRule({
                    freq: mapFrequencyToRRule(payload.recurringFrequency),
                    dtstart: this.state.base_event.planned_start_date,
                    count: payload.numOccurences
                }),
                rrule_event_ends: new RRule({
                    freq: mapFrequencyToRRule(payload.recurringFrequency),
                    dtstart: this.state.base_event.planned_end_date,
                    count: payload.numOccurences
                })
            }));
        }

        if (!!this.state.base_event && payload.endSelection === "onDate") {
            if (this.state.base_event.planned_end_date > payload.endDate) {
                this.setState(() => ({
                    event_error:
                        "Error, cannot have a recurring end date before the event end date.  Change either the recurring end date or the end date of the event."
                }));
                return null;
            } else {
                this.setState(() => ({
                    event_error: "",
                    rrule_event_starts: new RRule({
                        freq: mapFrequencyToRRule(payload.recurringFrequency),
                        dtstart: this.state.base_event.planned_start_date,
                        until: payload.endDate,
                        byweekday: payload.byweekday.map((day) => {
                            return mapDayToRRule(day);
                        })
                    }),
                    rrule_event_ends: new RRule({
                        freq: mapFrequencyToRRule(payload.recurringFrequency),
                        dtstart: this.state.base_event.planned_end_date,
                        until: payload.endDate,
                        byweekday: payload.byweekday.map((day) => {
                            return mapDayToRRule(day);
                        })
                    })
                }));
            }
        }
    };

    generateIncentiveRule = (payload) => {
        if (!!this.state.base_incentive && payload.recurringFrequency !== "none") {
            this.setState(() => ({
                rrule_incentive_starts: null,
                rrule_incentive_ends: null
            }));
        }

        if (!!this.state.base_incentive && payload.endSelection === "numOccurence") {
            this.setState(() => ({
                incentive_error: "",
                rrule_incentive_starts: new RRule({
                    freq: mapFrequencyToRRule(payload.recurringFrequency),
                    dtstart: this.state.base_incentive.planned_start_date,
                    count: payload.numOccurences
                }),
                rrule_incentive_ends: new RRule({
                    freq: mapFrequencyToRRule(payload.recurringFrequency),
                    dtstart: this.state.base_incentive.planned_end_date,
                    count: payload.numOccurences
                })
            }));
        }

        if (!!this.state.base_incentive && payload.endSelection === "onDate") {
            if (this.state.base_incentive.planned_end_date > payload.endDate) {
                this.setState(() => ({
                    incentive_error:
                        "Error, cannot have a recurring end date before the incentive end date.  Change either the recurring end date or the end date of the incentive."
                }));
                return null;
            } else {
                this.setState(() => ({
                    incentive_error: "",
                    rrule_incentive_starts: new RRule({
                        freq: mapFrequencyToRRule(payload.recurringFrequency),
                        dtstart: this.state.base_incentive.planned_start_date,
                        until: payload.endDate,
                        byweekday: payload.byweekday.map((day) => {
                            return mapDayToRRule(day);
                        })
                    }),
                    rrule_incentive_ends: new RRule({
                        freq: mapFrequencyToRRule(payload.recurringFrequency),
                        dtstart: this.state.base_incentive.planned_end_date,
                        until: payload.endDate,
                        byweekday: payload.byweekday.map((day) => {
                            return mapDayToRRule(day);
                        })
                    })
                }));
            }
        }
    };

    submitAll = async () => {
        await this.setState(() => ({
            finished: true
        }));

        this.submitButtonRef.click();
    };

    mapRRulesToText = () => {
        let rrule_event_string = null;
        let rrule_incentive_string = null;
        if (!!this.state.rrule_event_starts) {
            rrule_event_string = this.state.rrule_event_starts.toText();
        }
        if (!!this.state.rrule_incentive_starts) {
            rrule_incentive_string = this.state.rrule_incentive_starts.toText();
        }

        if (!!rrule_event_string && !rrule_incentive_string) {
            return "Events will reoccur ".concat(rrule_event_string);
        }

        if (!!rrule_event_string && !!rrule_incentive_string && rrule_event_string === rrule_incentive_string) {
            return "Events and incentives will reoccur ".concat(rrule_event_string);
        }

        if (!!rrule_event_string && !!rrule_incentive_string && rrule_event_string !== rrule_incentive_string) {
            return "Events will reoccur "
                .concat(rrule_event_string)
                .concat(".  Incentives will reoccur ")
                .concat(rrule_incentive_string);
        }

        return null;
    };

    handleRecurringEventSubmit = (data) => {
        const promises = [];

        for (var i = 0; i < this.state.rrule_event_starts.all().length; i++) {
            const new_payload = {
                ...data,
                planned_start_date: this.state.rrule_event_starts.all()[i],
                planned_end_date: this.state.rrule_event_ends.all()[i]
            };

            promises.push(this.props.addEvent(new_payload));
        }

        Promise.all(promises)
            .then(() => {
                this.goBack();
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    onSubmit = async (data) => {
        if (this.state.step === "Event") {
            await this.setState(() => ({
                base_event: data
            }));
            this.generateEventRule(this.state.rrule_payload);
            if (this.state.finished === false) {
                alert("Event Draft Saved");
            }
        } else if (this.state.step === "Incentive") {
            await this.setState(() => ({
                base_incentive: data
            }));

            this.generateIncentiveRule(this.state.rrule_payload);
            if (this.state.finished === false) {
                alert("Incentive Draft Saved");
            }
        }

        if (!!this.state.finished) {
            if (!this.state.base_event) {
                await this.setState(() => ({
                    finished: false,
                    error: "Must add an event prior to submission"
                }));
                return;
            }

            // Handle Single Event Submit
            if (!this.state.rrule_event_starts) {
                this.props
                    .addEvent(this.state.base_event)
                    .then((result) => {
                        console.log(result);
                        if (!!this.state.base_incentive) {
                            let payload = {
                                ...this.state.base_incentive,
                                event: result.data.event_id
                            };
                            this.props
                                .addIncentivePackage(payload)
                                .then((result) => {
                                    this.goBack();
                                })
                                .catch((err) => {
                                    console.log(JSON.stringify(err, null, 2));
                                });
                        } else {
                            this.goBack();
                        }
                    })
                    .catch((err) => {
                        this.setState(() => ({
                            finished: false
                        }));
                        console.log(JSON.stringify(err, null, 2));
                    });
                return;
            }

            // Handle Recurring Event Submit w/o Incentives
            if (!!this.state.rrule_event_starts && !this.state.rrule_incentive_starts) {
                this.handleRecurringEventSubmit(this.state.base_event);
            }
        }

        // Handle:
        // Recurring Event Submit
        // Recurring Incentive Submit
        // If any error raised - set state.finished === false and log error.

        // const post_id = this.props.match.params.id;
        // this.props
        //     .addEvent(data)
        //     .then((res) => this.props.history.push(`/myPosts/${post_id}/events`))
        //     .catch((err) => {
        //         console.log(JSON.stringify(err, null, 2));
        //     });
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">
                            Add an Event to Post: <span>{this.props.post && this.props.post.post_title}</span>
                        </h1>
                        <div className="page-header__actions">
                            <span>
                                <button className="button" onClick={this.goBack}>
                                    See All Post Events
                                </button>{" "}
                                <button className="button" onClick={this.recurringOpen}>
                                    Open Recurring Settings
                                </button>{" "}
                                {!!this.state.base_incentive && (
                                    <button className="button" onClick={this.clearBaseIncentive}>
                                        Clear Incentive
                                    </button>
                                )}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="content-container">
                    <RecurringModal isOpen={this.state.recurringOpen} onSubmit={this.recurringSubmit} />
                    <div className="input_group__item">
                        <button className="button" onClick={this.toggleForms}>
                            Open {this.state.step === "Event" ? "Incentive" : "Event"} Settings
                        </button>
                    </div>
                    <div className="input_group__item">
                        <h3>{this.mapRRulesToText()}</h3>
                    </div>
                    <div className="input_group__item">
                        {!!this.state.event_error && <p className="form__error">{this.state.event_error}</p>}
                        {!!this.state.incentive_error && <p className="form__error">{this.state.incentive_error}</p>}
                        {!!this.state.error && <p className="form__error">{this.state.error}</p>}
                    </div>
                    {this.state.step === "Event" && (
                        <div className="input_group__item">
                            <EventForm
                                event={this.state.base_event}
                                read_only={false}
                                id="Event"
                                post={this.props.match.params.id}
                                description={!!this.props.post ? this.props.post.post_description : ""}
                                onSubmit={this.onSubmit}
                                nextStep="Save Event Draft"
                            />
                        </div>
                    )}
                    {this.state.step === "Incentive" && (
                        <div className="input_group__item">
                            <IncentiveForm
                                id="Incentive"
                                description={!!this.props.post ? this.props.post.post_description : ""}
                                incentivePackage={this.state.base_incentive}
                                onSubmit={this.onSubmit}
                                nextStep="Save Incentive Draft"
                                event={this.state.base_event}
                                fromEvent={true}
                            />
                        </div>
                    )}

                    <button className="button" onClick={this.submitAll}>
                        Submit All
                    </button>

                    <button
                        className="button__invisible"
                        type="submit"
                        form={this.state.step}
                        ref={(node) => {
                            this.submitButtonRef = node;
                        }}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToprops = (state) => ({
    post: state.posts.posts[0]
});

const mapDispatchToProps = (dispatch) => ({
    clearPosts: () => dispatch(clearPosts()),
    addEvent: (event) => dispatch(addEvent(event)),
    addIncentivePackage: (incentive) => dispatch(addIncentivePackage(incentive)),
    startGetPost: (id) => dispatch(startGetPost(id))
});

export default connect(
    mapStateToprops,
    mapDispatchToProps
)(AddEventPage);
