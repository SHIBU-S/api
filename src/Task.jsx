// import { useState } from "react";
// import { Container,Row,Col } from "react-bootstrap";
// import employeedetails from "./jsonfile.json";


// function Task(){

//     const [selecteddata,setselecteddata] = useState("");
    
//     const showfiltereddetails = selecteddata === "" ? employeedetails : employeedetails.filter((results)=>results.Department === selecteddata);

//     return(
//         <>

//             <Container>
//                 <Row>
//                     <Col>
//                         <h5 className="text-danger">First Dropdown(to display a related datas while selecting)</h5>
//                         <span>Choose Department name : </span>
//                         <select onChange={(e)=>setselecteddata(e.target.value)}>
//                             <option>---Select Department Name---</option>
//                             {employeedetails.map((datas)=>(
//                                 <option>
//                                     {datas.Department}
//                                 </option>
//                             ))} 
//                             <option value="">---All---</option> 
//                         </select>
//                     </Col>
//                 </Row>
//             </Container>


//             <Container fluid className="mt-5">
//                 <Row>
//                     <Col>
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>DEPARTMENT</th>
//                                     <th>EMPLOYEE CODE</th>
//                                     <th>EMPLOYEE NAME</th>
//                                     <th>SALARY</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {showfiltereddetails.map((jsondatas)=>(
//                                     <tr>
//                                         <td>{jsondatas.Department}</td>
//                                         <td>{jsondatas.EmployeeCode}</td>
//                                         <td>{jsondatas.EmployeeName}</td>
//                                         <td>{jsondatas.salary}</td>
//                                     </tr>
//                                 ))}   
//                             </tbody>
//                         </table>
//                     </Col>
//                 </Row>
//             </Container>
//         </>
//     )
// }


// export default Task;






import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import employeedetails from "./jsonfile.json";

function Task() {

    const [selecteddata, setselecteddata] = useState("");
    const [view, setview] = useState(null); 
    const [ischecked,setischecked] = useState([]);
    // const [isallchecked,setisallchecked] = useState([]);

    const showfiltereddetails = selecteddata === "" ? employeedetails : employeedetails.filter((results) => results.Department === selecteddata);

    function viewdetails(jsondatas) {
        setview(jsondatas); 
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h5 className="text-danger">
                            First Dropdown (to display related data while selecting)
                        </h5>
                        <span>Choose Department name: </span>
                        <select onChange={(e) => setselecteddata(e.target.value)}>
                            <option value="">---Select Department Name---</option>
                            {employeedetails.map((datas, index) => (
                                <option key={index} value={datas.Department}>
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
                                    <th><input type="checkbox" onChange={(e)=>{
                                        if(e.target.checked){
                                            setischecked(showfiltereddetails.map((fildatas)=>fildatas.EmployeeCode))
                                        }
                                        else {
                                            setischecked([]);
                                        }
                                    }} /></th>
                                    <th>DEPARTMENT</th>
                                    <th>EMPLOYEE CODE</th>
                                    <th>EMPLOYEE NAME</th>
                                    <th>SALARY</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showfiltereddetails.map((jsondatas, index) => (
                                    <tr key={index}>
                                        <td><input type="checkbox" onChange={(e)=>{
                                            if(e.target.checked){
                                                setischecked([...ischecked,jsondatas]);
                                            }
                                            else{
                                                setischecked(ischecked.filter(code => code !== jsondatas)); 
                                            } 
                                        }} /></td>
                                        <td>{jsondatas.Department}</td>
                                        <td>{jsondatas.EmployeeCode}</td>
                                        <td>{jsondatas.EmployeeName}</td>
                                        <td>{jsondatas.salary}</td>
                                        <td><button disabled={!ischecked.includes(jsondatas)} className="border px-3" onClick={() => viewdetails(jsondatas)}>View</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Container>

            {view && (
                <Container className="mt-4">
                    <Row>
                        <Col>
                            <h5 className="text-success">Selected Employee Details</h5>
                            <p><strong>Department:</strong> {view.Department}</p>
                            <p><strong>Employee Code:</strong> {view.EmployeeCode}</p>
                            <p><strong>Employee Name:</strong> {view.EmployeeName}</p>
                            <p><strong>Salary:</strong> {view.salary}</p>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
}

export default Task;
