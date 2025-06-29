import router from "express";
import { createsubmission} from "../controllers/submission.controller.ts";
const submissionRouter = router.Router();

submissionRouter.post("/execute", (req, res) => {
  createsubmission(req, res);
});

export default submissionRouter;