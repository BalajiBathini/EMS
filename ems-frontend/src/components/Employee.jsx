// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmploye } from '../server/EmployeServer';
import { useNavigate, useParams } from 'react-router-dom';

const Employee = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const navigator = useNavigate();
    const { id } = useParams();

    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: ''
    });

    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstname(response.data.firstname);
                setLastname(response.data.lastname); // Corrected this line
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    function saveEmployee(e) {
        e.preventDefault();
        if (validateForm()) {

            const employee = { firstname, lastname, email };
            console.log(employee);
            if(id){
                updateEmploye(id,employee).then((response)=>{
                    console.log(response);
                    navigator('/employees');
                }).catch(error=>{
                    console.error(error);
                })
            }else{
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error=>{
                    console.error(error);
                })
            }
           
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (firstname.trim()) {
            errorsCopy.firstname = '';
        } else {
            errorsCopy.firstname = 'Please enter your first name';
            valid = false;  // Set valid to false
        }

        if (lastname.trim()) {
            errorsCopy.lastname = '';
        } else {
            errorsCopy.lastname = 'Please enter your last name';
            valid = false;  // Set valid to false
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Please enter your email';
            valid = false;  // Set valid to false
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className="text-center">Edit Employee</h2>;
        } else {
            return <h2 className="text-center">Add Employee</h2>;
        }
    }

    return (
        <div className='container pt-5'>
            <div className='row'>
                <div className="card col-mb-6">
                    {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-input mb-2">
                                <label className="form-label">First Name:</label>
                                <input
                                    type="text"
                                    placeholder='Enter Employee First Name....'
                                    className={`form-control ${errors.firstname ? 'is-invalid' : ''}`}
                                    name='firstname'
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                                {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
                            </div>
                            <div className="form-input mb-2">
                                <label className="form-label">Last Name:</label>
                                <input
                                    type="text"
                                    placeholder='Enter Employee Last Name....'
                                    className={`form-control ${errors.lastname ? 'is-invalid' : ''}`}
                                    name='lastname'
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                                {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
                            </div>
                            <div className="form-input mb-2">
                                <label className="form-label">Email:</label>
                                <input
                                    type="email"
                                    placeholder='Enter Employee Email....'
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <button className='btn btn-success' onClick={saveEmployee}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Employee;
