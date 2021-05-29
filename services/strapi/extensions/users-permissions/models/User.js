module.exports = {
    lifecycles: {
        async afterCreate(result, data) {
            try {
                await strapi.query("user-info").create({
                    user: result.id,
                });
            } catch (e) {
                console.log("user-info");
                console.log(e);
            }
        },
    },
};
