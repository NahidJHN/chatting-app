
let inputBox = document.getElementById("messageBox");

inputBox.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        let message = this.value;
        if (message) {
            let messageWraper = document.getElementById("message-wraper");

            let messageTemplate = `<div class="sent_message">
                                                <div>${message}</div>
                                                <small class="message-Time mb-0"
                                                    >${Date.now()}</small
                                                >
                                            </div>`;

            let li = document.createElement("li");
            li.innerHTML = messageTemplate;
            messageWraper.appendChild(li);
            //autometic scroll when a new message send
            let chattingArea =
                document.getElementsByClassName("chattingArea")[0];
            chattingArea.scrollBy(0, chattingArea.scrollTop + 110);

            this.value = "";
        }
    }
});
