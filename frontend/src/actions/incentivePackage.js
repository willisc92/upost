import API from "../utils/API";
import moment from "moment";

/**
 * INCENTIVE_PACKAGE_START
 * action generator
 * @returns {Object} to reset loading and error status
 */
export const incentivePackageStart = () => ({
    type: "INCENTIVE_PACKAGE_START"
});

/**
 * addIncentivePackage
 * action dispatcher
 * @param {Object} incentivePackage Incentive Package data to add
 * @returns {Promise} Promise to handle
 */
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

/**
 * editIncentivePackage
 * action dispatcher
 * @param {number} id pk of Incentive Package to edit
 * @param {Object} updates Incentive Package data to add
 * @returns {Promise} Promise to handle
 */
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

/**
 * deleteIncentivePackage
 * action dispatcher
 * @param {number} id pk of Incentive Package to soft delete
 * @returns {Promise} Promise to handle
 */
export const deleteIncentivePackage = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(incentivePackageStart());
            const updates = {
                deleted_flag: true,
                deletion_date: moment().format("YYYY-MM-DD")
            };
            API.patch(`incentive-packages/${id}/`, updates)
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

/**
 * restoreIncentivePackage
 * action dispatcher
 * @param {number} id pk of Incentive Package to restore
 * @returns {Promise} Promise to handle
 */
export const restoreIncentivePackage = (id) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(incentivePackageStart());
            const updates = {
                deleted_flag: false,
                deletion_date: null
            };
            API.patch(`incentive-packages/${id}/`, updates)
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

/**
 * SET_INCENTIVE_PACKAGE
 * action generator
 * @param {Object} incentivePackage incentivePackage object to set to redux store
 * @returns {Object} Action object
 */
export const setIncentivePackage = (incentivePackage) => ({
    type: "SET_INCENTIVE_PACKAGE",
    incentivePackage
});

/**
 * startGetIncentivePackage
 * action dispatcher
 * @param {number} id pk of Incentive Package to get
 * @returns {Promise} Promise to handle
 */
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

/**
 * CLEAR_INCENTIVE_PACKAGE
 * action generator
 * @returns {Object} Action object to clear redux store
 */
export const clearIncentivePackage = () => ({
    type: "CLEAR_INCENTIVE_PACKAGE"
});

/**
 * INCENTIVE_PACKAGE_FAIL
 * action generator
 * @param {Object} error Error object to log
 * @returns {Object} Action object to set error in redux store.  Clears loading status.
 */
export const incentivePackageFail = (error) => ({
    type: "INCENTIVE_PACKAGE_FAIL",
    error
});

/**
 * INCENTIVE_PACKAGE_SUCCESS
 * action generator

 * @returns {Object} Action object to clear errors and loading status.
 */
export const incentivePackageSuccess = () => ({
    type: "INCENTIVE_PACKAGE_SUCCESS"
});
