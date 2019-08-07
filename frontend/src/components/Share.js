import React from "react";
import {
    FacebookShareButton,
    FacebookIcon,
    FacebookShareCount,
    EmailShareButton,
    EmailIcon,
    TwitterIcon,
    TwitterShareButton
} from "react-share";
import Box from "@material-ui/core/Box";

export class ShareGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { quote, url } = this.props;

        return (
            <Box display="flex">
                <Box paddingRight={0.5}>
                    <FacebookShareButton quote={quote} url={url}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <FacebookIcon size={30} round />
                            <FacebookShareCount url={url}>
                                {(shareCount) => <span className="myShareCountWrapper">{shareCount}</span>}
                            </FacebookShareCount>
                        </Box>
                    </FacebookShareButton>
                </Box>
                <Box paddingRight={0.5}>
                    <TwitterShareButton quote={quote} url={url}>
                        <TwitterIcon size={30} round />
                    </TwitterShareButton>
                </Box>
                <Box paddingRight={0.5}>
                    <EmailShareButton quote={quote} url={url}>
                        <EmailIcon size={30} round />
                    </EmailShareButton>
                </Box>
            </Box>
        );
    }
}
