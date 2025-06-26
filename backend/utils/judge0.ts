import axios from 'axios';

const JUDGE0_URL = 'http://localhost:2358/submissions/?base64_encoded=false';

export async function submitToJudge0(code: string, language_id: number, stdin: string, expected_output: string) {
  const res = await axios.post(JUDGE0_URL, {
    source_code: code,
    language_id,
    stdin,
    expected_output
  });
  return res.data.token;
}

export async function getSubmissionResult(token: string) {
  const res = await axios.get(`${JUDGE0_URL.replace('?base64_encoded=false', '')}/${token}`);
  return res.data;
}