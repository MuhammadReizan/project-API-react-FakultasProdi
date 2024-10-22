import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function List() {
    const [prodi, setProdi] = useState([]);

    useEffect(() => {
        axios
            .get("https:/project-apiif-3-b.vercel.app/api/api/prodi")
            .then((response) => {
                console.log(response.data.result);
                setProdi(response.data.result);
            })
            .catch((error) => {
                console.log("Error : " + error);
            });
    }, []);

    const handleDelete = (id, nama) => {
        Swal.fire({
            title: "Are you sure to delete?",
            text: `You won't be able to revert this! Prodi ${nama}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`https://project-apiif-3-b.vercel.app/api/api/prodi/${id}`)
                    .then(() => {
                        setProdi(prodi.filter((f) => f.id !== id));
                        Swal.fire("Deleted!", "Prodi has been deleted.", "success");
                    })
                    .catch((error) => {
                        console.log("Error deleting data:" + error);
                        Swal.fire(
                            "Error!",
                            "There was an error deleting the data",
                            "error"
                        );
                    });
            }
        });
    };

    return (
        <>
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h2>List Prodi</h2>
                    <NavLink to="/prodi/create" className="btn btn-primary">
                        Create New Prodi
                    </NavLink>
                </div>
                <table className="table table-striped mt-3">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nama Prodi</th>
                            <th scope="col">Nama Fakultas</th>
                            <th scope="col" className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prodi.map((f) => (
                            <tr key={f.id}>
                                <td>{f.nama}</td>
                                <td>{f.fakultas.nama}</td>
                                <td className="text-center">
                                    <div className="btn-group" role="group">
                                        <NavLink to={`/prodi/edit/${f.id}`} className="btn btn-warning btn-sm">
                                            Edit
                                        </NavLink>
                                        <button
                                            onClick={() => handleDelete(f.id, f.nama)}
                                            className="btn btn-danger btn-sm ms-2"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
