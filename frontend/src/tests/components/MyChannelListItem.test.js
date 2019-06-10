import { MyChannelListItem } from "../../components/MyChannelListItem";
import { shallow } from "enzyme";
import React from "react";
import channels from "../fixtures/channels";

test("Should render MyChannelListItem", () => {
    const channel = channels[0];
    const wrapper = shallow(<MyChannelListItem {...channel} />);
    expect(wrapper).toMatchSnapshot();
});
