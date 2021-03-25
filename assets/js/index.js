function closeNav() {
    document.getElementsByTagName('nav')[0].style.display = "none";
}

function openNav() {
    document.getElementsByTagName('nav')[0].style.display = "flex";
}

function openAboutTEDxBITSPilani() {
    document.getElementById('aboutTEDxBITSPilaniHeading').style.color = "black";
    document.getElementById('aboutTEDxBITSPilaniHeading').style.borderBottom = "5px solid khaki";
    document.getElementById('aboutTEDxHeading').style.borderBottom = "0px solid khaki";
    document.getElementById('aboutTEDxHeading').style.color = "lightgray";
    document.getElementById('aboutTEDxContent').innerHTML = `
    <p>TEDxBITSPilani is an event that aims to broadcast and organize numerous TED talks at BITS Pilani. The event aims at celebrating the mission of TED – ‘Ideas worth Spreading’ at Pilani campus of BITS Pilani. We believe ideas have the power to change attitudes, lives and ultimately, the world.</p>

    <p>The Birla Institute of Technology &Science, BITS Pilani is an all-India Institute for higher education. The primary motive of BITS is to "train young men and women able and eager to create and put into action such ideas, methods, techniques and information". BITS Pilani offers degrees in engineering, sciences, technology, pharmacy, management and humanities. It is widely known as the best private engineering institute of India.</p>
    
    <p>TEDxBITSPilani is an event that aims to broadcast and organize numerous TED talks at BITS Pilani. The event aims at celebrating the mission of TED – ‘Ideas worth Spreading’ at Pilani campus of BITS Pilani. We believe ideas have the power to change attitudes, lives and ultimately, the world. We aim to provide a platform that brings together people from all walks of life under one roof.</p>
    
    <p>For updates regarding TEDxBITSPilani, visit us on Facebook</p>
    `
}

function openAboutTEDx() {
    document.getElementById('aboutTEDxHeading').style.color = "black";
    document.getElementById('aboutTEDxHeading').style.borderBottom = "5px solid khaki";
    document.getElementById('aboutTEDxBITSPilaniHeading').style.borderBottom = "0px solid khaki";
    document.getElementById('aboutTEDxBITSPilaniHeading').style.color = "lightgray";
    document.getElementById('aboutTEDxContent').innerHTML = `<p>In the spirit of ideas worth spreading, TEDx is a program of local, self-organized events that bring people together to share a TED-like experience. At a TEDx event, TEDTalks video and live speakers combine to spark deep discussion and connection in a small group. These local, self-organized events are branded TEDx, where x = independently organized TED event. The TED Conference provides general guidance for the TEDx program, but individual TEDx events are self-organized. </p>
    <p>TEDx was created in the spirit of TED's mission, "ideas worth spreading." It supports independent organizers who want to create a TED-like event in their own community. These local, self-organized events are branded TEDx, where x = independently organized TED event.
    </p>
    <p>At TEDx events, a screening of TED Talks videos — or a combination of live presenters and TED Talks videos — sparks deep conversation and connections at the local level. TEDx events are planned and coordinated independently, under a free license granted by TED.
    </p>
    <p>TEDx events are non-profit, but may use an admission fee or commercial sponsorship to cover costs. Similarly, speakers are not paid. They must also relinquish the copyrights to their materials, which TED may edit and distribute under a Creative Commons license.
    </p>`
}

function openTeamLeads() {
    document.getElementById('teamLeadsButton').className = "activeButton";
    document.getElementById('associatesButton').className = "inactiveButton";
    document.getElementById('teamLeadsContainer').style.display = "flex";
    document.getElementById('associatesContainer').style.display = "none";
}

function openAssociates() {
    document.getElementById('teamLeadsButton').className = "inactiveButton";
    document.getElementById('associatesButton').className = "activeButton";
    document.getElementById('teamLeadsContainer').style.display = "none";
    document.getElementById('associatesContainer').style.display = "flex";
}

try {
    document.getElementById("quickConnectForm").addEventListener("submit", function (event) {
        event.preventDefault();
        submitQuickConnectForm();
    });
}
catch {
    console.log("No quick connect form found")
}

async function submitQuickConnectForm(e) {
    try {
        let response = await fetch('https://tedxbackend.herokuapp.com/websiteResponses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            ///
            body: JSON.stringify({
                "name": document.querySelector(`input[name="name"]`).value,
                "email": document.querySelector(`input[name="email"]`).value,
                "phone": document.querySelector(`input[name="phone"]`).value,
                "message": document.querySelector(`textarea[name="message"]`).value,
            })
            ///
        });

        if (response.ok) { // if HTTP-status is 200-299
            let responseJSON = await response.json();
            console.log(response, responseJSON);
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