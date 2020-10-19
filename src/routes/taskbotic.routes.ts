import { Router } from "express";
const router = Router();

import { accessTokenValidation } from "../libs/verifyToken";
import { getParticipantsBatchMapping } from "../controllers/taskbotic.controller";


router.route(`/techboutique/taskbotic/getparticipantslist`)
    .get(getParticipantsBatchMapping);

export default router;