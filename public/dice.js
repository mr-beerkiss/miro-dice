const roll = (sides) => Math.floor(Math.random() * sides) + 1;

const tipElement = document.getElementById("tip");

miro.onReady(() => {
  tipElement.innerHTML = `You rolled ${roll(6)}`;
});
