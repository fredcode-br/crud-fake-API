const usersList = document.querySelector("#list-users")
const modalEdit = document.querySelector(".edit-modal")
const modalDelete = document.querySelector(".modal-delete")

const nameUser = document.querySelector("#name")
const emailUser = document.querySelector("#email")
const submitBtn = document.querySelector("#submit")

const geUsersData = async() => {
    const res = await fetch("https://reqres.in/api/users?page=2");
    const data = await res.json();
    return data;
};

const getSingleUser = async(id) => {
    const res = await fetch(`https://reqres.in/api/users/${id}`);
    const data = await res.json();
    return data; 
}

const createEditEventListener = () => {
    let btn = document.querySelectorAll('#btn-edit');
    for(let item of btn){
        item.addEventListener('click', async(e) => {
            e.preventDefault()
            const id = e.target.value
            modalEdit.classList.remove('hide')
            const user =  await getSingleUser(id);
            nameUser.value = `${user.data.first_name}`;
            emailUser.value = `${user.data.email}`;
            submitBtn.value = `${user.data.id}`
        });
    }
}

const createDeleteEventListener = () => {
    let btn = document.querySelectorAll('#btn-del');
    for(let item of btn){
        item.addEventListener('click', (e) => {
            e.preventDefault()
            const id = e.target.value
            deleteUser(id)
        });
    }
}

const addUser = (user) => {
    const li = document.createElement('li');
    li.classList.add("user")
    li.innerHTML = `
        <div class="user-image">
            <img src="${user.avatar}" alt="user">
        </div>
        <h3>${user.first_name}</h3>
        <p>${user.email}</p>
        <div class="user-buttons">
            <button value="${user.id}" id="btn-del" >Delete</button>
            <button value="${user.id}" id="btn-edit">Edit</button>
        </div>
    `
    usersList.appendChild(li);

    createEditEventListener();
    createDeleteEventListener();
}

const showUsers = async() => {
    const data =  await geUsersData();
    const users = data.data;
    users.map(function(user) {
        addUser(user)

    })
    
}



const closeModal = () => {
    modalEdit.classList.add("hide")
}

const closeModalDelete = () => {
    modalDelete.classList.add("hide")
}


const deleteUser = async(id) => {
    await fetch(`https://reqres.in/api/users/${id}`, {
        method: "DELETE",
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        }
    });

    modalDelete.classList.remove("hide")
}

const updateUser = async(id, name, email) => {
    const user = {id: id, name: name, email: email}

    await fetch(`https://reqres.in/api/users/`, {
        method: "PATCH",
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(user),
    });
}

const createUser = async(id, name, email) => {
    const user = {id: id, name: name, email: email}

    await fetch(`https://reqres.in/api/users/`, {
        method: "POST",
        headers: {
        "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(user),
    });
}


geUsersData();
showUsers();


submitBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const id = submitBtn.value;
    const name = nameUser.value;
    const email = emailUser.value;

    updateUser(id, name, email);     
});