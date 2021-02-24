"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const sum = (items) => items.reduce((accum, r) => accum + r);

async function updateAvgReviewScore(data) {
    // Find all reviews for the target user
    const reviews = await strapi.query("review").find({ toUser: data.toUser });

    // Calculate avg review score
    const totalReviewScore = sum(reviews.map((r) => r.score));
    const avgReviewScore = totalReviewScore / reviews.length;

    // Update the avg cache for target user
    const user = await strapi.query("user-info").update({ id: data.toUser }, { avgReviewScore });
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
