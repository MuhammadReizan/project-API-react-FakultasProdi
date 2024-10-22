import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function List() {
    const [fakultas, setFakultas] = useState([]);

    useEffect(() => {
        axios
            .get('https://project-apiif-3-b.vercel.app/api/api/fakultas')
            .then((res) => {
                console.log(res.data.result);
                setFakultas(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleDelete = (id, nama) => {
        Swal.fire({
            title: 'Are you sure to delete?',
            text: `You won't be able to revert this! Fakultas ${nama}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`https://project-apiif-3-b.vercel.app/api/api/fakultas/${id}`)
                    .then(() => {
                        setFakultas(fakultas.filter((f) => f.id !== id));
                        Swal.fire('Deleted!', 'Fakultas has been deleted.', 'success');
                    })
                    .catch((error) => {
                        console.log('Error deleting data:' + error);
                        Swal.fire('Error!', 'There was an error deleting the data', 'error');
                    });
            }
        });
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>List Fakultas</h1>
                <NavLink to="/fakultas/create" className="btn btn-primary">
                    Create New Fakultas
                </NavLink>
            </div>
            <ul className="list-group">
                {fakultas.map((f) => (
                    <li
                        key={f.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <span>{f.nama}</span>
                        <div className="btn-group" role="group" aria-label="action buttons">
                            <NavLink to={`/fakultas/edit/${f.id}`} className="btn btn-warning btn-sm">
                                Edit
                            </NavLink>
                            <button
                                onClick={() => handleDelete(f.id, f.nama)}
                                className="btn btn-danger btn-sm ms-2"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
