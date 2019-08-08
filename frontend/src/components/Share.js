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
import ButtonBase from "@material-ui/core/ButtonBase";

export class ShareGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { quote, url } = this.props;

        return (
            <Box display="flex">
                <Box paddingRight={0.5}>
                    <ButtonBase>
                        <FacebookShareButton quote={quote} url={url}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <FacebookIcon size={30} round />
                                <FacebookShareCount url={url}>
                                    {(shareCount) => <span className="myShareCountWrapper">{shareCount}</span>}
                                </FacebookShareCount>
                            </Box>
                        </FacebookShareButton>
                    </ButtonBase>
                </Box>
                <Box paddingRight={0.5}>
                    <ButtonBase>
                        <TwitterShareButton quote={quote} url={url}>
                            <TwitterIcon size={30} round />
                        </TwitterShareButton>
                    </ButtonBase>
                </Box>
                <Box paddingRight={0.5}>
                    <ButtonBase>
                        <EmailShareButton quote={quote} url={url}>
                            <EmailIcon size={30} round />
                        </EmailShareButton>
                    </ButtonBase>
                </Box>
            </Box>
        );
    }
}
