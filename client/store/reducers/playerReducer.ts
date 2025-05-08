import { PlayerState, PlayerAction, PlayerActionTypes } from "../../types/player";

const initialState: PlayerState = {
  currentTime: 0,
  duration: 0,
  active: null,
  volume: 50,
  pause: true,
  playlist: [],
  isShuffle: false,
};

export const playerReducer = (
  state = initialState,
  action: PlayerAction
): PlayerState => {
  switch (action.type) {
    case PlayerActionTypes.PAUSE:
      return { ...state, pause: true };
    case PlayerActionTypes.PLAY:
      return { ...state, pause: false };
    case PlayerActionTypes.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    case PlayerActionTypes.SET_VOLUME:
      return { ...state, volume: action.payload };
    case PlayerActionTypes.SET_SHUFFLE_MODE:
      return { ...state, isShuffle: action.payload };
    case PlayerActionTypes.SET_DURATION:
      return { ...state, duration: action.payload };
    case PlayerActionTypes.SET_ACTIVE:
      return {
        ...state,
        active: action.payload,
        duration: 0,
        currentTime: 0,
      };
    case PlayerActionTypes.CLEAR_ACTIVE:
      return {
        ...state,
        active: null,
        pause: true,
        currentTime: 0,
        duration: 0,
      };
    case PlayerActionTypes.SET_PLAYLIST:
      return { ...state, playlist: action.payload };
    case PlayerActionTypes.PLAY_NEXT: {
      if (!state.active || !state.playlist.length) return state;
      const currentIndex = state.playlist.findIndex(
        (track) => track._id === state.active!._id
      );
      const nextTrack = state.playlist[currentIndex + 1];
      if (nextTrack) {
        return {
          ...state,
          active: nextTrack,
          currentTime: 0,
          duration: 0,
          pause: false,
        };
      }
      return {
        ...state,
        pause: true,
      };
    }
    case PlayerActionTypes.PLAY_NEXT_RANDOM: {
      if (!state.active || state.playlist.length < 2) return state;

      const currentId = state.active._id;
      const otherTracks = state.playlist.filter((t) => t._id !== currentId);
      const randomIndex = Math.floor(Math.random() * otherTracks.length);
      const randomTrack = otherTracks[randomIndex];

      return {
        ...state,
        active: randomTrack,
        currentTime: 0,
        duration: 0,
        pause: false,
      };
    }

    default:
      return state;
  }
};