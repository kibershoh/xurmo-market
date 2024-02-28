import backBtnSound from "./backBtn.mp3";
import errorSound from "./error.mp3";
import lightOffSound from "./lightOff.mp3";
import lightOnSound from "./lightOn.mp3";
import successSound from "./success.mp3";

export { backBtnSound, errorSound, lightOffSound, lightOnSound, successSound };
export function playErrorSound() {
  const sound = localStorage.getItem("sound");
  if (!sound) {
    new Audio(errorSound).play();
  }
}
export function playSuccessSound() {
  const sound = localStorage.getItem("sound");
  if (!sound) {
    new Audio(successSound).play();
  }
}
export function playBackSound() {
  const sound = localStorage.getItem("sound");
  if (!sound) {
    new Audio(backBtnSound).play();
  }
}
export function playLightSound() {
  const sound = localStorage.getItem("sound");
  if (!sound) {
    new Audio(lightOffSound).play();
  }
}
export function playLightOnSound() {
  const sound = localStorage.getItem("sound");
  if (!sound) {
    new Audio(lightOnSound).play();
  }
}
