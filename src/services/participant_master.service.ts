import { Request, Response } from "express";
import { connect } from "../database.mysql/database";  
import * as http from 'http'
import * as request from "request-promise-native"; 
import { json } from "body-parser";
const otpGenerator = require('otp-generator') as any;  
let spreadsheetdata : any ;

export class ParticipantMasterService{ 
    constructor() { }

    async writeParticipantTable(req: Request, res: Response) {   
      try{  
        const baseUrl = 'http://localhost:8000';
        const queryString = '/techboutique/taskbotic/getSpreadsheetData';
        var options = {
            uri: baseUrl + queryString,
        };

        let result = await request.get(options);  
        result = JSON.parse(result) 
        console.log(result)  
        res.status(200).json(
          result
      );
      } catch (err) {
        res.status(500).json({
          message: err,
        });      
  } 
} 
}