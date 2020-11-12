import { Router } from "express";
const router = Router();

import { accessTokenValidation } from "../libs/verifyToken";
import { getParticipantsBatchMapping } from "../controllers/taskbotic.controller";
import {
  writeParticipantTable,
  deleteParticipantTable,
  getParticipantData, 
  writeTaskTable, 
  getTaskTableData
} from "../controllers/taskbotic.controller";

router
  .route(`/techboutique/taskbotic/getparticipantslist`)
  .get(getParticipantsBatchMapping);

router
  .route(`/techboutique/taskbotic/getparticipantslist`)
  .get(getParticipantsBatchMapping);

router
  .route(`/techboutique/taskbotic/writemasterparticipantdata`)
  .get(writeParticipantTable);

router
  .route(`/techboutique/taskbotic/deletemasterparticipantdata/:participant_id`)
  .delete(deleteParticipantTable);

router
  .route(`/techboutique/taskbotic/getmasterparticipantdata/:participant_id`)
  .get(getParticipantData);   

  router
  .route(`/techboutique/taskbotic/writetasktable`)
  .get(writeTaskTable); 

  router
  .route(`/techboutique/taskbotic/gettasktabledata/:task_id`)
  .get(getTaskTableData);

export default router;
