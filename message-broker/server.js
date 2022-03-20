const zmq = require("zeromq");
const csvtojson = require("csvtojson");


const sock = new zmq.Push();
console.log("About to send jobs!");
csvtojson()
  .fromFile("deneme3.csv")
  .then((csvData) => {
    run();
    async function run() {
      await sock.bind("tcp://127.0.0.1:7000");
      console.log("Server is ready listening on port 7000");
      send();
    }
    //sending the jobs to the workers
    async function send() {
      for (let i = 0; i < csvData.length; i++) {
        await sock.send(JSON.stringify(csvData[i]));
      }
    }
  });
