import { myEnvironment } from "@/configs";
import axios from "axios";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface JudgeSubmission {
  source_code: string;
  language_id: number;
  stdin: string;
  expected_output: string;
}

export interface SubmissionResponse {
  token: string;
}

export interface BatchSubmissionResponse {
  submissions: SubmissionResponse[];
}

export interface JudgeResult {
  status: {
    id: number;
    description?: string;
  };
  stdout?: string;
  stderr?: string;
  compile_output?: string;
  message?: string;
  time?: string;
  memory?: string;
}

export interface BatchResultResponse {
  submissions: JudgeResult[];
}

export const getJudge0Languages = (language: string): number | undefined => {
  const languageMap: Record<string, number> = {
    "PYTHON": 71,
    "C": 50,
    "C++": 54,
    "JAVA": 62,
    "JAVASCRIPT": 63,
    "TYPESCRIPT": 73,
    "GO": 72,
    "RUBY": 70,
  };
  return languageMap[language.toUpperCase()];
}

export const submitBatch = async (submissions: JudgeSubmission[]): Promise<SubmissionResponse[]> => {
  const { data } = await axios.post<BatchSubmissionResponse>(
    `${myEnvironment.JUDGE0_API}/submissions/batch?base64_encoded=false`, 
    { submissions }
  );
  return data.submissions;
}

export const pollBatchResults = async (tokens: string[]): Promise<JudgeResult[]> => {
  while (true) {
    const { data } = await axios.get<BatchResultResponse>(
      `${myEnvironment.JUDGE0_API}/submissions/batch`, 
      {
        params: {
          tokens: tokens.join(","),
          base64_encoded: false,
        }
      }
    );

    const result = data.submissions;
    const isAllDone = result.every((r) => r.status.id !== 1 && r.status.id !== 2);

    if (isAllDone) return result;

    await sleep(1000);
  }
}