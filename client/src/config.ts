// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'q8gxby8f2e'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-2.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-vha2jtjp.us.auth0.com',            // Auth0 domain
  clientId: 'm4r30gjG6av5vnRpDukheBwRawG6OK5x',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
