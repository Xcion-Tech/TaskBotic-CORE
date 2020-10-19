import { Request, Response } from "express";
import { TaskBoticService } from "../services/taskbotic.service";

const taskboticService = new TaskBoticService();

export async function getParticipantsBatchMapping(req: Request, res: Response) {
    return taskboticService.getParticipantsBatchMapping(req, res);
}