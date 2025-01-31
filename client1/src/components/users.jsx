import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);
  const [uUser, setUuser] = useState(null);

  // User Add
  const handleAddUser = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const newUse = { name, email };
    console.log("from add user: ", newUse);

    fetch("http://localhost:500/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUse),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.insertedId) {
          alert("Users Added Successfully!");
          e.target.reset();

          fetch("http://localhost:500/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
        }
      });
  };

  const handleEditUser = (_id) => {
    console.log(_id);

    fetch(`http://localhost:500/users/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUuser(data);
      });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const updateUser = { name, email };
    console.log("from update user: ", updateUser);

    fetch(`http://localhost:500/users/${uUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          alert("User updated successfully");
          e.target.reset();
          setUuser(null);

          fetch("http://localhost:500/users")
            .then((res) => res.json())
            .then((data) => setUsers(data));
        }
      });
  };

  // Remove User
  const handleDeleteUser = (_id) => {
    console.log(_id);

    fetch(`http://localhost:500/users/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert("User Deleted Successfully");
          const remaining = users.filter((user) => user._id !== _id);

          setUsers(remaining);
        }
      });
  };

  return (
    <div>
      <h2>Users</h2>

      <div>
        {/* <form onSubmit={handleAddUser}> */}
        <form onSubmit={uUser ? handleUpdateUser : handleAddUser}>
          <input
            type="text"
            name="name"
            style={{ height: "40px", width: "200px", padding: "0 10px" }}
            placeholder="Name"
            required
            defaultValue={uUser?.name}
          />{" "}
          <br />
          <br />
          <input
            type="email"
            name="email"
            style={{ height: "40px", width: "200px", padding: "0 10px" }}
            placeholder="Email"
            required
            defaultValue={uUser?.email}
          />{" "}
          <br />
          <br />
          <input
            type="submit"
            value={uUser ? "Update User" : "Add User"}
            style={{ padding: "10px 20px" }}
          />
        </form>
      </div>

      <div>
        <h2>All Users are: </h2>
        <div>
          {users.map((user) => (
            <p key={user._id}>
              ID: {user._id}, Name: {user.name}, Email: {user.email}{" "}
              <button
                onClick={() => handleEditUser(user._id)}
                style={{ margin: "0 10px", cursor: "pointer" }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteUser(user._id)}
                style={{ cursor: "pointer" }}
              >
                X
              </button>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
