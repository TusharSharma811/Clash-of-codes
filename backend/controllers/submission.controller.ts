
import { Request, Response } from 'express';
import { SubmittoJudge0 } from '../utils/judge0.ts';

export const createsubmission = async (req: Request, res: Response) => {

    
  const { code, language, question, userId, roomId } = req.body;

  if (!code || !language || !question|| !userId || !roomId)
    return res.status(400).json({ error: "Missing parameters" });

  try {  

    const testCases = question.testCases || [];

    const results = await Promise.all(
      testCases.map((test: any) =>
        SubmittoJudge0({code, language, input: test.input, expectedOutput: test.output}).then((output) => ({
          input: test.input,
          expected: test.output,
          actual: output,
          passed: output
        }))
      )
    );

    const passed = results.filter((r) => r.passed).length;

    // optionally broadcast via WebSocket:
    // io.to(roomId).emit("submissionResult", { userId, results });

    return res.status(200).json({
      success: true,
      userId,
      roomId,
      passed,
      total: testCases.length,
      results,
    });
  } catch (err) {
    console.error("Error in submission:", err);
    return res.status(500).json({ error: "Server error" });
  }
};


