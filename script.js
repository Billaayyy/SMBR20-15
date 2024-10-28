// Function to mark tasks as done
function markAsDone(checkbox) {
    const label = checkbox.nextElementSibling;
    if (checkbox.checked) {
        label.classList.add('completed');
    } else {
        label.classList.remove('completed');
    }

    // Set the cookie task status
    setCookie(checkbox.id, checkbox.checked, 7); // Cookie expires in 7 days
}

// Countdown function
function updateCountdown(dueDate, countdownId) {
    const countdownElement = document.getElementById(countdownId);
    const now = new Date().getTime();
    const distance = new Date(dueDate).getTime() - now;

    if (distance < 0) {
        countdownElement.innerHTML = "Deadline Passed";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Update countdown every second
    setTimeout(() => updateCountdown(dueDate, countdownId), 1000);
}

// Start countdown for each task ygy
// Reminder : Update ini sesuai sama countdown id di index
function startCountdowns() {
    const tasks = [
        { dueDate: "2024-10-30", countdownId: "countdown1" },
        { dueDate: "2024-10-29", countdownId: "countdown2" },
        { dueDate: "2024-10-29", countdownId: "countdown5" },
        { dueDate: "2024-10-31", countdownId: "countdown6" },
        { dueDate: "2024-11-01", countdownId: "countdown7" },
    ];

    tasks.forEach(task => {
        updateCountdown(task.dueDate, task.countdownId);
    });
}

// Function set cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Function get cookie
function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// reLoad task status from cookies when the page loads
// Reminder: Update ini terus biar ngeload task baru, janlup edit task id juga di index
document.addEventListener("DOMContentLoaded", function () {
    const taskIds = ['tugas pmb', 'tugas acc', 'tugas apresbud', 'tugas bindo', 'tugas psdk'];

    taskIds.forEach(id => {
        const status = getCookie(id);
        const checkbox = document.getElementById(id);
        checkbox.checked = (status === "true"); 
        markAsDone(checkbox); 
    });
});

// Start countdowns when the page loads
window.onload = startCountdowns;
