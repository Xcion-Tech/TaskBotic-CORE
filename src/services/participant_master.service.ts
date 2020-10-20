import { Request, Response } from "express";
import { connect } from "../database.mysql/database";  
import * as http from 'http'
const otpGenerator = require('otp-generator') as any; 

export class ParticipantMasterService{ 
    constructor() { }

    async writeParticipantTable(req: Request, res: Response) {  
        let spreadsheetdata:any = http.get('http://localhost:8000/techboutique/taskbotic/getSpreadsheetData')
        console.log(spreadsheetdata) 

        var options = {
            host: "localhost",
            port: 8000,
            path: "/techboutique/taskbotic/getSpreadsheetData",
            method: 'GET'
          };
          
          http.request(options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
              console.log('BODY: ' + chunk);
            });
          }).end(); 
          
        // try {
        //     let db: any = req.headers.db;
        //     const conn = await connect(db);
        //     let insertQuery:any =`insert into table master_participant_table values`
            
        //     res.status(200).json(
        //         participants[0]
        //     );
        //     return conn.end();
        // }
        // catch (err) {
        //     res.status(500).json({
        //         message: err
        //     })
        // }
} 
}