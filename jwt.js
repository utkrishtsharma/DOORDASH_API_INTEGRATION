import jwt from 'jsonwebtoken';

// Import access key from .env file
const accessKey = ({
    "developer_id": "b148ecaf-b0a9-47ca-8a7d-a810c407dbb8",
    "key_id": "19049875-a1c3-40f9-b338-d042caf1ae07",
    "signing_secret": "qooAbChQBZKXNrIoWZqhFOfzBFXS4DVst3C370uBgmc"
});

const data = {
  aud: 'doordash',
  iss: accessKey.developer_id,
  kid: accessKey.key_id,
  exp: Math.floor(Date.now() / 1000 + 300),
  iat: Math.floor(Date.now() / 1000),
};

const headers = { algorithm: 'HS256', header: { 'dd-ver': 'DD-JWT-V1' } };

const token = jwt.sign(
  data,
  Buffer.from(accessKey.signing_secret, 'base64'),
  headers,
);

console.log(token);
