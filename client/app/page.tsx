"use client"
import React, { useEffect, useState } from 'react';
import Login from "./user/login";


function page() {

  const [message, setMessage] = useState("Loading");
  const [people, setPeople] =useState([]);

  useEffect(()=>{
    fetch("http://localhost:8080/users").then(
      response => response.json() 
    ).then(
      data =>{
        console.log(`ver json  client::: ${JSON.stringify(data)}`);
        setMessage(data);
        //setPeople(data.people);
      }
    )
  }, [])

  return (
    <div>
    <div>
      {JSON.stringify(message)}
    </div>
      
        <Login/>

    </div>
  )
}

export default page