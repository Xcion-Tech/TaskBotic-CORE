import { Request, Response } from "express";
import { TaskBoticService } from "../services/taskbotic.service";
import { ParticipantMasterService } from "../services/participant_master.service";  
import { TaskMasterService } from "../services/task_master.service"; 

const taskboticService = new TaskBoticService();
const participantMasterService = new ParticipantMasterService();  
const taskMasterService = new TaskMasterService(); 

export async function getParticipantsBatchMapping(req: Request, res: Response) {
  return taskboticService.getParticipantsBatchMapping(req, res);
}

export async function writeParticipantTable(req: Request, res: Response) {
  return participantMasterService.writeParticipantTable(req, res);
}

export async function deleteParticipantTable(req: Request, res: Response) {
  return participantMasterService.deleteParticipantTable(req, res);
}

export async function getParticipantData(req: Request, res: Response) {
  return participantMasterService.getParticipantData(req, res);
} 

export async function writeTaskTable(req: Request, res: Response) {
  return taskMasterService.writeTaskTable(req, res);
}  

export async function getTaskTableData(req: Request, res: Response) {
  return taskMasterService.getTaskTableData(req, res);
}
