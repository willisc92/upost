import React from "react";

export const getMyChannels = (channels) =>
    channels.filter((channel) => channel.user == localStorage.getItem("username"));
