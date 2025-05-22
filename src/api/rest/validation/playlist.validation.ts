import { z } from "zod";
const createPlaylist = z.object({
    name: z.string().min(1, { message: "Playlist name is required" }),
    description: z.string().optional(),
})

const addProblemToPlaylist = z.object({
    problemId: z.array(z.string()).nonempty({ message: "At least one problem ID is required" }),
})

export {
    createPlaylist,
    addProblemToPlaylist
}