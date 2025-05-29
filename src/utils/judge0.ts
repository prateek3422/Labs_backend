import { logger, myEnvironment } from "@/configs";
import axios from "axios";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface JudgeSubmission {

  source_code: Record<string,string> | string
  language_id: number;
  stdin: string;
  expected_output?: string;
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

export const getLanguage = (language_id : number) => {
  const languageMap: Record<number, string> = {
    71: "PYTHON",
    50: "C",
    54: "C++",
    62: "JAVA",
    63: "JAVASCRIPT",
    73: "TYPESCRIPT",
    72: "GO",
    70: "RUBY",
  };
  return languageMap[language_id] || "UNKNOWN";
}

export const submitBatch = async (submissions: JudgeSubmission[]) => {
  try {
    const response = await axios.post<BatchSubmissionResponse>(
      `${myEnvironment.JUDGE0_API}/submissions/batch?base64_encoded=false`,
      { submissions }
    );
    // console.log("Batch submission successful. Response:", response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error("Axios Error:", error.response?.data || error.message);
    } else {
      logger.error("Unexpected Error:", error);
    }
    throw error;
  }
};


export const pollBatchResults = async (tokens: string[]): Promise<JudgeResult[]> => {
  while (true) {
    const response = await axios.get<BatchResultResponse>(
      `${myEnvironment.JUDGE0_API}/submissions/batch`,
      {
        params: {
          tokens: tokens.join(","),
          base64_encoded: false,
        }
      }
    );

    const results: JudgeResult[] = response.data.submissions;
    const isAllDone = results.every((r) => r.status.id !== 1 && r.status.id !== 2);

    if (isAllDone) return results;

    await sleep(1000);
  }
}