document.getElementById("fcfs-form").addEventListener("submit", function(e) {
    e.preventDefault();

    let rows = document.querySelectorAll("#fcfs-inputs tr");
    let processes = [];
    let arrivalTimes = [];
    let burstTimes = [];

    rows.forEach(row => {
        processes.push(row.cells[0].querySelector("input").value);
        arrivalTimes.push(parseInt(row.cells[1].querySelector("input").value));
        burstTimes.push(parseInt(row.cells[2].querySelector("input").value));
    });

    // Sort processes by Arrival Time (FCFS)
    let combined = processes.map((p, i) => ({
        process: p,
        arrival: arrivalTimes[i],
        burst: burstTimes[i]
    }));
    combined.sort((a, b) => a.arrival - b.arrival);

    let completionTimes = [];
    let waitingTimes = [];
    let turnaroundTimes = [];

    let currentTime = 0;
    combined.forEach((p, i) => {
        if (currentTime < p.arrival) {
            currentTime = p.arrival; // CPU idle until process arrives
        }
        currentTime += p.burst;
        completionTimes[i] = currentTime;
        turnaroundTimes[i] = completionTimes[i] - p.arrival;
        waitingTimes[i] = turnaroundTimes[i] - p.burst;
    });

    // Display Results
    let tbody = document.querySelector("#fcfs-result tbody");
    tbody.innerHTML = "";
    combined.forEach((p, i) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${p.process}</td>
            <td>${p.arrival}</td>
            <td>${p.burst}</td>
            <td>${completionTimes[i]}</td>
            <td>${turnaroundTimes[i]}</td>
            <td>${waitingTimes[i]}</td>
        `;
        tbody.appendChild(tr);
    });
});

const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
navbar.classList.toggle('active');
});
