import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { makeStyles, withStyles } from "@material-ui/core";
import StepConnector from "@material-ui/core/StepConnector";
import Check from "@material-ui/icons/Check";
import clsx from "clsx";
import Tooltip from "@material-ui/core/Tooltip";

const QontoConnector = withStyles((theme) => ({
    alternativeLabel: {
        top: 10,
        left: "calc(-50% + 16px)",
        right: "calc(50% + 16px)"
    },
    active: {
        "& $line": {
            borderColor: theme.palette.primary.main
        }
    },
    completed: {
        "& $line": {
            borderColor: theme.palette.primary.main
        }
    },
    disabled: {
        "& $line": {
            borderColor: "black"
        }
    },
    line: {
        borderTopWidth: 3,
        borderRadius: 1
    }
}))(StepConnector);

const useQontoStepIconStyles = makeStyles((theme) => ({
    root: {
        color: "black",
        display: "flex",
        height: 22,
        alignItems: "center"
    },
    active: {
        color: theme.palette.primary.main
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "currentColor"
    },
    completed: {
        color: theme.palette.primary.main,
        zIndex: 1,
        fontSize: 18
    }
}));

const QontoStepIcon = (props) => {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div className={clsx(classes.root, { [classes.active]: active })}>
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
};

const CustomStepper = (props) => {
    return (
        <Stepper
            activeStep={props.activeStep}
            alternativeLabel
            style={{ backgroundColor: "transparent", padding: 10 }}
            connector={<QontoConnector />}
        >
            {props.steps.map((step) => {
                return (
                    <Tooltip title={`move to: ${step.label}`} style={{ cursor: "pointer" }} key={step.label}>
                        <Step onClick={step.onClick}>
                            <StepLabel StepIconComponent={QontoStepIcon}>{step.label}</StepLabel>
                        </Step>
                    </Tooltip>
                );
            })}
        </Stepper>
    );
};

export default CustomStepper;
