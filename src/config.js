export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY: "pk_test_sHU9WCf8tWyddTcx6P8GnT5L00Nntlx02o",
  s3: {
    REGION: "us-east-1",
    BUCKET: "sandeep-app"
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://b34pob8dc7.execute-api.us-east-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_taitUSFxh",
    APP_CLIENT_ID: "213nmvgirgdceitv1291l4lv2p",
    IDENTITY_POOL_ID: "us-east-2:1a6a4eaa-83ff-4184-9480-550df2da7317"
  }
};
