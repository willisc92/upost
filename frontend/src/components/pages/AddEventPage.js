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
import MessageModal from "../modals/MessageModal";
import CustomStepper from "../CustomStepper";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

class AddEventPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messageOpen: false,
            message: "",
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
                byweekday: null
            },
            rrule_event_starts: null,
            rrule_event_ends: null,
            rrule_incentive_starts: null,
            rrule_incentive_ends: null,
            error: "",
            steps: [],
            activeStep: undefined
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
                        } else {
                            this.setState(() => ({
                                steps: [
                                    { label: "Bulletin Boards", onClick: this.moveToBulletinBoards },
                                    {
                                        label: `Bulletin Board`,
                                        onClick: this.goToChannel
                                    },
                                    { label: `Post: ${this.props.post.post_title}`, onClick: this.returnToPost },
                                    { label: "Events", onClick: this.goBack },
                                    { label: "Add Event", onClick: this.submitFormAndSwitch },
                                    { label: "Add Perks (Optional)", onClick: this.submitFormAndSwitch }
                                ],
                                activeStep: 4
                            }));
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

    toggleForms = async () => {
        this.setState({
            step: "Event"
        });
    };

    goBack = () => {
        const post_id = this.props.match.params.id;
        this.props.history.push(`/post-events/${post_id}`);
    };

    goToPost = () => {
        const post_id = this.props.match.params.id;
        this.props.history.push(`/myPosts/${post_id}/edit`);
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
            rrule_incentive_ends: null,
            message_open: true,
            message: "Perks Cleared"
        }));
    };

    clearBaseEvent = () => {
        this.setState(() => ({
            base_event: null,
            step: "Event",
            rrule_event_starts: null,
            rrule_event_ends: null,
            message_open: true,
            message: "Event Cleared"
        }));
    };

    clearBaseEventandIncentive = () => {
        this.setState(() => ({
            base_event: null,
            step: "Event",
            rrule_event_starts: null,
            rrule_event_ends: null,
            base_incentive: null,
            rrule_incentive_starts: null,
            rrule_incentive_ends: null,
            message_open: true,
            message: "Event and Perks Cleared"
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
                payload.byweekday.map((day) => {
                    return mapDayToRRule(day);
                });

                this.setState(() => ({
                    event_error: "",
                    rrule_event_starts: new RRule({
                        freq: mapFrequencyToRRule(payload.recurringFrequency),
                        dtstart: this.state.base_event.planned_start_date,
                        until: payload.endDate,
                        byweekday: payload.byweekday.length === 0 ? null : payload.byweekday
                    }),
                    rrule_event_ends: new RRule({
                        freq: mapFrequencyToRRule(payload.recurringFrequency),
                        dtstart: this.state.base_event.planned_end_date,
                        until: payload.endDate,
                        byweekday: payload.byweekday.length === 0 ? null : payload.byweekday
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
                        "Error, cannot have a recurring end date before the perks end date.  Change either the recurring end date or the end date of the perks."
                }));
                return null;
            } else {
                payload.byweekday.map((day) => {
                    return mapDayToRRule(day);
                });
                this.setState(() => ({
                    incentive_error: "",
                    rrule_incentive_starts: new RRule({
                        freq: mapFrequencyToRRule(payload.recurringFrequency),
                        dtstart: this.state.base_incentive.planned_start_date,
                        until: payload.endDate,
                        byweekday: payload.byweekday.length === 0 ? null : payload.byweekday
                    }),
                    rrule_incentive_ends: new RRule({
                        freq: mapFrequencyToRRule(payload.recurringFrequency),
                        dtstart: this.state.base_incentive.planned_end_date,
                        until: payload.endDate,
                        byweekday: payload.byweekday.length === 0 ? null : payload.byweekday
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

    submitWithoutSaving = async () => {
        await this.setState(() => ({
            step: "Event",
            finished: true
        }));

        this.submitButtonRef.click();
    };

    submitFormAndSwitch = () => {
        const e = new Event("submit", { cancelable: true });

        if (this.state.step === "Event") {
            document.getElementById("Event").dispatchEvent(e);
        } else {
            document.getElementById("Incentive").dispatchEvent(e);
        }
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
            return "Events and perks will reoccur ".concat(rrule_event_string);
        }

        if (!!rrule_event_string && !!rrule_incentive_string && rrule_event_string !== rrule_incentive_string) {
            return "Events will reoccur "
                .concat(rrule_event_string)
                .concat(".  Perks will reoccur ")
                .concat(rrule_incentive_string);
        }

        return null;
    };

    handleRecurringEventSubmit = (data) => {
        const promises = [];

        for (let i = 0; i < this.state.rrule_event_starts.all().length; i++) {
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

    handleRecurringEventandIncentiveSubmit = () => {
        for (let i = 0; i < this.state.rrule_event_starts.all().length; i++) {
            const new_event_payload = {
                ...this.state.base_event,
                planned_start_date: this.state.rrule_event_starts.all()[i],
                planned_end_date: this.state.rrule_event_ends.all()[i]
            };

            this.props
                .addEvent(new_event_payload)
                .then((res) => {
                    const event_id = res.data.event_id;
                    const new_incentive_payload = {
                        ...this.state.base_incentive,
                        planned_start_date: this.state.rrule_incentive_starts.all()[i],
                        planned_end_date: this.state.rrule_incentive_ends.all()[i],
                        event: event_id
                    };
                    this.props
                        .addIncentivePackage(new_incentive_payload)
                        .then((res) => {})
                        .catch((err) => {
                            this.setState(() => ({
                                messageOpen: true,
                                message: "Something went wrong.",
                                finished: false
                            }));
                            console.log(JSON.stringify(err, null, 2));
                            return;
                        });
                })
                .catch((err) => {
                    this.setState(() => ({
                        messageOpen: true,
                        message: "Something went wrong.",
                        finished: false
                    }));
                    console.log(JSON.stringify(err, null, 2));
                    return;
                });
        }

        this.goBack();
    };

    onSubmit = async (data) => {
        if (this.state.step === "Event") {
            await this.setState(() => ({
                base_event: data
            }));
            this.generateEventRule(this.state.rrule_payload);

            if (this.state.finished === false) {
                this.setState((prevState) => ({
                    messageOpen: true,
                    message: "Event Draft Saved",
                    step: "Incentive",
                    activeStep: prevState.activeStep + 1
                }));
            }
        } else if (this.state.step === "Incentive") {
            await this.setState(() => ({
                base_incentive: data
            }));
            this.generateIncentiveRule(this.state.rrule_payload);

            if (this.state.finished === false) {
                this.setState((prevState) => ({
                    messageOpen: true,
                    message: "Perk Package Draft Saved",
                    step: "Event",
                    activeStep: prevState.activeStep - 1
                }));
            }
        }

        if (!!this.state.finished) {
            if (!this.state.base_event) {
                await this.setState(() => ({
                    finished: false,
                    messageOpen: true,
                    message: "Must add an event prior to submission"
                }));
                return;
            }

            // Handle Single Event Submit
            if (!this.state.rrule_event_starts) {
                this.props
                    .addEvent(this.state.base_event)
                    .then((result) => {
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
                                    this.setState(() => ({
                                        finished: false
                                    }));
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

            // Handle Recurring Event Submit w/ Incentives
            if (!!this.state.rrule_event_starts && !!this.state.rrule_incentive_starts) {
                this.handleRecurringEventandIncentiveSubmit();
            }
        }
    };

    handleMessageModalClose = () => {
        this.setState(() => ({
            messageOpen: false
        }));
    };

    goToChannel = () => {
        const channel = this.props.post.channel;
        this.props.history.push(`/channels/${channel}`);
    };

    moveToBulletinBoards = () => {
        this.props.history.push("/myChannels");
    };

    returnToPost = () => {
        this.props.history.push(`/post/${this.props.post.post_id}`);
    };

    render() {
        const read_only = !!this.props.post && this.props.post.deleted_flag;

        return (
            <div>
                <Box bgcolor="secondary.main" py={3}>
                    <Container maxWidth="xl">
                        {this.state.step === "Event" && (
                            <Typography variant="h1" gutterBottom>
                                Add an Event to Post:{" "}
                                <Typography variant="inherit" display="inline" color="primary">
                                    {this.props.post && this.props.post.post_title}
                                </Typography>
                            </Typography>
                        )}
                        <CustomStepper steps={this.state.steps} activeStep={this.state.activeStep} />
                        {this.state.step === "Incentive" && (
                            <Typography variant="h1" gutterBottom color="primary">
                                (Optional){" "}
                                <Typography variant="inherit" display="inline" color="textPrimary">
                                    Add Perks to the Event{" "}
                                </Typography>
                            </Typography>
                        )}
                        {read_only ? (
                            <Box>
                                <Typography variant="h2" color="error" gutterBottom>
                                    You must restore the post of this event before adding.
                                </Typography>
                                <Button color="primary" variant="contained" onClick={this.goToPost}>
                                    Go to Post
                                </Button>
                            </Box>
                        ) : (
                            <Box>
                                <span>
                                    {this.state.step === "Incentive" && (
                                        <React.Fragment>
                                            <Button color="primary" variant="contained" onClick={this.toggleForms}>
                                                Go Back
                                            </Button>{" "}
                                        </React.Fragment>
                                    )}
                                    <Button color="primary" variant="contained" onClick={this.goBack}>
                                        See All Post Events
                                    </Button>{" "}
                                    <Button color="primary" variant="contained" onClick={this.recurringOpen}>
                                        Open Recurring Settings
                                    </Button>{" "}
                                </span>
                            </Box>
                        )}
                    </Container>
                </Box>
                <Container maxWidth="xl">
                    <RecurringModal isOpen={this.state.recurringOpen} onSubmit={this.recurringSubmit} />
                    <MessageModal
                        isOpen={this.state.messageOpen}
                        message={this.state.message}
                        closeMessageModal={this.handleMessageModalClose}
                    />
                    {!read_only && (
                        <Box py={2}>
                            {!!this.state.base_incentive && (
                                <React.Fragment>
                                    <Button color="primary" variant="contained" onClick={this.clearBaseIncentive}>
                                        Clear Perks
                                    </Button>{" "}
                                </React.Fragment>
                            )}
                            {!!this.state.base_event && this.state.step === "Event" && (
                                <React.Fragment>
                                    <Button color="primary" variant="contained" onClick={this.clearBaseEvent}>
                                        Clear Event
                                    </Button>{" "}
                                </React.Fragment>
                            )}
                            {!!this.state.base_event && !!this.state.base_incentive && (
                                <React.Fragment>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={this.clearBaseEventandIncentive}
                                    >
                                        Clear Event and Perks
                                    </Button>{" "}
                                </React.Fragment>
                            )}
                        </Box>
                    )}
                    <Box>
                        <Typography variant="h3" color="primary">
                            {this.mapRRulesToText()}
                        </Typography>
                    </Box>
                    {!!this.state.event_error && (
                        <Box py={2}>
                            <Typography variant="h3" color="error">
                                {this.state.event_error}
                            </Typography>
                        </Box>
                    )}
                    {!!this.state.incentive_error && (
                        <Box py={2}>
                            <Typography variant="h3" color="error">
                                {this.state.incentive_error}
                            </Typography>
                        </Box>
                    )}
                    {!!this.state.error && (
                        <Box py={2}>
                            <Typography variant="h3" color="error">
                                {this.state.error}
                            </Typography>
                        </Box>
                    )}
                    {this.state.step === "Event" && (
                        <EventForm
                            event={this.state.base_event}
                            read_only={read_only}
                            id="Event"
                            post={this.props.match.params.id}
                            description={!!this.props.post ? this.props.post.post_description : ""}
                            onSubmit={this.onSubmit}
                            nextStep="Continue"
                            showAttendees={false}
                        />
                    )}
                    {this.state.step === "Incentive" && (
                        <IncentiveForm
                            id="Incentive"
                            description={!!this.props.post ? this.props.post.post_description : ""}
                            incentivePackage={this.state.base_incentive}
                            onSubmit={this.onSubmit}
                            nextStep="Save Perks and Go Back"
                            event={this.state.base_event}
                            fromEvent={true}
                        />
                    )}

                    {!read_only && !!this.state.base_event && (
                        <React.Fragment>
                            <Button color="primary" variant="contained" onClick={this.submitAll}>
                                Save and Submit All
                            </Button>{" "}
                        </React.Fragment>
                    )}

                    {this.state.step === "Incentive" && (
                        <React.Fragment>
                            <Button color="primary" variant="contained" onClick={this.submitWithoutSaving}>
                                Skip Perks and Submit
                            </Button>
                        </React.Fragment>
                    )}

                    <button
                        className="button__invisible"
                        type="submit"
                        form={this.state.step}
                        ref={(node) => {
                            this.submitButtonRef = node;
                        }}
                    />
                </Container>
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
