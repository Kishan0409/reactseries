 // Q1. HELLO COMPONENT

//  import React from "react";
 
//  const App =  () => {

//     return (
//       <>
      
//         <h1>Hello componrnt</h1>
      
//       </>
//     )

//  }
//  export default App;


// Q2. MAKE A COUNTER APP THAT IS INCREMENT , DECREMENT AND RESET ??
//   import React, { useState } from 'react';
//   const App = () => {
//   const[count , setCount] = useState(0);

//   const Inc = () => {
//     setCount(count + 1);
//   }

//     return (
//         <>
//       <h2>Count:{count}</h2>
//       <button onClick={Inc}>INCREMENT</button>
//        <button onClick={() =>count>0 && setCount(count -1)}>DECREMENT</button>
//         <button onClick={() => setCount(0)}>RESET</button>

//         </>
//     )
//   }
//   export default App;
//   Q3 . PROPS EXAMPLE ??
// import React from 'react';

// const App = ({name , age}) => {
//     return (
//         <>

//    <h2> my name is { name } and age is {age}</h2>  



//         </>
//     )
// }

// const child = () => {
//     return <App name="kishan" age={27}></App>

// };
// export default child;
  
// Q4.. Conditional Rendering ??

// import React, { useState } from 'react'

// const App = () => {
//     const[isloggedin , setloggedin] = useState(false);

//   const btn = () => {
//     setloggedin(!isloggedin);

//   }


//     return (
//         <>
//          <div>
//         {isloggedin ? <h2>Welcome User </h2> : <h2>please Login</h2>}
//       <button onClick={btn}> 
//         {isloggedin ? "logout" : "login"};
//       </button>
  

//          </div>
//         </>
//     )
// }
// export default App;
import React, { useState } from "react"
const users = [
   { id :1,
    name:"kishan",
    age : 28},
    {
        id:2,
        name:"janesh",
        age: 25
    },
    {
        id:3,
        name:"aman",
        age:20
    },
    {
        id:4,
        name:"amit",
        age:29
    }

]

const App = () => {
    const[search , setSearch] = useState("")



const filterUser = users.filter((user) => 
    user.name.toLowerCase().includes(search.toLowerCase())
);

const getval = (e) => {
  setSearch(e.target.value);
}

    return (
        <>
        <h2>User List</h2>  
        <input type="text" placeholder="search by name" value={search} onChange={getval}/>
        <ul>
         {filterUser.length > 0 ? (
            filterUser.map((user) => (
                <li key={user.id}>

                    {user.name} - {user.age} years old 
                </li>
            ))
             ) : (<li>No user found</li>)} 
        </ul>
        </>
    )

}
export default App;