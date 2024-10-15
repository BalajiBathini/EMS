package net.javaproject.ems.controller;

import lombok.AllArgsConstructor;
import net.javaproject.ems.dto.EmployeeDto;

import net.javaproject.ems.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
    private EmployeeService employeeService;

    //Build add employee Rest Api
    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee( @RequestBody EmployeeDto employeeDto){
        EmployeeDto savedEmployee= employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }
    //Build get employee Rest Api
    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto> getEmployeeById(@PathVariable("id") Long employeeId){
         EmployeeDto employeeDto=employeeService.getEmployeeById(employeeId);
         return ResponseEntity.ok(employeeDto);
    }

    //Build get all employeee RestAPI
    @GetMapping
    public ResponseEntity<List<EmployeeDto>> getAllEmployee(){
        List<EmployeeDto> employees=employeeService.getAllEmployee();
        return ResponseEntity.ok(employees);
    }
    //build update employee method
    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id") Long employeeId,@RequestBody EmployeeDto updatedEmployee){
     EmployeeDto employeeDto=   employeeService.updateEmployee(employeeId,updatedEmployee);
     return ResponseEntity.ok(employeeDto);
    }
    //build delete employee rest APi
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee( @PathVariable("id") Long employeeId){
        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok("employee Deleteeee Successfullly....!");
    }
}
