import API from "../utils/API";

export const schoolStart = () => ({
    type: "SCHOOL_START"
});

export const schoolFail = (error) => ({
    type: "SCHOOL_FAIL",
    error
});

export const schoolSuccess = () => ({
    type: "SCHOOL_SUCCESS"
});

export const setSchools = (schools) => ({
    type: "SET_SCHOOLS",
    schools
});

export const getAllSchools = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            API.get("schools/")
                .then((result) => {
                    dispatch(schoolSuccess());
                    dispatch(setSchools(result.data));
                    resolve(result);
                })
                .catch((error) => {
                    dispatch(schoolFail(error));
                    reject(error);
                });
        });
    };
};
