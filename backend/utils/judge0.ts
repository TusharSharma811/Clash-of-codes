import axios from "axios";

const JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";

// You can map these based on Judge0 docs: https://judge0.com/docs
const languageMap: Record<string, number> = {
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54,
};

type RunResult = {
  success: boolean;
  stdout: string;
  stderr: string;
  compile_output: string;
  status: { id: number; description: string };
  match: boolean;
};

export async function SubmittoJudge0({
  code,
  language,
  input,
  expectedOutput,
}: {
  code: string;
  language: string;
  input: string;
  expectedOutput: string;
}): Promise<RunResult> {
  const languageId = languageMap[language.toLowerCase()];
  if (!languageId) throw new Error(`Unsupported language: ${language}`);

  try {
    const response = await axios.post(
      JUDGE0_API_URL,
      {
        language_id: languageId,
        source_code: code,
        stdin: input,
      },
      {
        headers: {
          "Content-Type": "application/json",
          // For RapidAPI users, add these headers:
          // "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
          // "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        },
      }
    );

    const data = response.data;

    const stdout = data.stdout?.trim() || "";
    const stderr = data.stderr?.trim() || "";
    const compile_output = data.compile_output?.trim() || "";
    const status = data.status;

    return {
      success: status?.id === 3, // 3 = Accepted
      stdout,
      stderr,
      compile_output,
      status,
      match: stdout === expectedOutput.trim(),
    };
  } catch (err: any) {
    console.error("Error submitting to Judge0:", err?.response?.data || err.message);
    throw new Error("Failed to run code with Judge0");
  }
}
