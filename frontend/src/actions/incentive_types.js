export const incentiveTypeStart = () => ({
    type: "INCENTIVE_TYPE_START"
});

export const incentiveTypeSuccess = () => ({
    type: "INCENTIVE_TYPE_SUCCESS"
});

export const incentiveTypeFail = (error) => ({
    type: "INCENTIVE_TYPE_FAIL",
    error
});

export const clearIncentiveTypes = () => ({
    type: "CLEAR_INCENTIVE_TYPES"
});

export const setIncentiveTypes = (incentivetypes) => ({
    type: "SET_INCENTIVE_TYPES",
    incentivetypes
});

export const startGetIncentiveTypes = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            API.get(`incentive-choices/`)
                .then((result) => {
                    dispatch(incentiveTypeSuccess());
                    dispatch(setIncentiveTypes(result.data));
                    resolve(result);
                })
                .catch((error) => {
                    dispatch(incentiveTypeFail(error));
                    reject(error);
                });
        });
    };
};
