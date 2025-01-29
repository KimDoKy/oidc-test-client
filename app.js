require('dotenv').config();
const express = require('express');
const { auth, requiresAuth } = require('express-openid-connect');

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.SECRET,
  clientSecret: process.env.CLIENT_SECRET,
  idpLogout: true,
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email'
  }
};

app.use(auth(config));

app.get('/', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    // ID 토큰 출력
    const idToken = req.oidc.idToken;
    // Access 토큰 출력 
    const accessToken = req.oidc.accessToken;
    res.send(`
      <h1>Logged In</h1>
      <h2>ID Token:</h2>
      <pre>${idToken}</pre>
      <h2>Access Token:</h2>
      <pre>${accessToken}</pre>
      <h2>User Info:</h2>
      <pre>${JSON.stringify(req.oidc.user, null, 2)}</pre>
      <a href="/logout">Logout</a>
    `);
  } else {
    res.send('<a href="/login">Login</a>');
  }
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(`
    <h1>Protected Profile</h1>
    <pre>${JSON.stringify(req.oidc.user, null, 2)}</pre>
  `);
});

app.get('/token-info', requiresAuth(), (req, res) => {
  res.json({
    idToken: req.oidc.idToken,
    accessToken: req.oidc.accessToken,
    user: req.oidc.user,
    claims: req.oidc.idTokenClaims
  });
});

const port = process.env.PORT || 8000;

app.get('/profile', auth(), (req, res) => {
  res.send(`
    <h1>Protected Profile</h1>
    <pre>${JSON.stringify(req.oidc.user, null, 2)}</pre>
  `);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
