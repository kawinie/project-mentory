"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

async function updateAvgReviewScore(data) {
    const reviews = await strapi.query("review").find({ toUser: data.toUser });
    const totalRating = reviews.reduce((accum, r) => accum + r.score, 0);
    const user = await strapi
        .query("user-info")
        .update({ id: data.toUser }, { avgReviewScore: totalRating / reviews.length });

    console.log("New avg score: ", `${user.firstname} ${user.lastname}`, user.avgReviewScore);
}

module.exports = {
    lifecycles: {
        afterCreate(result) {
            updateAvgReviewScore(result);
        },

        afterUpdate(result) {
            updateAvgReviewScore(result);
        },
    },
};
