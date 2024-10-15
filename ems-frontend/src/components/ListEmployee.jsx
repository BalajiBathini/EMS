// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../server/EmployeServer";
import { useNavigate } from "react-router-dom";

const ListEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false); 
    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployee();
        
    }, []);
function getAllEmployee(){
    listEmployees().then((response) => {
        setEmployees(response.data);
    }).catch(error => {
        console.error(error);
    });

}
    function addNewEmployee() {
        navigator('/add-employee');
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`);
    }
    function removeEmployee(id){
        console.log(id);
       deleteEmployee(id).then((response)=>{
        if (response.status === 200) { // Ensure deletion succeeded
            getAllEmployee(); // Refresh employee list
        } else {
            console.error("Failed to delete employee");
        }
       }).catch(error=>{
        console.error("Error deleting employee", error);
    }).finally(() => {
        setLoading(false); // Set loading false once done
    });
       
    }

    return (
        <div className="container">
            <h2 className='text-center'> Employee Details</h2>
            <button className="btn btn-primary mb-2" onClick={addNewEmployee}>Add New Employee</button>
            <table className='table table-striped table-hover table-bordered'>
                <thead className="text-center">
                    <tr>
                        <th>Id</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {employees.map(employee =>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstname}</td>
                            <td>{employee.lastname}</td>
                            <td>{employee.email}</td>
                            <td><button className="btn btn-secondary mx-3" onClick={() => updateEmployee(employee.id)}>Update</button>
                            <button className="btn btn-danger" onClick={()=>removeEmployee(employee.id)} disabled={loading}>delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ListEmployee;
