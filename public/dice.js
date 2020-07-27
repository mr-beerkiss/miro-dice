const rollFn = (dieSides = 6) => () => 1 + Math.floor(Math.random() * dieSides);

const last = (arr) => arr[arr.length - 1];

function rollSequence(dieSides = 6, minRolls = 5, maxRolls = 10) {
  const amtRolls = 1 + Math.floor(Math.random() * maxRolls) + minRolls;
  const roll = rollFn(dieSides);
  const seq = [roll()];

  while (seq.length < amtRolls) {
    const next = roll();
    if (next != last(seq)) {
      seq.push(next);
    }
  }

  return seq;
}
function animateSequence(elements, displayElem, onTimerEnd = null) {
  let index = 0;
  let timer = setInterval(function () {
    if (index + 2 >= elements.length) {
      clearInterval(timer); // stop timer
      if (onTimerEnd) {
        onTimerEnd(); // run callback
      }
    }
    updateDisplay(elements[index], elements[index + 1]);
    index += 1;
  }, 333);

  function updateDisplay(currentValue, newValue) {
    const sym = displayElem.querySelector(".symbol .cur");
    if (currentValue !== newValue) {
      // animated change
      let parent = sym.parentNode;
      parent.classList.remove("anim");
      sym.textContent = newValue;
      sym.nextElementSibling.textContent = currentValue;
      var foo = parent.offsetWidth; // reflow hack
      parent.classList.add("anim");
    }
  }
}

function setupButton() {
  const el = document.querySelector("[data-js-hook=roll-button]");
  let running = false;

  function toggleButton() {
    el.classList.toggle("hide");
    running = !running;
  }

  el.onclick = () => {
    if (running) return;
    animateSequence(
      rollSequence(),
      document.getElementById("roller"),
      toggleButton
    );
    toggleButton();
  };
}

miro.onReady(() => {
  // animateSequence(rollSequence(), document.getElementById("roller"));
  setupButton();
});
