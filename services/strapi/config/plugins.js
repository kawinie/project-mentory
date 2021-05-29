module.exports = ({ env }) => ({
    upload: {
        provider: "aws-s3",
        providerOptions: {
            accessKeyId: env("AWS_ACCESS_KEY_ID"),
            secretAccessKey: env("AWS_ACCESS_SECRET"),
            region: "us-west-2",
            params: {
                Bucket: "mentorystrapimedia",
            },
        },
    },
    email: {
        provider: "sendgrid",
        providerOptions: {
            apiKey: env("SENDGRID_API_KEY"),
        },
        settings: {
            defaultFrom: "pechetrk@oregonstate.edu",
            defaultReplyTo: "pechetrk@oregonstate.edu",
            testAddress: "kawin15@icloud.com",
        },
    },
});
