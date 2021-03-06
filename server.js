const http = require('http');
const app = require('./index');
const websocket = require('ws');
const sensors = require('./config.json')["sensors"];
const sendMail = require('./mailer');

const port = process.env.SERVER_PORT || 3000;

//Initialize Simple http server
const server = http.createServer(app);

//Initialize WebSocket server
const wss = new websocket.Server({ server })
CLIENTS = {}

wss.on('connection', ws => {
    ws.on('message', message => {
        // if (!message.includes("WEB"))
        message = message.replace(/'/g, "\"")
        parseMessage(message, ws)
    });

    function parseMessage(message, obj) {
        res = JSON.parse(message)
        console.log("DATA: ", res)
        if (res && res["__init__"]) {
            let id = res["__init__"]
            CLIENTS[id] = obj
        } else if (res && res["ID"]) {
            if (res["ID"] !== "WEB") {
                if (res["ID"] == "MOTION")
                    sendNotificationForMotionSensor(res["data"]);

                // Send the data to Front-End
                if (!CLIENTS["WEB"])
                    console.error("WEB connection not found!!")
                else if (sensors[res['ID']].enabled)
                    CLIENTS["WEB"].send(message)
            }
        }
    }

    function sendNotificationForMotionSensor(data) {
        let lastAlert = sensors["MOTION"].lastAlert
        if ( lastAlert == "NULL" || lastAlert != data["last_time"]){
            sensors["MOTION"].lastAlert = data["last_time"]
            sendEmailForMotionSensor(data["image_url"], data["video_url"])
        }
    }
});

function sendEmailForMotionSensor(img_link, vid_link) {
    var mailOptions = {
        from: 'shukla.1291@gmail.com',
        to: 'sshukl16@asu.edu',
        subject: 'MOTION SENSOR ALERT',
        text: `This is an alert triggered by the Motion Sensor
            Click following link to view captured snapshot and video
            Image: ${img_link}
            Video: ${vid_link}
        `
    };
    sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

server.listen(port);