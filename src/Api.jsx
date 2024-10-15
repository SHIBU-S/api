import React,{ useEffect, useState } from "react";


function Api()
{
    const [result,setresult] = useState([]);

    function fetchingdatas(){
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((data)=> { return data.json() } )
        .then((display)=> { setresult(display) })
    }

    useEffect(()=>{fetchingdatas()},[]
    )

    return(
        <>
           <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>USERNAME</th>
                        <th>EMAIL</th>
                    </tr>
                </thead>

                <tbody>
                    {result.map((res)=>(
                        <tr>
                            <td>{res.id}</td>
                            <td>{res.name}</td>
                            <td>{res.username}</td>
                            <td>{res.email}</td>
                        </tr>
                    ))}
                </tbody>
           </table>

        </>
    )
}

export default Api;