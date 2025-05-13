// export type TProblem = {
//     title: string
//     description: string
//     tags?: string[]
//     difficulty: "EASY" | "MEDIUM" | "HARD"
//     example?: [
//         {
//             language: string
//             input: string
//             output: string
//             explanation?: string
//         }
//     ],
//     userId: string
//     constraints: string,
//     hints?: string[]
//     editorial?: string
//     testCases: { input: string; output: string }[]
//     codeSnippet: {
//         language: string
//     }
//     referenceSolutions: {
//         language: string
//     }
// }


export type TProblem = {
    title: string;
    description: string;
    tags: string[];
    difficulty: "EASY" | "MEDIUM" | "HARD";
    example: {
        input: string;
        output: string;
        explanation?: string;
    }[];
    userId: string;
    constraints: string;
    hints?: string[];
    editorial?: string;
    testCases: {
        input: string;
        output: string;
    }[];
    codeSnippet: Record<string, string>;
    referenceSolutions: Record<string, string>;
};



export type TProblemCreate = {
    title: string
    description: string
    tags: string[]
    difficulty: "EASY" | "MEDIUM" | "HARD"
    example: {
        input: string;
        output: string;
        explanation?: string;
    }[];
    constraints: string
    testCases: {
        input: string;
        output: string;
    }[];
    codeSnippet: Record<string, string>;
    referenceSolutions: Record<string, string>;
    userId: string
}

export type TProblemId = {
    id: string
}
export interface IProblemRepo {
    createProblem(data: TProblemCreate): Promise<null | TProblem>
    getProblems(): Promise<null | TProblem[]>
    getProblemById(data: TProblemId): Promise<null | TProblem>
}