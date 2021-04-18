import http, {IncomingMessage} from 'http';
const options = {
  host: 
  process.env.NODE_ENV === 'production' ? 
  "express-ts-demo-clusterip-service" : 'localhost',
  path: '/healthcheck',
  port: process.env.PORT,
  timeout: 2000,
};

const request = http.request(options, (res: IncomingMessage) => {
  console.log(`STATUS: ${res.statusCode}`);
  if (res.statusCode == 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});
request.on("error", function (err: any) {
  console.log("ERROR");
  process.exit(1);
});
request.end();