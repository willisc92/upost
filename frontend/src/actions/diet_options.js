export const dietOptionsStart = () => ({
    type: "DIET_OPTIONS_START"
});

export const dietOptionsSuccess = () => ({
    type: "DIET_OPTIONS_SUCCESS"
});

export const dietOptionsFail = (error) => ({
    type: "DIET_OPTIONS_FAIL",
    error
});

export const clerDietOptions = () => ({
    type: "CLEAR_DIET_OPTIONS"
});

export const setDietOptions = (dietOptions) => ({
    type: "SET_DIET_OPTIONS",
    dietOptions
});

export const startGetDietOptions = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            API.get(`diet-options/`)
                .then((result) => {
                    dispatch(dietOptionsSuccess());
                    dispatch(setDietOptions(result.data));
                    resolve(result);
                })
                .catch((error) => {
                    dispatch(dietOptionsFail(error));
                    reject(error);
                });
        });
    };
};
