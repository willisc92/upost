import React from "react";
import { shallow } from "enzyme";
import { DashboardPage } from "../../../components/pages/DashboardPage";
import { promises } from "fs";
import interestRandomPosts from "../../fixtures/interests_random_posts";
import interests from "../../fixtures/interests";

let getAllInterests, startSetInterestRandomPosts;

beforeEach(() => {
    getAllInterests = jest.fn().mockImplementation(() => {
        return Promise.resolve();
    });
    startSetInterestRandomPosts = jest.fn(() => {
        return promises.resolve();
    });
});

test("Should render Dashboard page for non logged in user", () => {
    const isAuthenticated = false;
    const wrapper = shallow(
        <DashboardPage
            getAllInterests={getAllInterests}
            startSetInterestRandomPosts={startSetInterestRandomPosts}
            interestRandomPosts={interestRandomPosts}
            isAuthenticated={isAuthenticated}
            interests={interests}
        />
    );
    expect(wrapper).toMatchSnapshot();
});

test("Should render Dashboard page for logged in user", () => {
    const isAuthenticated = true;
    localStorage.setItem("first_name", "WILLIS");
    const wrapper = shallow(
        <DashboardPage
            getAllInterests={getAllInterests}
            startSetInterestRandomPosts={startSetInterestRandomPosts}
            interestRandomPosts={interestRandomPosts}
            isAuthenticated={isAuthenticated}
            interests={interests}
        />
    );
    expect(wrapper).toMatchSnapshot();
});
