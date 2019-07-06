import API from "../utils/API";

export const incentivePackageStart = () => ({
    type: "INCENTIVE_PACKAGE_START"
});

export const addIncentivePackage = (incentivePackage) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(incentivePackageStart());
            API.post("incentive-packages/", incentivePackage)
                .then((result) => {
                    dispatch(incentivePackageSuccess());
                    resolve(result);
                })
                .catch((err) => {
                    dispatch(incentivePackageFail(err));
                    reject(err);
                });
        });
    };
};

export const editIncentivePackage = (id, updates) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(incentivePackageStart());
            API.put(`incentive-packages/${id}/`, updates)
                .then((result) => {
                    dispatch(incentivePackageSuccess());
                    resolve(result);
                })
                .catch((err) => {
                    dispatch(incentivePackageFail(err));
                    reject(err);
                });
        });
    };
};

export const deleteIncentivePackage = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(incentivePackageStart());
            API.delete(`incentive-packages/${id}`)
                .then((result) => {
                    dispatch(incentivePackageSuccess());
                    resolve(result);
                })
                .catch((err) => {
                    dispatch(incentivePackageFail(err));
                    reject(err);
                });
        });
    };
};

export const setIncentivePackage = (incentivePackage) => ({
    type: "SET_INCENTIVE_PACKAGE",
    incentivePackage
});

export const startGetIncentivePackage = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(incentivePackageStart());
            API.get(`incentive-packages/${id}`)
                .then((result) => {
                    dispatch(setIncentivePackage(result.data));
                    dispatch(incentivePackageSuccess());
                    resolve(result);
                })
                .catch((err) => {
                    dispatch(incentivePackageFail(err));
                    reject(err);
                });
        });
    };
};

export const clearIncentivePackage = () => ({
    type: "CLEAR_INCENTIVE_PACKAGE"
});

export const incentivePackageFail = (error) => ({
    type: "INCENTIVE_PACKAGE_FAIL",
    error
});

export const incentivePackageSuccess = () => ({
    type: "INCENTIVE_PACKAGE_SUCCESS"
});
