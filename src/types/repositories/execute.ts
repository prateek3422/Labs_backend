
export type TSubmission = {
    id?: string;
    userId: string;
    problemId: string;
    sourceCode: Record<string, string>;
    language: string;
    stdin: string;
    stdout: string;
    stderr: string;
    status: string;
    time: string;
    memory: string;
    compileOutput: string;
}

export type TSolvedProblem = {
    userId: string;
    problemId: string;
}

export type TExecute = {
    source_code: Record<string, string>;
    language_id: number;
    stdin: string[];
    expected_output: string[];
    problemId: string;
    userId: string;
}


export type TTestCases = {
    submissionId: string
    testCase: number
    passed: boolean
    stdout?: string
    expectedOutput?: string
    compileOutput?: string
    stderr?: string
    status: string
    memory?: string
    time?: string
}


export interface IExportRepo {
    submission(data: TSubmission): Promise<null | TSubmission>
    solvedProblem(data: TSolvedProblem): Promise<null | TSolvedProblem>
    testCases(data: TTestCases): Promise<null | TTestCases>
}