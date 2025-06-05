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
    id: string;
    title: string;
    description: string;
    tags: string[];
    difficulty: "EASY" | "MEDIUM" | "HARD";
    example: {
        JAVASCRIPT: {
            input: string;
            output: string;
            explanation?: string;
        },
        PYTHON: {
            input: string;
            output: string;
            explanation?: string;
        },
        JAVA: {
            input: string;
            output: string;
            explanation?: string;
        }

    };
    userId: string;
    constraints: string;
    hints?: string;
    editorial?: string;
    testCases: {
        input: string;
        output: string;
    }[];
    codeSnippet: Record<string, string>;
    referenceSolutions: Record<string, string>;
    isContestProblem?: boolean;
};



export type TProblemCreate = {
    title: string
    description: string
    tags: string[]
    difficulty: "EASY" | "MEDIUM" | "HARD"
    example: {
        JAVASCRIPT: {
            input: string;
            output: string;
            explanation?: string;
        },
        PYTHON: {
            input: string;
            output: string;
            explanation?: string;
        },
        JAVA: {
            input: string;
            output: string;
            explanation?: string;
        }

    };
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

export type TGetProblems = {
    page: number
    limit: number
    query: string
    difficulty: "EASY" | "MEDIUM" | "HARD"
    tags: string[]
    sort: {
        field: string
        order: "asc" | "desc"
    }
}
export interface IProblemRepo {
    createProblem(data: TProblemCreate): Promise<null | TProblem>
    getProblems(data: TGetProblems): Promise<null | TProblem[]>
    getProblemById(data: TProblemId): Promise<null | TProblem>
    updateProblem(data: TProblem): Promise<null | TProblem>
    deleteProblem(data: TProblemId, id : TProblemId): Promise<null | TProblem>
    getAllProblemsSolvedByUser(userId: string ): Promise<null | TProblem[]>
    
}