const API_URL = "/memo/";

async function fetchMemos() {
  const response = await fetch(API_URL);
  const memos = await response.json();
  displayMemos(memos);
}

async function createMemo(content) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: Date.now(), content }),
  });
  const memo = await response.json();
  displayMemo(memo);
}

async function deleteMemo(e) {
  const id = e.target.dataset.id;
  await fetch(API_URL + `${id}`, {
    method: "DELETE",
  });
  fetchMemos();
}

async function editMemo(e) {
  const id = e.target.dataset.id;
  const editText = prompt("메모 내용을 수정하세요:");

  await fetch(API_URL + `${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, content: editText }),
  });
  fetchMemos();
}

function displayMemos(memos) {
  const memoList = document.getElementById("memo-list");
  memoList.innerHTML = "";
  memos.forEach(displayMemo);
}

function displayMemo(memo) {
  const memoList = document.getElementById("memo-list");

  const listItem = document.createElement("li");
  listItem.textContent = `${memo.id}: ${memo.content}`;
  memoList.appendChild(listItem);

  const delBtn = document.createElement("button");
  delBtn.textContent = "X";
  delBtn.dataset["id"] = memo.id;
  delBtn.addEventListener("click", deleteMemo);
  memoList.appendChild(delBtn);

  const editButton = document.createElement("button");
  editButton.textContent = "수정";
  editButton.dataset["id"] = memo.id;
  editButton.addEventListener("click", editMemo);
  memoList.appendChild(editButton);
}

document
  .getElementById("memo-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const content = document.getElementById("memo-content").value;
    await createMemo(content);
    document.getElementById("memo-content").value = "";
  });

fetchMemos();
