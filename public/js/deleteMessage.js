const messagesList = document.querySelector(".messages-list");

messagesList.addEventListener("click", async (e) => {
    const deleteBtn = e.target.closest(".delete-message-btn");
    if (!deleteBtn) return;
    e.preventDefault();
    const messageId = e.target.dataset.messageId;
    const res = await fetch(`/message/${messageId}`, {
        method: "POST",
        credentials: "same-origin",
        headers: {"Content-Type": "application/json"}
    })

    const data = await res.json();
    if (data.success === true) {
        deleteBtn.closest("li").remove();
    }
})