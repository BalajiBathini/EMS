package net.javaproject.ems.service;

import net.javaproject.ems.dto.EmployeeDto;
import net.javaproject.ems.entity.Employee;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);
    EmployeeDto getEmployeeById(Long employeeId);
    List<EmployeeDto> getAllEmployee();
    EmployeeDto updateEmployee(Long employeeId,EmployeeDto updatedEmployee);
    void deleteEmployee(Long employeeId);
}
