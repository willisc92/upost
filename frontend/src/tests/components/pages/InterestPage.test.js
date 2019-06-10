import { InterestsPage } from "../../../components/pages/InterestsPage";
import React from "react";
import { shallow } from "enzyme";
import mockAxios from "axios";
import interests from "../../fixtures/interests";
import userInterests from "../../fixtures/user_interests";

let startSetUserInterests, startEditUserInterests, wrapper, history;

beforeEach(() => {
    localStorage.setItem("user_id", userInterests[0].id);
    history = {
        push: jest.fn()
    };

    mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
            data: interests
        })
    );

    startSetUserInterests = jest.fn().mockImplementation(() => {
        return Promise.resolve({
            data: userInterests[0]
        });
    });

    startEditUserInterests = jest.fn().mockImplementation(() => {
        return Promise.resolve();
    });

    wrapper = shallow(
        <InterestsPage
            startSetUserInterests={startSetUserInterests}
            startEditUserInterests={startEditUserInterests}
            history={history}
        />
    );
});

test("Should render component correctly", async () => {
    await expect(wrapper).toMatchSnapshot();
    expect(startSetUserInterests).toHaveBeenCalled();
});

test("Should successfully submit changes", async () => {
    await wrapper.instance().submitChanges();
    expect(history.push).toHaveBeenCalledWith("/");
});

test("Should successfully make change to interest selection", () => {
    const prevSelected = interests[0].isSelected;
    wrapper.instance().changeIsSelected(interests[0].interest_tag);
    expect(!prevSelected).toEqual(interests[0].isSelected);
});
