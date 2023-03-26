import {
    auth,
    onAuthStateChanged,
    db,
    collection,
    doc,
    addDoc,
    query,
    deleteDoc,
    where,
    signOut,
    updateDoc,
    getDocs,
} from "./firebase.config.js";

const userState = document.getElementById("authuser");

let status = "create";

onAuthStateChanged(auth, (user) => {
    if (user) {
        userState.textContent = "Login as " + user.displayName;
        console.log(user.displayName);
        getCredentials();
    } else {
    }
});

const alertBox = document.getElementsByClassName("alertMain")[0];
function toggleAlert() {
    if (alertBox.style.display === "none") {
        alertBox.style.display = "flex";
    } else alertBox.style.display = "none";
    getCredentials();
}

let userData = [];

async function getCredentials() {
    const q = query(
        collection(db, "students"),
        where("facultyid", "==", auth.currentUser.uid)
    );

    const querySnapshot = await getDocs(q);
    userData.length = 0;

    querySnapshot.forEach((doc) => {
        userData.push({ ...doc.data(), sid: doc.id });
    });
    showUser();
    console.log(userData);
}

async function studentDetailsUpdate(sid, data) {}

// clear the form
const formData = (user = "", passwd = "", mail = "") => {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const email = document.getElementById("email");
    username.value = user;
    password.value = passwd;
    email.value = mail;
};

const table = document.getElementsByClassName("userTable")[0];
function showUser() {
    table.innerHTML = "";
    let indexid = 1;
    for (let i = 0; i < userData.length; i++) {
        const tr = document.createElement("tr");
        if (i === 0) {
            const tr = document.createElement("tr");
            ["ID", "Username", "Password", "Email", "Edit", "Trash"].forEach(
                (text) => {
                    const th = document.createElement("th");
                    th.append(text);
                    tr.append(th);
                }
            );
            table.append(tr);
        }
        [
            indexid++,
            userData[i].username,
            userData[i].password,
            userData[i].email,
        ].forEach((key) => {
            const td = document.createElement("td");
            td.append(key);
            tr.append(td);
        });

        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const butn1 = document.createElement("button");
        butn1.append("Edit");
        butn1.classList.add("userButn");
        butn1.classList.add("editButn");
        butn1.addEventListener("click", () => {
            formData(
                userData[i]["username"],
                userData[i]["password"],
                userData[i]["email"]
            );
            toggleAlert();
            status = userData[i].sid;
        });
        td1.append(butn1);
        const butn2 = document.createElement("button");
        butn2.append("Trash");
        butn2.classList.add("userButn");
        butn2.classList.add("trashButn");
        butn2.addEventListener("click", async () => {
            await deleteDoc(doc(db, "students", userData[i].sid));
            console.log(userData[i].username, "deleted success");
            getCredentials();
        });
        td2.append(butn2);
        tr.append(td1);
        tr.append(td2);
        table.append(tr);
    }
}

const form = document.getElementById("userform");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const email = e.target.email.value;
    try {
        const ref = collection(db, "students");
        if (status === "create") {
            await addDoc(ref, {
                username,
                password,
                email,
                facultyid: auth.currentUser.uid,
            });
            console.log("success student created");
        } else {
            await updateDoc(doc(db, "students", status), {
                username,
                password,
                email,
            });
            console.log("student details update");
        }
    } catch (error) {
        console.log(error);
    } finally {
        toggleAlert();
        status = "create";
    }
});

document.getElementById("createNew").addEventListener("click", () => {
    const action = document.getElementById("action");
    action.value = "new";
    formData();
    toggleAlert();
});

function alertEsc(evt) {
    if (evt.code === "Escape") {
        if (alertBox.style.display === "flex") toggleAlert();
    }
}

document.body.addEventListener("keydown", alertEsc);

document.querySelector("#logoutButn").addEventListener("click",function(){
  signOut(auth).then(() => {
    location.href = "/index.html"
  }).catch((error) => {
    console.log(error)
  });
})