import React from "react";
import PostForm from "../forms/PostForm";
import EventForm from "../forms/EventForm";
import IncentiveForm from "../forms/IncentiveForm";
import { connect } from "react-redux";
import { addPost } from "../../actions/posts";
import { addEvent } from "../../actions/events";
import { addIncentivePackage } from "../../actions/incentivePackage";
import { startGetChannel } from "../../actions/channels";
import { getCurrentUser } from "../../actions/auth";
import { RecurringModal } from "../modals/RecurringModal";
import { mapFrequencyToRRule, mapDayToRRule } from "../../utils/recurring";
import { RRule } from "rrule";

export class AddPostPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: "Post",
            postID: null,
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
            rrule_starts: null,
            rrule_ends: null,
            error: ""
        };
    }

    componentDidMount() {
        const channel_id = this.props.match.params.id;
        getCurrentUser()
            .then((res) => {
                this.props
                    .startGetChannel(channel_id)
                    .then((channel_res) => {
                        if (res.data.username !== channel_res.data[0].user) {
                            this.props.history.push("/myChannels");
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

    onSubmit = async (data) => {
        switch (this.state.step) {
            case "Post": {
                this.props
                    .addPost(data)
                    .then((result) => {
                        if (this.state.finished) {
                            this.handleReturn();
                        } else {
                            this.setState(() => ({
                                step: "Event",
                                description: result.data.post_description,
                                postID: result.data.post_id
                            }));
                        }
                    })
                    .catch((err) => {
                        console.log(JSON.stringify(err, null, 2));
                    });
                break;
            }
            case "Event": {
                // Handle recurringFrequency === "none".
                if (this.state.rrule_payload.recurringFrequency === "none") {
                    this.props
                        .addEvent(data)
                        .then((result) => {
                            if (this.state.finished) {
                                this.handleReturn();
                            } else {
                                this.setState(() => ({
                                    step: "Incentive"
                                }));
                            }
                        })
                        .catch((err) => {
                            console.log(JSON.stringify(err, null, 2));
                        });
                    break;
                }

                // Handle recurringFrequency !== "none"
                // Handle numOccurence frequency...
                if (this.state.rrule_payload.endSelection === "numOccurence") {
                    await this.setState(() => ({
                        error: "",
                        rrule_starts: new RRule({
                            freq: mapFrequencyToRRule(this.state.rrule_payload.recurringFrequency),
                            dtstart: data.planned_start_date,
                            count: this.state.rrule_payload.numOccurences
                        }),
                        rrule_ends: new RRule({
                            freq: mapFrequencyToRRule(this.state.rrule_payload.recurringFrequency),
                            dtstart: data.planned_end_date,
                            count: this.state.rrule_payload.numOccurences
                        })
                    }));

                    this.handleRecurringEventSubmit(data);
                    break;
                }

                if (this.state.rrule_payload.endSelection === "onDate") {
                    if (data.planned_end_date > this.state.rrule_payload.endDate) {
                        await this.setState(() => ({
                            error:
                                "Error, cannot have a recurring end date before the event end date.  Change either the recurring end date or the end date of the event."
                        }));
                        return;
                    } else {
                        await this.setState(() => ({
                            error: "",
                            rrule_starts: new RRule({
                                freq: mapFrequencyToRRule(this.state.rrule_payload.recurringFrequency),
                                dtstart: data.planned_start_date,
                                until: this.state.rrule_payload.endDate,
                                byweekday: this.state.rrule_payload.byweekday.map((day) => {
                                    return mapDayToRRule(day);
                                })
                            }),
                            rrule_ends: new RRule({
                                freq: mapFrequencyToRRule(this.state.rrule_payload.recurringFrequency),
                                dtstart: data.planned_end_date,
                                until: this.state.rrule_payload.endDate,
                                byweekday: this.state.rrule_payload.byweekday.map((day) => {
                                    return mapDayToRRule(day);
                                })
                            })
                        }));

                        this.handleRecurringEventSubmit(data);
                        break;
                    }
                }
            }

            case "Incentive": {
                // Handle recurringFrequency === "none".
                if (this.state.rrule_payload.recurringFrequency === "none") {
                    this.props
                        .addIncentivePackage(data)
                        .then((result) => {
                            this.handleReturn();
                        })
                        .catch((err) => {
                            console.log(JSON.stringify(err, null, 2));
                        });
                    break;
                }

                // Handle recurringFrequency !== "none"
                // Handle numOccurence frequency...
                if (this.state.rrule_payload.endSelection === "numOccurence") {
                    await this.setState(() => ({
                        error: "",
                        rrule_starts: new RRule({
                            freq: mapFrequencyToRRule(this.state.rrule_payload.recurringFrequency),
                            dtstart: data.planned_start_date,
                            count: this.state.rrule_payload.numOccurences
                        }),
                        rrule_ends: new RRule({
                            freq: mapFrequencyToRRule(this.state.rrule_payload.recurringFrequency),
                            dtstart: data.planned_end_date,
                            count: this.state.rrule_payload.numOccurences
                        })
                    }));

                    this.handleRecurringIncentiveSubmit(data);
                    break;
                }

                if (this.state.rrule_payload.endSelection === "onDate") {
                    if (data.planned_end_date > this.state.rrule_payload.endDate) {
                        await this.setState(() => ({
                            error:
                                "Error, cannot have a recurring end date before the event end date.  Change either the recurring end date or the end date of the event."
                        }));
                        return;
                    } else {
                        await this.setState(() => ({
                            error: "",
                            rrule_starts: new RRule({
                                freq: mapFrequencyToRRule(this.state.rrule_payload.recurringFrequency),
                                dtstart: data.planned_start_date,
                                until: this.state.rrule_payload.endDate,
                                byweekday: this.state.rrule_payload.byweekday.map((day) => {
                                    return mapDayToRRule(day);
                                })
                            }),
                            rrule_ends: new RRule({
                                freq: mapFrequencyToRRule(this.state.rrule_payload.recurringFrequency),
                                dtstart: data.planned_end_date,
                                until: this.state.rrule_payload.endDate,
                                byweekday: this.state.rrule_payload.byweekday.map((day) => {
                                    return mapDayToRRule(day);
                                })
                            })
                        }));

                        this.handleRecurringIncentiveSubmit(data);
                        break;
                    }
                }
            }

            default: {
            }
        }
    };

    handleRecurringEventSubmit = (data) => {
        const promises = [];

        for (var i = 0; i < this.state.rrule_starts.all().length; i++) {
            const new_payload = {
                post: data.post,
                user: data.user,
                location: data.location,
                capacity: data.capacity,
                planned_start_date: this.state.rrule_starts.all()[i],
                planned_end_date: this.state.rrule_ends.all()[i]
            };

            promises.push(this.props.addEvent(new_payload));
        }

        Promise.all(promises)
            .then(() => {
                if (this.state.finished) {
                    this.handleReturn();
                } else {
                    this.setState(() => ({
                        step: "Incentive"
                    }));
                }
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    handleRecurringIncentiveSubmit = (data) => {
        const promises = [];

        for (var i = 0; i < this.state.rrule_starts.all().length; i++) {
            const new_payload = {
                post: data.post,
                user: data.user,
                diet_option: data.diet_option,
                incentive_type: data.incentive_type,
                ip_description: data.ip_description,
                planned_start_date: this.state.rrule_starts.all()[i],
                planned_end_date: this.state.rrule_ends.all()[i]
            };
            promises.push(this.props.addIncentivePackage(new_payload));
        }

        Promise.all(promises)
            .then((result) => {
                this.handleReturn();
            })
            .catch((err) => {
                console.log(JSON.stringify(err, null, 2));
            });
    };

    handleReturn = () => {
        const channel_id = this.props.match.params.id;
        this.props.history.push(`/myChannels/${channel_id}`);
    };

    onTriggerSaveReturn = async () => {
        await this.setState({ finished: true });
        this.submitButtonRef.click();
    };

    mapStepToTitle = () => {
        switch (this.state.step) {
            case "Post":
                return "Add a Post";
            case "Event":
                return "Add an Event";
            case "Incentive":
                return "Add an Incentive";
            default:
                return "";
        }
    };

    skipEvent = () => {
        this.setState(() => ({
            step: "Incentive"
        }));
    };

    recurringSubmit = async (payload) => {
        await this.setState(() => ({
            rrule_payload: payload,
            recurringOpen: false
        }));

        console.log(this.state.rrule_payload);
    };

    recurringOpen = () => {
        this.setState(() => ({
            recurringOpen: true
        }));
    };

    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">{this.mapStepToTitle()}</h1>
                        {(this.state.step === "Event" || this.state.step === "Incentive") && (
                            <div className="page-header__actions">
                                <div>
                                    <button className="button" onClick={this.recurringOpen}>
                                        Open Recurring {this.state.step} Settings
                                    </button>{" "}
                                    {"  "}
                                    {this.state.step !== "Incentive" && (
                                        <button className="button" onClick={this.onTriggerSaveReturn}>
                                            {`Save ${this.state.step} and Return to Channel`}
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="content-container">
                    {!!this.state.error && <p className="form__error">{this.state.error}</p>}
                    {(this.state.step === "Event" || this.state.step === "Incentive") && (
                        <div>
                            <RecurringModal isOpen={this.state.recurringOpen} onSubmit={this.recurringSubmit} />
                        </div>
                    )}
                    {this.state.step === "Post" && (
                        <PostForm
                            id="Post"
                            onSubmit={this.onSubmit}
                            channel={this.props.match.params.id}
                            nextStep="Save Post and Add Event/Incentive"
                        />
                    )}
                    {this.state.step === "Event" && (
                        <div className="input_group__item">
                            <div className="input_group__item">
                                <EventForm
                                    id="Event"
                                    post={this.state.postID}
                                    description={this.state.description}
                                    onSubmit={this.onSubmit}
                                    channel={this.props.match.params.id}
                                    nextStep="Save and Add Incentive"
                                />
                            </div>
                            <button className="button" onClick={this.skipEvent}>
                                Skip and Add Incentive
                            </button>
                        </div>
                    )}
                    {this.state.step === "Incentive" && (
                        <div className="input_group__item">
                            <IncentiveForm
                                id="Incentive"
                                description={this.state.description}
                                post={this.state.postID}
                                onSubmit={this.onSubmit}
                                nextStep="Save Incentive and Return to Channel"
                            />
                        </div>
                    )}

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

const mapStateToProps = (state) => ({
    channel: state.channels.channels[0]
});

const mapDispatchToProps = (dispatch) => ({
    addPost: (post) => dispatch(addPost(post)),
    addEvent: (event) => dispatch(addEvent(event)),
    addIncentivePackage: (incentive) => dispatch(addIncentivePackage(incentive)),
    startGetChannel: (channel_id) => dispatch(startGetChannel(channel_id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPostPage);
