import { useState } from "react";
import { Container,Row,Col } from "react-bootstrap";
import employeedetails from "./jsonfile.json";


function Task(){

    const [selecteddata,setselecteddata] = useState("");
    
    const showfiltereddetails = selecteddata === "" ? employeedetails : employeedetails.filter((results)=>results.Department === selecteddata);

    return(
        <>

            <Container>
                <Row>
                    <Col>
                        <h5 className="text-danger">First Dropdown(to display a related datas while selecting)</h5>
                        <span>Choose Department name : </span>
                        <select onChange={(e)=>setselecteddata(e.target.value)}>
                            <option>---Select Department Name---</option>
                            {employeedetails.map((datas)=>(
                                <option>
                                    {datas.Department}
                                </option>
                            ))} 
                            <option value="">---All---</option> 
                        </select>
                    </Col>
                </Row>
            </Container>


            <Container fluid className="mt-5">
                <Row>
                    <Col>
                        <table>
                            <thead>
                                <tr>
                                    <th>DEPARTMENT</th>
                                    <th>EMPLOYEE CODE</th>
                                    <th>EMPLOYEE NAME</th>
                                    <th>SALARY</th>
                                </tr>
                            </thead>

                            <tbody>
                                {showfiltereddetails.map((jsondatas)=>(
                                    <tr>
                                        <td>{jsondatas.Department}</td>
                                        <td>{jsondatas.EmployeeCode}</td>
                                        <td>{jsondatas.EmployeeName}</td>
                                        <td>{jsondatas.salary}</td>
                                    </tr>
                                ))}   
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}



export default Task;




