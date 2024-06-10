const mySounds = {
  lose: "/assets/sound/lose-sound.wav",
  win: "/assets/sound/win-sound.wav",
  explosion: "/assets/sound/explosion-sound.wav",
}

export type Sound = keyof typeof mySounds;

export const sounds = mySounds;
