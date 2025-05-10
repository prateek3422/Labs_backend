import { myEnvironment } from "@/configs";
import axios from "axios";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getJudge0Languages = (language: string) => {
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
    return languageMap[language.toUpperCase()] || undefined;
}




export const submitBatch = async (submissions: string[]) => {
    const { data } = await axios.post(`${myEnvironment.JUDGE0_API}/submissions/batch?base64_encoded=false`, {
        submissions
    }
    )


    return data;

}


export const pollBatchResults = async (tokens: string[]) => {
    while (true) {
        const { data } = await axios.get(`${myEnvironment.JUDGE0_API}/submissions/batch`, {
            params: {
                tokens: tokens.join(","),
                base64_encoded: false,
            }
        })



        const result = data.submissions;
        const isAllDone = result.every((r: { status: { id: number } }) => r.status.id !== 1 && r.status.id !== 2);

        if (isAllDone) return result;

        await sleep(1000);

    }


}