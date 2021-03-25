try {
    document.getElementById("questionnaireForm").addEventListener("submit", function (event) {
        event.preventDefault();
        submitQuestionnaireForm();
    });
}
catch {
    console.log("No questionnaire form found")
}

async function submitQuestionnaireForm(e) {
    let nameValue = document.querySelector(`#name`).value;
    let speakerValue = document.querySelector(`#speaker`).value;
    let questionValue = document.querySelector(`#question`).value;

    if (!nameValue) {
        alert("Uh oh! Looks like you forgot to fill in your name. Please recheck!");
        return 0;
    }
    if (!speakerValue || speakerValue == "") {
        alert("Uh oh! Looks like you forgot to fill in the Speaker. Please recheck!");
        return 0;
    }
    if (!questionValue) {
        alert("Uh oh! Looks like you forgot to fill in the question. Please recheck!");
        return 0;
    }

    try {
        let response = await fetch('https://tedxbackend.herokuapp.com/question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            ///
            body: JSON.stringify({
                "name": nameValue,
                "speaker": speakerValue,
                "question": questionValue,
                "time": new Date(),
            })
            ///
        });

        if (response.ok) { // if HTTP-status is 200-299
            let prevQues= document.querySelector(".prevQues");
            let responseJSON = await response.json();
            console.log(response, responseJSON);

            let array1 = JSON.parse(localStorage.getItem("array"));
            if (array1){
                array1.unshift({
                    "name": nameValue,
                    "speaker": speakerValue,
                    "question": questionValue
                })
            }
            else {
                array1 = [
                    {
                        "name": nameValue,
                        "speaker": speakerValue,
                        "question": questionValue
                    },
                ]
            }
            
            prevQues.innerHTML = `<h2 style="margin-bottom: 10px;">Your Previous Questions</h2>`
            array1.forEach(element => {
                const card = document.createElement("div");
                const dispSpeaker = document.createElement("h4");
                const displayQues = document.createElement("p");
                card.classList.add("card1");
                dispSpeaker.innerHTML = "Question for " + element.speaker + " -";
                displayQues.innerHTML = element.question;
                card.appendChild(dispSpeaker);
                card.appendChild(displayQues);
                prevQues.appendChild(card);
            });

            localStorage.setItem("array", JSON.stringify(array1));
            alert(responseJSON.message);
        }
        else {
            let responseJSON = await response.json();
            alert(responseJSON.message);
        }
    }
    catch (err) {
        console.log(err);
        alert("Couldn't submit the form. Please reach out to us on TEDxBITSPilani.team@gmail.com ");
    }
}