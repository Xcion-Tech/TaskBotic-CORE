import { query, Request, Response } from "express";
import { connect } from "../database.mysql/database";
import * as http from "http";
import * as request from "request-promise-native";
import { json } from "body-parser";
const otpGenerator = require("otp-generator") as any;
let spreadsheetdata: any;  

export class TaskMasterService { 
    constructor() {}  
    
    async writeTaskTable(req: Request, res: Response) {
    try{ 
        const baseUrl = "http://localhost:8000";
      const queryString = "/techboutique/taskbotic/getSpreadsheetData/";  
      var options = {
        uri: baseUrl + queryString, 
        headers: {
          'Content-Type': 'application/json', 
          'sheeturl': 'https://docs.google.com/spreadsheets/d/1FJpMXUIBwOP9lkXg9y7Tp408sMI14yu9CYGgiT6iimc/edit?usp=sharing'
        },
      };
      let result = await request.get(options);
      result = JSON.parse(result);
      let participantData = result["spreadsheetData"];
      let sqlValues: any = [];
      participantData.forEach((element: any) => { 
        delete element["participant_id"]
        let value = Object.keys(element).map((val) => element[val]);
        sqlValues.push(value);
      });   
      let db: any = req.headers.db;
      const conn = await connect(db);
      let insertQuery: any = `INSERT into task_master(
          task_id, 
          task_title, 
          task_description, 
          task_link) VALUES ?`;

      await conn
        .query(insertQuery, [sqlValues])
        .then(async (onfulfilled: any) => {
          res.status(200).json({
            message: "Data Insertion to task_master Successfull",
            values: onfulfilled[0],
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: err,
            info: "SQL Insertion error",
          });
        });
      conn.end();
    } 
    catch (err) {
        res.status(500).json({
          message: err,
          info: "API error, not SQL error",
        });
      }
    }   

    async getTaskTableData(req: Request, res: Response) {
        try {
          let db: any = req.headers.db;
          const conn = await connect(db);
          let task_id = req.params.task_id;
          let selectQuery = `SELECT * from task_master WHERE task_id = ?`;
          await conn
            .query(selectQuery, [task_id])
            .then(async (onfulfilled: any) => { 
              let selectResult = onfulfilled[0];
              selectResult = selectResult[0];
              selectResult = Object.values(selectResult);
              res.status(200).json({
                message: "The Data available for the requested task :",
                info: onfulfilled[0],
              });
            });
        } catch (err) {
          res.status(500).json({
            message: "API or SQL error , check your query",
            info: err,
          });
        }
      }
}