import { Request, Response } from "express";
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
      const queryString = "/techboutique/taskbotic/getSpreadsheetData";
      var options = {
        uri: baseUrl + queryString,
      };

      let result = await request.get(options);
      result = JSON.parse(result);
      let participantData = result["participantData"];
      let sqlValues: any = [];
      participantData.forEach((element: any) => {
        let value = Object.keys(element).map((val) => element[val]);
        sqlValues.push(value);
      });
      let db: any = req.headers.db;
      const conn = await connect(db);
      let insertQuery: any = `INSERT into master_participant_table(
          participant_id,
          name,
          email,
          contact_number,
          linkedin_url,
          proficiency,
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
}
