import { query, Request, Response } from "express";
import { connect } from "../database.mysql/database";
import * as http from "http";
import * as request from "request-promise-native";
import { json } from "body-parser";
const otpGenerator = require("otp-generator") as any;
let spreadsheetdata: any;

export class ParticipantMasterService {
  constructor() {}

  async writeParticipantTable(req: Request, res: Response) {
    try {  
      const baseUrl = "http://localhost:8000";
      const queryString = "/techboutique/taskbotic/getSpreadsheetData/";  
      var options = {
        uri: baseUrl + queryString, 
        headers: {
          'Content-Type': 'application/json', 
          'sheeturl': 'https://docs.google.com/spreadsheets/d/1rKnKH5vsfvq9GT7o0Or_uVpN_-vOXL5J6ntlR3UwJIQ/edit?usp=sharing'
        },
      };

      let result = await request.get(options);
      result = JSON.parse(result);
      let participantData = result["spreadsheetData"]; 
      let sqlValues: any = [];
      participantData.forEach((element: any) => {
        let value = Object.keys(element).map((val) => element[val]);
        sqlValues.push(value);
      });
      let db: any = req.headers.db;
      const conn = await connect(db);
      let insertQuery: any = `INSERT into master_participant_table(
          participant_id, 
          timestamp,
          name,
          email,
          contact_number,
          linkedin_url,
          proficiency, 
          current_status,
          expectation,
          github_url) VALUES ?`;

      await conn
        .query(insertQuery, [sqlValues])
        .then(async (onfulfilled: any) => {
          res.status(200).json({
            message: "Data Insertion  to master_participant_table Successfull",
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
    } catch (err) {
      res.status(500).json({
        message: err,
        info: "API error, not SQL error",
      });
    }
  }

  async deleteParticipantTable(req: Request, res: Response) {
    try {
      let db: any = req.headers.db;
      const conn = await connect(db);
      let participant_id = req.params.participant_id;
      let selectQuery = `SELECT COUNT(*) from master_participant_table WHERE participant_id = ?`;
      let deleteQuery = `DELETE FROM master_participant_table WHERE participant_id = ?`;
      await conn
        .query(selectQuery, [participant_id])
        .then(async (onfulfilled: any) => {
          let selectResult = onfulfilled[0];
          selectResult = selectResult[0];
          selectResult = Object.values(selectResult);
          selectResult = selectResult[0];
          if (selectResult > 0) {
            console.log("The data exists for the parameter stated");
          } else {
            console.log("No data exists for the parameter stated");
            throw new Error("No such data exists");
          }
        });

      await conn
        .query(deleteQuery, [participant_id])
        .then(async (onfulfilled: any) => {
          res.status(200).json({
            message: "Data  Deletion  to master_participant_table Successfull",
            info: onfulfilled,
          });
        });
    } catch (err) {
      res.status(500).json({
        message: err,
        info: "API error, not SQL error",
      });
    }
  }

  async getParticipantData(req: Request, res: Response) {
    try {
      let db: any = req.headers.db;
      const conn = await connect(db);
      let participant_id = req.params.participant_id;
      let selectQuery = `SELECT * from master_participant_table WHERE participant_id = ?`;
      await conn
        .query(selectQuery, [participant_id])
        .then(async (onfulfilled: any) => {
          let selectResult = onfulfilled[0];
          selectResult = selectResult[0];
          selectResult = Object.values(selectResult);
          res.status(200).json({
            message: "The Data available for the requested participant :",
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
