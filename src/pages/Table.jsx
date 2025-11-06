import Nav from "../component/Nav.jsx";
import "../index.css";
import Button from "../component/button.jsx";
import { useEffect, useState } from "react";

const Table = () => {
    const base_url = "http://localhost/api/php";
    const get_url = `${base_url}/get.php`;
    const post_url = `${base_url}/post.php`;
    const put_url = `${base_url}/put.php`;
    const delete_url = `${base_url}/delete.php`;

    const [users, setUsers] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const resetForm = () => {
        setFormData({
            id: "",
            name: "",
            username: "",
            email: "",
            phone: "",
            website: "",
        });
        setEditMode(false);
        setIsFormOpen(false);
    };

    // ✅ CREATE & UPDATE
    const handleSubmit = (e) => {
        e.preventDefault();

        const url = editMode ? `${put_url}?id=${formData.id}` : post_url;
        const method = editMode ? "PUT" : "POST";

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (editMode) {
                    setUsers(users.map((u) => (u.id === formData.id ? data : u)));
                } else {
                    setUsers([...users, data]);
                }
                resetForm();
            })
            .catch(console.error);
    };

    // ✅ EDIT
    const handleEdit = (user) => {
        setFormData(user);
        setEditMode(true);
        setIsFormOpen(true);
    };

    // ✅ DELETE
    const handleDelete = (id) => {
        fetch(delete_url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.success) {
                    setUsers(users.filter((u) => u.id !== id));
                } else {
                    console.error("Failed to delete:", result.message);
                }
            })
            .catch(console.error);
    };

    // ✅ GET
    useEffect(() => {
        fetch(get_url)
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch(console.error);
    }, []);

    return (
        <>
            <Nav />
            <div className="bg-[#d0f8ff] p-40">
                <header className="mb-6">
                    <div className="container ml-auto mr-auto">
                        <div className="header-wrapper flex justify-between items-center">
                            <h1 className="text-5xl">Admin</h1>
                            <div className="search-box relative">
                                <input
                                    id="search"
                                    placeholder="Search user ....."
                                    className="bg-white h-12 pl-10 pr-2.5 rounded-4xl"
                                />
                                <div className="search-icon absolute top-[14px] left-[13px]">
                                    <span className="material-symbols-outlined"> search </span>
                                </div>
                            </div>
                            <div>
                                <Button title={"Add User"} value={() => setIsFormOpen(true)} />
                            </div>
                        </div>
                    </div>
                </header>

                {isFormOpen && (
                    <section className="fixed bg-[#000000d1] w-full h-full top-0 left-0 z-20 flex justify-center items-center">
                        <div className="h-fit bg-white p-5 flex flex-col gap-5 w-1/4 rounded-2xl">
                            <div className="flex items-center justify-between">
                                <p className="text-2xl">
                                    {editMode ? "Edit User" : "Add User"}
                                </p>
                                <div className="close-button cursor-pointer" onClick={resetForm}>
                                    <span className="material-symbols-outlined"> close </span>
                                </div>
                            </div>
                            <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
                                {["name", "username", "email", "phone", "website"].map((field) => (
                                    <div className="flex flex-col gap-1.5" key={field}>
                                        <label className="pl-1.5 capitalize">{field}</label>
                                        <input
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleChange}
                                            placeholder={`Enter your ${field}`}
                                            className="form-input h-12 bg-blue-50 rounded-full pl-6 focus:outline focus:invalid:border-pink-500"
                                            required
                                        />
                                    </div>
                                ))}
                                <Button
                                    title={editMode ? "✏️ Update User" : "➕ Submit User"}
                                />
                            </form>
                        </div>
                    </section>
                )}

                <section className="table-section container ml-auto mr-auto ">
                    <table className="table bg-white container rounded-2xl">
                        <thead>
                        <tr className="table-header grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] text-left p-6">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Website</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="table-body grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-t border-black p-6"
                            >
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.website}</td>
                                <td>
                                    <button onClick={() => handleEdit(user)}>
                                        <span className="material-symbols-outlined">edit</span>
                                    </button>
                                    <button onClick={() => handleDelete(user.id)}>
                                        <span className="material-symbols-outlined">delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
};

export default Table;