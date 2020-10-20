import { Request, Response } from "express";
import { TaskBoticService } from "../services/taskbotic.service"; 
import { ParticipantMasterService} from "../services/participant_master.service"

const taskboticService = new TaskBoticService();
const participantMasterService = new ParticipantMasterService();
export async function getParticipantsBatchMapping(req: Request, res: Response) {
    return taskboticService.getParticipantsBatchMapping(req, res);
} 

export async function writeParticipantTable(req: Request, res: Response) {
    return participantMasterService.writeParticipantTable(req, res);
}