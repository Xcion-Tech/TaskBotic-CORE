import { Router } from "express";
const router = Router();

import { accessTokenValidation } from "../libs/verifyToken";
import { getParticipantsBatchMapping } from "../controllers/taskbotic.controller";
import { writeParticipantTable } from "../controllers/taskbotic.controller";

router
  .route(`/techboutique/taskbotic/getparticipantslist`)
  .get(getParticipantsBatchMapping);

router
  .route(`/techboutique/taskbotic/getparticipantslist`)
  .get(getParticipantsBatchMapping);

router
  .route(`/techboutique/taskbotic/writemasterparticipantdata`)
  .get(writeParticipantTable);

export default router;
