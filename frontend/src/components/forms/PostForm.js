import React from "react";
import { connect } from "react-redux";
import validator from "validator";
import { getAllCommunities } from "../../actions/communities";
import { getAllInterests } from "../../actions/interests";

class PostForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            post_title: this.props.post ? this.props.post.post_title : "",
            poster_name: this.props.post ? this.props.post.poster_name : "",
            phone_number: this.props.post ? this.props.post.phone_number : "",
            cost: this.props.post ? (this.props.post.cost / 100).toString() : "0",
            email: this.props.post ? this.props.post.email : "",
            post_description: this.props.post ? this.props.post.post_description : "",
            deleted_flag: this.props.post ? this.props.post.deleted_flag : false,
            tags: this.props.post ? this.props.post.tags : [],
            error: "",
            channel: this.props.channel,
            picture: this.props.post ? this.props.post.picture : null,
            picture_preview: this.props.post ? this.props.post.picture : null,
            community: !!this.props.post ? this.props.post.community : null
        };
    }

    componentDidMount() {
        this.props
            .getInterests()
            .then(() => {})
            .catch((error) => {
                console.log(JSON.stringify(error, null, 2));
            });
        this.props
            .getAllCommunities()
            .then(() => {})
            .catch((error) => {
                console.log(JSON.stringify(error, null, 2));
            });
    }

    onCommunitySelectChange = (e) => {
        e.persist();
        this.setState(() => ({
            community: e.target.value
        }));
    };

    onTitleChange = (e) => {
        const post_title = e.target.value;
        if (!!post_title) {
            if (post_title.length > 50) {
                this.setState({ error: "Must have a post name 50 characters or less" });
            } else {
                this.setState(() => ({ post_title }));
            }
        } else {
            this.setState(() => ({ post_title }));
        }
    };

    onPosterNameChange = (e) => {
        const poster_name = e.target.value;
        if (!!poster_name) {
            if (poster_name.length > 50) {
                this.setState({ error: "Poster name must be 50 characters or less" });
            } else {
                this.setState(() => ({ poster_name }));
            }
        } else {
            this.setState(() => ({ poster_name }));
        }
    };

    onPhoneNumberChange = (e) => {
        const phone_number = e.target.value;
        if (!!phone_number) {
            if (phone_number.match(/^\d{1,10}$/)) {
                this.setState(() => ({ phone_number }));
            }
        } else {
            this.setState(() => ({ phone_number }));
        }
    };

    onCostChange = (e) => {
        const cost = e.target.value;
        if (!!cost) {
            if (cost.match(/^\d{1,}(\.\d{0,2})?$/)) {
                this.setState(() => ({ cost }));
            }
        } else {
            this.setState(() => ({ cost }));
        }
    };

    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    };

    onDescriptionChange = (e) => {
        const post_description = e.target.value;
        if (!!post_description) {
            if (post_description.length > 500) {
                this.setState({ error: "Post description must be 500 characters or less" });
            } else {
                this.setState(() => ({ post_description }));
            }
        } else {
            this.setState(() => ({ post_description }));
        }
    };

    onDeletedFlagChange = (e) => {
        this.setState((prevState) => ({ deleted_flag: !prevState.deleted_flag }));
    };

    onTagsChange = (e) => {
        let tags = [];
        const options = e.target.options;
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                tags.push(options[i].value);
            }
        }
        this.setState(() => ({ tags }));
    };

    handleImageChange = async (e) => {
        await this.setState({
            picture: e.target.files[0],
            picture_preview: URL.createObjectURL(e.target.files[0])
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.community) {
            this.setState(() => ({ error: "Please select a commmunity from the dropdown menu." }));
        } else if (!this.state.post_title) {
            this.setState(() => ({ error: "Please provide a post title" }));
        } else if (!this.state.poster_name) {
            this.setState(() => ({ error: "Please provide a poster name" }));
        } else if (!this.state.phone_number) {
            this.setState(() => ({ error: "Please provide a post phone number" }));
        } else if (!this.state.email) {
            this.setState(() => ({ error: "Please provide a email" }));
        } else if (!validator.isEmail(this.state.email)) {
            this.setState(() => ({ error: "Email provided is not valid." }));
        } else if (!this.state.post_description) {
            this.setState(() => ({ error: "Please provide a description" }));
        } else if (this.state.tags.length === 0) {
            this.setState(() => ({ error: "Please provide at least one tag for the post" }));
        } else {
            this.setState(() => ({ error: "" }));
            let form_data = new FormData();
            if (!!this.state.picture) {
                form_data.append("picture", this.state.picture);
            }
            form_data.append("user", localStorage.getItem("user_id"));
            form_data.append("post_title", this.state.post_title);
            form_data.append("poster_name", this.state.poster_name);
            form_data.append("phone_number", this.state.phone_number);
            form_data.append("cost", parseFloat(this.state.cost, 10) * 100);
            form_data.append("email", this.state.email);
            form_data.append("post_description", this.state.post_description);
            form_data.append("deleted_flag", this.state.deleted_flag);
            form_data.append("community", this.state.community);
            this.state.tags.forEach((tag) => {
                form_data.append("tags", tag);
            });
            form_data.append("channel", this.state.channel);

            this.props.onSubmit(form_data);
        }
    };

    render() {
        return (
            <form className="form" onSubmit={this.onSubmit} id={this.props.id}>
                {!!this.props.error && !!this.props.error.post_title && (
                    <p className="form_error"> {this.props.error.post_title[0]}</p>
                )}
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <p className="form__error">* - Fields required</p>
                <div className="input-group">
                    <p className="form__label">Post Title*: </p>
                    <input
                        className="text-input"
                        type="text"
                        placeholder="Title"
                        autoFocus
                        value={this.state.post_title}
                        onChange={this.onTitleChange}
                    />
                </div>
                <div className="input-group">
                    <p className="form__label">Poster Name*: </p>
                    <input
                        className="text-input"
                        type="text"
                        placeholder="Name"
                        value={this.state.poster_name}
                        onChange={this.onPosterNameChange}
                    />
                </div>
                <div className="input-group">
                    <p className="form__label">Phone Number (10-digit)*: </p>
                    <input
                        className="text-input"
                        type="text"
                        placeholder="Phone Number"
                        value={this.state.phone_number}
                        onChange={this.onPhoneNumberChange}
                    />
                </div>
                <div className="input-group">
                    <p className="form__label"> Cost ($)*: </p>
                    <input
                        className="text-input"
                        type="text"
                        placeholder="Cost"
                        value={this.state.cost}
                        onChange={this.onCostChange}
                    />
                </div>
                <div className="input-group">
                    <p className="form__label">Email*: </p>
                    <input
                        className="text-input"
                        type="text"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.onEmailChange}
                    />
                </div>
                <div className="input-group">
                    <p className="form__label">Description*: </p>
                    <textarea
                        className="textarea"
                        type="text"
                        placeholder="Description"
                        value={this.state.post_description}
                        onChange={this.onDescriptionChange}
                    />
                </div>
                <div>
                    <p>
                        Visible*: <span />
                        <input
                            type="checkbox"
                            name="prop1"
                            id="string"
                            checked={!this.state.deleted_flag}
                            onChange={this.onDeletedFlagChange}
                        />
                    </p>
                </div>
                <p>Image upload: </p>
                {!!this.state.picture ? (
                    <img className="post_image" src={this.state.picture_preview} />
                ) : (
                    <p>No image uploaded.</p>
                )}
                <input type="file" id="image" accept="image/png, image/jpeg" onChange={this.handleImageChange} />
                {!!this.props.interests && (
                    <div>
                        <p>Interest Tags (Hold down "Control", or "Command" on a Mac, to select more than one.): </p>
                        <select multiple onChange={this.onTagsChange} defaultValue={this.state.tags}>
                            {this.props.interests.map((interest) => {
                                return (
                                    <option key={interest.interest_tag} value={interest.interest_tag}>
                                        {" "}
                                        {interest.interest_tag}{" "}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                )}
                <div className="input-group">
                    <p className="form__label">Community *: </p>
                    <select
                        onChange={this.onCommunitySelectChange}
                        defaultValue={this.props.post ? this.props.post.community : ""}
                    >
                        <option key="empty" value="" />
                        {this.props.communities.map((community) => {
                            return (
                                <option key={community.community_name} value={community.community_name}>
                                    {community.community_name}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <button className="button">{this.props.nextStep}</button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    error: !!state.posts.error && state.posts.error.response.data,
    interests: !!state.userInterests && state.userInterests.userInterests,
    communities: !!state.communities && state.communities.communities
});

const mapDispatchToProps = (dispatch) => ({
    getAllCommunities: () => dispatch(getAllCommunities()),
    getInterests: () => dispatch(getAllInterests())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostForm);
