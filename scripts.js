let data = "JobAppId_V1.07"

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

    let date = new Date();

    document.getElementById("copyid").innerHTML = `&copy; ${date.getFullYear()} imnotlycky`
});


document.getElementById("formdc").addEventListener("submit", function(e) {
  e.preventDefault();

  let dcName = document.getElementById("dcName").value;
  let desc = document.getElementById("reason").value;
  let budget = document.getElementById("budget").value;
  let deadline = document.getElementById("deadline").value || "No Deadline";
  let extra = document.getElementById("extraInfo").value || "No Extra Info";

  const date = new Date();

  let params = {
      "name": "JobAppGuy",
      "content": null,
      "embeds": [
        {
          "title": "Job App",
          "description": `Why (we or i) want you to choose my Project:\n${desc}\n\nMy or our Budget is:\n${budget}\n\nDeadline is on:\n${deadline}\n\nExtra info about the Project:\n${extra}`,
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
    document.getElementById("okay1").value = "There was an error while submitting, Try again later."

    setTimeout(function() {
      document.getElementById("okay1").value = "Submit"
    }, 1000)
  })

})