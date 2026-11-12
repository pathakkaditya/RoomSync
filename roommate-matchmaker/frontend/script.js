document.addEventListener("DOMContentLoaded", function () {

    const cleanliness = document.getElementById("cleanliness");
    const cleanlinessValue = document.getElementById("cleanlinessValue");

    if (cleanliness && cleanlinessValue) {
        cleanliness.addEventListener("input", function () {
            cleanlinessValue.textContent = this.value;
        });
    }
    const social = document.getElementById("social");
    const socialValue = document.getElementById("socialValue");

    if (social && socialValue) {
        social.addEventListener("input", function () {
            socialValue.textContent = this.value;
        });
    }
    const basicForm = document.getElementById("basicForm");

    if (basicForm) {

        basicForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const data = {
                name: document.getElementById("name").value,
                age: document.getElementById("age").value,
                gender: document.getElementById("gender").value,
                state: document.getElementById("state").value,
                college: document.getElementById("college").value,
                course: document.getElementById("course").value,
                year: document.getElementById("year").value
            };

            localStorage.setItem(
                "basicData",
                JSON.stringify(data)
            );

            window.location.href = "profile-lifestyle.html";
        });
    }
    const lifestyleForm = document.getElementById("lifestyleForm");

    if (lifestyleForm) {

        lifestyleForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const data = {
                sleepTime: document.getElementById("sleepTime").value,
                wakeTime: document.getElementById("wakeTime").value,
                cleanliness: document.getElementById("cleanliness").value,
                studyHours: document.getElementById("studyHours").value,
                noise: document.getElementById("noise").value,
                social: document.getElementById("social").value,
                guests: document.getElementById("guests").value,
                food: document.getElementById("food").value
            };

            localStorage.setItem(
                "lifestyleData",
                JSON.stringify(data)
            );

            window.location.href = "profile-preferences.html";
        });
    }
    const preferencesForm =
        document.getElementById("preferencesForm");

    if (preferencesForm) {

        preferencesForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const priorities = [];

            document
                .querySelectorAll('input[name="priority"]:checked')
                .forEach(function (checkbox) {
                    priorities.push(checkbox.value);
                });

            const data = {
                roomType: document.getElementById("roomType").value,
                acPreference:
                    document.getElementById("acPreference").value,
                sharing:
                    document.getElementById("sharing").value,
                roomTemperature:
                    document.getElementById("roomTemperature").value,
                lights:
                    document.getElementById("lights").value,
                priorities: priorities
            };

            localStorage.setItem(
                "preferencesData",
                JSON.stringify(data)
            );

            window.location.href = "profile-hostel.html";
        });
    }
    const hostelForm = document.getElementById("hostelForm");

    if (hostelForm) {

        hostelForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            const hostelData = {
                hostel1: document.getElementById("hostel1").value,
                hostel2: document.getElementById("hostel2").value,
                hostel3: document.getElementById("hostel3").value,
                hostel4: document.getElementById("hostel4").value
            };


            const hostels = [
                hostelData.hostel1,
                hostelData.hostel2,
                hostelData.hostel3,
                hostelData.hostel4
            ];

            if (new Set(hostels).size !== hostels.length) {

                alert(
                    "Please select a different hostel for each preference."
                );

                return;
            }
            
            const basicData =
                JSON.parse(
                    localStorage.getItem("basicData")
                );

            const lifestyleData =
                JSON.parse(
                    localStorage.getItem("lifestyleData")
                );

            const preferencesData =
                JSON.parse(
                    localStorage.getItem("preferencesData")
                );

            const profile = {

                ...basicData,
                ...lifestyleData,
                ...preferencesData,
                ...hostelData

            };


            try {

                const response = await fetch(
                    "http://127.0.0.1:5000/api/profile",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(profile)
                    }
                );


                const result = await response.json();


                if (!response.ok) {

                    alert(
                        "Something went wrong while saving your profile."
                    );

                    console.log(result);

                    return;
                }

                localStorage.setItem(
                    "profileId",
                    result.profile_id
                );

                window.location.href = "matches.html";

            }

            catch (error) {

                console.error(error);

                alert(
                    "Could not connect to the Flask server."
                );

            }

        });
    }

});

function viewMatch(name) {

    localStorage.setItem(
        "selectedMatch",
        name
    );

    alert("Match selected: " + name);
}