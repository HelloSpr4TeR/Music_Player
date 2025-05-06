import { IComment, ITrack } from "./track";


export interface PlayerState {
    active: null | ITrack;
    volume: number;
    duration: number;
    currentTime: number;
    pause: boolean;
    playlist: ITrack[]; // ➕ Новый ключ
}

export enum PlayerActionTypes {
    PLAY = "PLAY",
    PAUSE = "PAUSE",
    SET_ACTIVE = "SET_ACTIVE",
    SET_DURATION = "SET_DURATION",
    SET_CURRENT_TIME = "SET_CURRENT_TIME",
    SET_VOLUME = "SET_VOLUME",
    CLEAR_ACTIVE = "CLEAR_ACTIVE",
    SET_PLAYLIST = 'SET_PLAYLIST', // ➕ Новый тип действия
    PLAY_NEXT = 'PLAY_NEXT', // ➕ Новый тип действия
}

interface ClearActiveAction {
    type: PlayerActionTypes.CLEAR_ACTIVE;
}
interface PlayAction {
    type: PlayerActionTypes.PLAY
}
interface PauseAction {
    type: PlayerActionTypes.PAUSE
}
interface SetActiveAction {
    type: PlayerActionTypes.SET_ACTIVE,
    payload: ITrack;
}
interface SetDurationAction {
    type: PlayerActionTypes.SET_DURATION,
    payload: number;
}
interface SetVolumeAction {
    type: PlayerActionTypes.SET_VOLUME,
    payload: number;
}
interface SetCurrentTimeAction {
    type: PlayerActionTypes.SET_CURRENT_TIME,
    payload: number;
}
interface SetPlaylistAction {
    type: PlayerActionTypes.SET_PLAYLIST;
    payload: ITrack[];
}

interface PlayNextAction {
    type: PlayerActionTypes.PLAY_NEXT;
}

export type PlayerAction =
    PlayAction
    | PauseAction
    | SetActiveAction
    | SetDurationAction
    | SetVolumeAction
    | SetCurrentTimeAction
    | ClearActiveAction
    | SetPlaylistAction
    | PlayNextAction;