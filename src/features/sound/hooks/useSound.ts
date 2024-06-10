import { Sound, sounds } from "../assets";

export const useSound = () => {
  const play = (sound: Sound) => {
    const audio = new Audio(sounds[sound]);
    audio.volume = 0.5;
    audio.play();
  };

  return {
    play,
  };
};
