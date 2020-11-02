import { query, Request, Response } from "express";
import { connect } from "../database.mysql/database";
import * as http from "http";
import * as request from "request-promise-native";  
const otpGenerator = require("otp-generator") as any;
let spreadsheetdata: any; 

export class Task_Master{ 
    constructor() {} 
    
    async writeTaskTable(req: Request, res: Response) {  
        
    
    }
}