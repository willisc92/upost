import { SignUpPage } from "../../../components/pages/SignUpPage";
import React from "react";
import { shallow } from "enzyme";
import moment from "moment";

let wrapper, authSignup, authFail, history;

beforeEach(() => {
    authSignup = jest.fn().mockImplementation(() => {
        return Promise.resolve();
    });
    history = {
        push: jest.fn()
    };
    authFail = jest.fn();
    wrapper = shallow(<SignUpPage authSignup={authSignup} authFail={authFail} history={history} />);
});

test("Should render SignUpPage", () => {
    expect(wrapper).toMatchSnapshot();
});

test("Should handle onSubmit", async () => {
    const input = {
        date: moment(),
        formInput: {
            email: {
                value: "testemail@hotmail.com"
            },
            username: {
                value: "testuser"
            },
            password: {
                value: "test_password"
            },
            passwordConfirmation: {
                value: "test_password"
            },
            firstName: {
                value: "first_name"
            },
            middleName: {
                value: "middle_name"
            },
            lastName: {
                value: "last_name"
            },
            country: {
                value: "country"
            },
            state: {
                value: "state"
            },
            streetName: {
                value: "123 fake street"
            },
            postalCode: {
                value: "A1B 2R1"
            },
            city: {
                value: "Calgary"
            },
            sex: {
                value: "Male"
            },
            phoneNumber: {
                value: 4034010115
            }
        }
    };

    await wrapper.instance().onSubmit(input);
    expect(history.push).toHaveBeenCalledWith("/interests");
});
