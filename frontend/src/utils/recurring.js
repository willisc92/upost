import RRule from "rrule";

export const mapEndDateToError = (recurrEndDate, eventEndDate) => {
    let error = "";
    if (recurrEndDate < eventEndDate) {
        error = "Recurring end date cannot be before the event end date";
    }
    return error;
};

export const dayDifference = (startDate, endDate) => {
    const res = Math.abs(startDate - endDate) / 1000;
    const days = res / 86400;
    return days;
};

export const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export const mapFrequencyToRRule = (frequency) => {
    if (frequency === "daily") {
        return RRule.DAILY;
    }

    if (frequency === "weekly") {
        return RRule.WEEKLY;
    }

    if (frequency === "monthly") {
        return RRule.MONTHLY;
    }
};

export const mapDayToRRule = (day) => {
    if (day === "0") {
        return RRule.MO;
    }

    if (day === "1") {
        return RRule.TU;
    }

    if (day === "2") {
        return RRule.WE;
    }

    if (day === "3") {
        return RRule.TH;
    }

    if (day === "4") {
        return RRule.FR;
    }

    if (day === "5") {
        return RRule.SA;
    }

    if (day === "6") {
        return RRule.SU;
    }
};
