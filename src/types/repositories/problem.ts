export type TProblem = {
    id: string
    title: string
    description: string
    tags?: string[]
    difficulty: "EASY" | "MEDIUM" | "HARD"
    example?: [
        {
            language: string
            input: string
            output: string
            explanation?: string
        }
    ],
    userId: string
    constraints: string[],
    hints?: string[]
    editorial: string
    testCases: { input: string; output: string }[]
    codeSnippet: {
        language: string
    }
    referenceSolutions: {
        language: string
    }
    createdAt: Date
    updatedAt: Date
}


export type TProblemCreate = {
    title: string
    description: string
    tags?: string[]
    difficulty: "EASY" | "MEDIUM" | "HARD"
    example?: [
        {
            input: string
            output: string
            explanation?: string
        }
    ]
    constraints: string[]
    testCases: { input: string; output: string }[]
    codeSnippet: {
        language: string
    }
    referenceSolutions: {
        language: string
    }
    userId: string
}


export interface IProblemRepo {
    createProblem(data: TProblemCreate): Promise<null | TProblem>
}