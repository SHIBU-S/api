import React,{ useEffect, useState } from "react";


function Api()
{
    const [result,setresult] = useState([]);
    const [inputvalue,setinputvalue] = useState("");

    function fetchingdatas(){
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((data)=> { return data.json() } )
        .then((display)=> { setresult(display) })
    }

    useEffect(()=>{fetchingdatas()},[])

    const search = () => {
        const searchedValue = inputvalue.toLowerCase();
        const filter = result.filter((user) =>
          user.name.toLowerCase().includes(searchedValue) ||
          user.username.toLowerCase().includes(searchedValue) ||
          user.email.toLowerCase().includes(searchedValue)
        );
        setresult(filter);
      };

    function filter(){
        const filteredvalue = inputvalue.toLowerCase();
        const filter = result.filter((fil)=>fil.name.toLowerCase()===filteredvalue);
        setresult(filter);
    }

    return(
        <>
            <h2>API(Application Programming Interface)</h2>
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

<br /><br />

            <div>
                Enter Value : <input type="text" onChange={(e)=>setinputvalue(e.target.value)} />
                    <button onClick={search}>Search</button>
                Enter Value : <input type="text" onChange={(e)=>setinputvalue(e.target.value)} />
                    <button onClick={filter}>Filter</button>
            </div>
        </>
    )
}

export default Api;


