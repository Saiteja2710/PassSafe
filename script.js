const maskPass = (pass) => {
    return '*'.repeat(pass.length);
}

const deletePass = (website) => {
    const data = localStorage.getItem("passwords");
    const arr = JSON.parse(data);
    const arrUpdate = arr.filter((e) => e.website !== website);
    localStorage.setItem("passwords", JSON.stringify(arrUpdate));
    alert(`Passwords for ${website} deleted successfully`);
    showPasswords();
}

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
        alert("Copied to clipboard");
    });
}

const showPasswords = () => {
    const tb = document.getElementById("password-table");
    const data = localStorage.getItem("passwords");
    tb.innerHTML = "";

    if (!data || JSON.parse(data).length === 0) {
        tb.innerHTML = `<tr class="empty-message"><td colspan='4'>Don't have any data to show</td></tr>`;
    } else {
        const arr = JSON.parse(data);
        arr.forEach(ele => {
            const row = `<tr>
                <td>${ele.website}</td>
                <td>${ele.username}<img onclick="copyToClipboard('${ele.username}')" src="copy.svg" alt="copy" class="copy-icon"></td>
                <td>${maskPass(ele.password)}<img onclick="copyToClipboard('${ele.password}')" src="copy.svg" alt="copy" class="copy-icon"></td>
                <td><button onclick="deletePass('${ele.website}')">Delete</button></td>
            </tr>`;
            tb.innerHTML += row;
        });
    }
}

document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();
    const passwords = localStorage.getItem("passwords");
    const json = passwords ? JSON.parse(passwords) : [];
    json.push({
        website: website.value,
        username: username.value,
        password: password.value
    });
    localStorage.setItem("passwords", JSON.stringify(json));
    alert("Password Saved");
    showPasswords();
});

showPasswords();