let habits = JSON.parse(localStorage.getItem("habits")) || [];

function today() {
  return new Date().toISOString().split("T")[0];
}

function save() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function addHabit() {
  let input = document.getElementById("habitInput");
  let text = input.value.trim();

  if (!text) return;

  habits.push({
    text,
    streak: 0,
    lastDone: "",
    doneDates: []
  });

  input.value = "";
  save();
  render();
}

function markDone(i) {
  let h = habits[i];
  let t = today();

  if (h.lastDone === t) {
    alert("Already done today!");
    return;
  }

  
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  let yDate = yesterday.toISOString().split("T")[0];

  if (h.lastDone === yDate) {
    h.streak += 1;
  } else {
    h.streak = 1;
  }

  h.lastDone = t;
  h.doneDates.push(t);

  save();
  render();
}

function deleteHabit(i) {
  habits.splice(i, 1);
  save();
  render();
}


function render() {
  let container = document.getElementById("habitContainer");
  container.innerHTML = "";

  habits.forEach((h, i) => {
    let progress = Math.min(h.streak * 10, 100);

    container.innerHTML += `
      <div class="habit">
        <div class="top">
          <div>
            <b>${h.text}</b><br>
            🔥 Streak: ${h.streak} days
          </div>

          <div>
            <button onclick="markDone(${i})">✔ Done</button>
            <button onclick="deleteHabit(${i})">🗑</button>
          </div>
        </div>

        <div class="progress">
          <div class="progress-bar" style="width:${progress}%"></div>
        </div>
      </div>
    `;
  });
}

render();