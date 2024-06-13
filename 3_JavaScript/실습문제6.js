function newYearclock() {
  const newYear = new Date("2025-01-01 00:00:00");
  const today = new Date();
  const day = newYear - today;
  const nDay = Math.floor(day / (1000 * 60 * 60 * 24));
  const nHour = Math.floor((day / (1000 * 60 * 60)) % 24);
  const nMin = Math.floor((day / (1000 * 60)) % 60);
  const nSec = Math.floor((day / 1000) % 60);

  clock.innerText = `${nDay}일 ${nHour}시간 ${nMin}분 ${nSec}초`;
}

setInterval(newYearclock, 1000);
