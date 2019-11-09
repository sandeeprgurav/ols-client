const local = {
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

const dev = {
  STRIPE_KEY: "pk_test_sHU9WCf8tWyddTcx6P8GnT5L00Nntlx02o",
  s3: {
    REGION: "us-east-2",
    BUCKET: "ols-app-dev-attachmentsbucket-1u06je73w5dp1"
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://63e3dzeiz1.execute-api.us-east-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_aEJAu6s1H",
    APP_CLIENT_ID: "5ijjkubpdemc2glripp9sfltf5",
    IDENTITY_POOL_ID: "us-east-2:ec583be0-9161-406a-89bb-606869f42519"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_sHU9WCf8tWyddTcx6P8GnT5L00Nntlx02o",
  s3: {
    REGION: "us-east-2",
    BUCKET: "ols-app-prod-attachmentsbucket-toih722xzla8"
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://qaxkpjj6x7.execute-api.us-east-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_mUItmjkJZ",
    APP_CLIENT_ID: "3dguehnmjg912an2vens39dspi",
    IDENTITY_POOL_ID: "us-east-2:1f79f416-cc4e-436b-81db-3c5fbeda3775"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  API_CONSTANT : 'http://localhost:8080/api/',
  social: {FB: "2538397456244940"},
  ...config
};
