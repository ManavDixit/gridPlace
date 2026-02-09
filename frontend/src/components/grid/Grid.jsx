import React, { use } from "react";
import "./Grid.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";
const rows = 18;
const cols = 18;
export const Grid = () => {
  const gridDataHandler = (newGridData) => {
    console.log("Received grid update:", newGridData);
    setGridData(newGridData);
  };
    useEffect(() => {
        const token = localStorage.getItem("token");
       console.log(token);
            fetch(`${import.meta.env.VITE_BACKEND_URL}/grid/getGridData`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": `${token}`,
                },
            })
                .then((res) => res.json())  
                .then((data) => {
                    if (data.success) {
                        setGridData(data.data);
                        setHasPlaced(data.hasPlaced);
                    }
                })
                .catch((err) => {
                    console.log(err);
                }
                );
        
    }, []);
useEffect(() => {
socket.on("gridUpdated", gridDataHandler);
        return () => {

            socket.off("gridUpdated", gridDataHandler);
        };
}, []);

    const [hasPlaced, setHasPlaced] = useState(false);
  const [gridData, setGridData] = useState(
    Array(18).fill(Array(18).fill({user:null,marked:false}))
  );

  const handleCellClick = (r, c) => {
    const newGridData = [...gridData];

    if(gridData[r][c] === 0 && !hasPlaced){
        newGridData[r][c] = 1;
        setHasPlaced(true);
    }
    fetch(`${import.meta.env.VITE_BACKEND_URL}/grid/markCell`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "token": `${localStorage.getItem("token")}`
        },
        body:JSON.stringify({row:r,col:c})
    }).then(res=>res.json()).then(data=>{
        if(data.success){
            setGridData(data.data);
            setHasPlaced(data.hasPlaced);
        }
    }).catch(err=>{
        console.log(err);
    }) ;


  };
  const navigate = useNavigate();
  return (
    <div className="grid">
      <div className="top-bar">
        <h2>GRID PLACE</h2>
        <div className="user-info">
          <span className="username">
            {localStorage.getItem("user").replaceAll('\"', "") || "Guest"}
          </span>
          <button
            className="logout-button"
            onClick={() => {
              localStorage.removeItem("token");
                localStorage.removeItem("user");
              navigate("/signin");
            }}>
            Logout
          </button>
        </div>
      </div>
      <div className="grid-cointaner">
        {Array.from({ length: rows }).map((_, r) =>
          Array.from({ length: cols }).map((_, c) => (
            <div
              key={`${r}-${c}`}
              className="cell"
              style={
                gridData[r][c].marked === true
                  ? { backgroundColor: "#4f46e5" }
                  : { backgroundColor: "#f3f4f6" }
              }
              title={gridData[r][c].user ? `Marked by ${gridData[r][c].user}` : "Unmarked"}
              onClick={() => handleCellClick(r, c)}
            />  
          
          )),
        )}
      </div>
    </div>
  );
};
