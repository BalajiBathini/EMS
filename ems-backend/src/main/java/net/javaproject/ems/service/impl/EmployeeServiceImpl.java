package net.javaproject.ems.service.impl;

import lombok.AllArgsConstructor;
import net.javaproject.ems.dto.EmployeeDto;
import net.javaproject.ems.entity.Employee;
import net.javaproject.ems.exception.ResourceNotFoundException;
import net.javaproject.ems.mapper.EmployeeMapper;
import net.javaproject.ems.repository.EmployeeRepository;
import net.javaproject.ems.service.EmployeeService;
import org.antlr.v4.runtime.atn.EmptyPredictionContext;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {
    private EmployeeRepository employeeRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee= EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee=employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
       Employee employee= employeeRepository.findById(employeeId)
               .orElseThrow(()-> {
                   return new ResourceNotFoundException("Employee ledhu ra gabbu na kodaaka :" + employeeId);
               });
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployee() {
        List<Employee> employees=employeeRepository.findAll();

        return employees.stream().map((employee)->EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
     Employee employee=   employeeRepository.findById(employeeId).orElseThrow(()->new ResourceNotFoundException("Employee not found"+employeeId));
     employee.setFirstname(updatedEmployee.getFirstname());
     employee.setLastname(updatedEmployee.getLastname());
     employee.setEmail(updatedEmployee.getEmail());
Employee update= employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(update);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(()->new ResourceNotFoundException("Employee ledhu ra gabbu na kodaaka :"+employeeId));
        employeeRepository.deleteById(employeeId);
    }


}
