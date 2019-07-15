import API from "../utils/API";

export const startActivation = (uid, token) => {
    return new Promise((resolve, reject) => {
        API.get(`activate/${uid}/${token}/`)
            .then((result) => {
                resolve(result);
            })
            .catch((error) => {
                reject(error);
            });
    });
};
