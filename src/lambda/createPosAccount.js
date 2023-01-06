/* eslint-disable import/no-extraneous-dependencies */
//const fetch = require('node-fetch');
import fetch from "node-fetch";


exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-Version': '3' },
    body: event.body,
  };

  return fetch('https://app-aws.inventorum.com/api/signup/', options)
    .then((response) => response.json())
    .then((response) => {
      return {
        statusCode: 200,
        body: JSON.stringify(response),
        message: JSON.stringify(response),
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow from anywhere
        },
      };
    })
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};
