export type TPlaylist = {
    id?: string
    name: string
    description?: string
    userId: string
}

export type TuserID = {
    userId: string
}


export type TPlaylistId = {
    playlistId: string
    problemId: string[]
}
export interface IPlaylistRepo {
    createPlaylist(data: TPlaylist): Promise<null|TPlaylist>
    getAllPlaylists(data: TuserID): Promise<null | TPlaylist[]>
    getPlaylistDetails(playlistId: string): Promise<null | TPlaylist>
    deletePlaylist(playlistId: string): Promise<null | TPlaylist>
    addProblemToPlaylist(data: TPlaylistId): Promise<null | TPlaylist[]>
    removeProblemFromPlaylist(data:TPlaylistId): Promise<null | TPlaylist[]>
}