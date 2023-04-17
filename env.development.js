// This file is git-controlled, so don't write a private value
module.exports = {
  QUAINT_ENV: 'development',
  BASEURL: 'https://quaint-api-dev-2023.azurewebsites.net/',
  AZURE_AD_OPENIDCONFIGURATION:
    'https://login.microsoftonline.com/158e6d17-f3d5-4365-8428-26dfc74a9d27/v2.0/.well-known/openid-configuration',
  AZURE_AD_CLIENTID: '0f2252c5-62ef-4aab-af65-99a753f1c77c',
  AZURE_B2C_ENDPOINT_AUTHORIZATION:
    'https://seiryofesb2c.b2clogin.com/seiryofesb2c.onmicrosoft.com/oauth2/v2.0/authorize?p=b2c_1_quaint-app',
  AZURE_B2C_ENDPOINT_TOKEN:
    'https://seiryofesb2c.b2clogin.com/seiryofesb2c.onmicrosoft.com/oauth2/v2.0/token?p=b2c_1_quaint-app',
  AZURE_B2C_ENDPOINT_LOGOUT:
    'https://seiryofesb2c.b2clogin.com/seiryofesb2c.onmicrosoft.com/oauth2/v2.0/logout?p=b2c_1_quaint-app',
  AZURE_B2C_CLIENTID: '06b8cb1b-b866-43bf-9bc6-2898c6a149f3',

  AZURE_AD_GROUPS_QUAINT_ADMIN: '5c091517-25de-44bc-9e42-ffcb8539435c',
  AZURE_AD_GROUPS_QUAINT_OWNER: 'a577d858-64bf-4815-aaf6-d893c654e92e',
}
