import { Router } from "express";
const router = Router();

import { accessTokenValidation } from "../libs/verifyToken";
import { getParticipantsBatchMapping } from "../controllers/taskbotic.controller";
import { writeParticipantTable,deleteParticipantTable } from "../controllers/taskbotic.controller";

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
  .route(`/techboutique/taskbotic/deletemasterparticipantdata`)
  .get(deleteParticipantTable);

export default router;
