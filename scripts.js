let data = "JobAppId_V1.06"

let jobid = localStorage.getItem(data) || 1

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});


document.getElementById("formdc").addEventListener("submit", function(e) {
  e.preventDefault();

  let dcName = document.getElementById("dcName").value;
  let desc = document.getElementById("reason").value;
  let budget = document.getElementById("budget").value;
  let deadline = document.getElementById("deadline").value || "No Deadline";
  let extra = document.getElementById("extraInfo").value || "No Extra Info";

  /*const request = new XMLHttpRequest();
  request.open("POST", "https://discord.com/api/webhooks/1291389655429812366/DDj8ZvVjCCk7Y89gpNtdwALfwrP_XqYMo8YpzefZolSQlzqTuH8Z7NobPP68yBgcODUO")

  request.setRequestHeader("Content-type", "application/json")*/

  const date = new Date();

  let params = {
      "name": "JobAppGuy",
      "content": null,
      "embeds": [
        {
          "title": "Job App",
          "description": `Why (we | i) want to hire you:\n${desc}\n\nMy | our Budget is:\n${budget}\n\nDeadline is on:\n${deadline}\n\nExtra info about the Project:\n${extra}`,
          "color": 255,
          "fields": [
            {
              "name": "Discord Username",
              "value": `${dcName}`
            },
            {
              "name": "Application Id",
              "value": `${jobid}`
            }
          ],
          "footer": {
            "text": "Submit Time"
          },
          "timestamp": date.toISOString()
        }
      ],
      "username": "JobAppGuy",
      "attachments": []
  }

  //request.send(JSON.stringify(params));

  /*request.onload = () => {
    if (request.status == 204) {
      jobid++;
      localStorage.setItem(data, jobid)
    }
  }*/

  fetch("https://discord.com/api/webhooks/1291389655429812366/DDj8ZvVjCCk7Y89gpNtdwALfwrP_XqYMo8YpzefZolSQlzqTuH8Z7NobPP68yBgcODUO", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(params)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    return response.text()
  })
  .then(data1 => {
    jobid++;
    localStorage.setItem(data, jobid)
    console.log("Success:", data1)

    document.getElementById("dcName").value = "";
    document.getElementById("reason").value = "";
    document.getElementById("budget").value = "";
    document.getElementById("deadline").value = "";
    document.getElementById("extraInfo").value = ""

    document.getElementById("okay1").value = "Submitted"

    setTimeout(function() {
       document.getElementById("okay1").value = "Submit"
    }, 1000)
  })
  .catch(error => {
    console.error("Error:", error)
  })

})