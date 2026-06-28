document.addEventListener("DOMContentLoaded", () => {

    const lostForm = document.getElementById("lostForm");
     if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark-mode");

}
    if(lostForm){

        lostForm.addEventListener("submit", function(e){

    e.preventDefault();

    const report = {

        itemName:
        document.getElementById("itemName").value,

        location:
        document.getElementById("location").value,

        category:
        document.getElementById("category").value,

        description:
        document.getElementById("description").value,

        date:
        document.getElementById("dateLost").value,

        status:"Lost"
    };

    let reports =
    JSON.parse(localStorage.getItem("reports")) || [];

    reports.push(report);

    localStorage.setItem(
        "reports",
        JSON.stringify(reports)
    );

    alert("Lost Item Report Saved!");

    lostForm.reset();

});

    }

});

const foundForm = document.getElementById("foundForm");

if(foundForm){

    foundForm.addEventListener("submit", function(e){

        e.preventDefault();

        const report = {

            itemName:
            document.getElementById("foundItemName").value,

            location:
            document.getElementById("foundLocation").value,

            category:
            document.getElementById("foundCategory").value,

            description:
            document.getElementById("foundDescription").value,

            date:
            document.getElementById("foundDate").value,

            status:"Found"
        };

        let reports =
        JSON.parse(localStorage.getItem("reports")) || [];

        reports.push(report);

        localStorage.setItem(
            "reports",
            JSON.stringify(reports)
        );

        alert("Found Item Report Saved!");

        foundForm.reset();

    });

}
const results = document.getElementById("results");

if(results){

    const reports =
    JSON.parse(localStorage.getItem("reports")) || [];

    displayReports(reports);

    function displayReports(data){

        results.innerHTML = "";

      data.forEach((report, index) => {

    results.innerHTML += `
    <div class="result-card">

        <h3>${report.itemName}</h3>

        <p>
            <strong>Status:</strong>
            ${report.status}
        </p>

        <p>
            <strong>Location:</strong>
            ${report.location}
        </p>

        <p>
            <strong>Category:</strong>
            ${report.category}
        </p>

        <a href="item-details.html?id=${index}"
           class="details-btn">
           View Details
        </a>

    </div>
    `;

});
    }

    document
    .getElementById("searchInput")
    .addEventListener("keyup", function(){

        const value =
        this.value.toLowerCase();

        const filtered =
        reports.filter(report =>
            report.itemName
            .toLowerCase()
            .includes(value)
        );

        displayReports(filtered);

    });

}

const itemDetails = document.getElementById("itemDetails");

if(itemDetails){

    const params =
    new URLSearchParams(window.location.search);

    const id = params.get("id");

    const reports =
    JSON.parse(localStorage.getItem("reports")) || [];

    const item = reports[id];

    if(item){

        itemDetails.innerHTML = `
            <h2>${item.itemName}</h2>

            <p><strong>Status:</strong> ${item.status}</p>

            <p><strong>Location:</strong> ${item.location}</p>

            <p><strong>Category:</strong> ${item.category}</p>

            <p><strong>Description:</strong> ${item.description}</p>

            <p><strong>Date:</strong> ${item.date}</p>
        `;
    }
}

const totalReports =
document.getElementById("totalReports");

if(totalReports){

    const reports =
    JSON.parse(localStorage.getItem("reports")) || [];

    const lost =
    reports.filter(item =>
        item.status === "Lost"
    );

    const found =
    reports.filter(item =>
        item.status === "Found"
    );

    document.getElementById("totalReports")
    .textContent = reports.length;

    document.getElementById("lostCount")
    .textContent = lost.length;

    document.getElementById("foundCount")
    .textContent = found.length;
}

const darkModeBtn =
document.getElementById("darkModeBtn");

if(darkModeBtn){

    darkModeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark-mode")
                ? "dark"
                : "light"
        );

    });

}

    if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("sw.js")
            .then(() => {

                console.log("Service Worker Registered");

            });

    });

}
const menuToggle = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");

if(menuToggle){

    menuToggle.addEventListener("click", ()=>{

        navLinks.classList.toggle("active");

    });

}