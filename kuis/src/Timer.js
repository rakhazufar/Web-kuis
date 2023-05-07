// import * as React from 'react'

// function Timer({timer, setTimer}) {
//     const Ref = React.useRef(null);
    

//     const getTimeRemaining = (e) => {
//         const total = Date.parse(e) - Date.parse(new Date());
//         const seconds = Math.floor((total / 1000) % 60);
//         const minutes = Math.floor((total / 1000 / 60) % 60);
//         const hours = Math.floor((total / 1000 / 60 / 60) % 24);
//         return {
//             total, hours, minutes, seconds
//         };
//     }
  
  
//     const startTimer = (e) => {
//         let { total, hours, minutes, seconds } 
//                     = getTimeRemaining(e);
//         if (total >= 0) {
//             setTimer(
//                 (hours > 9 ? hours : '0' + hours) + ':' +
//                 (minutes > 9 ? minutes : '0' + minutes) + ':'
//                 + (seconds > 9 ? seconds : '0' + seconds)
//             )
//         }
//     }
  
  
//     const clearTimer = (e) => {
//         setTimer('00:05:00');
//         if (Ref.current) clearInterval(Ref.current);
//         const id = setInterval(() => {
//             startTimer(e);
//         }, 1000)
//         Ref.current = id;
//     }
  
//     const getDeadTime = () => {
//         let deadline = new Date();
//         deadline.setSeconds(deadline.getSeconds() + 60*5);
//         return deadline;
//     }

//     React.useEffect(() => {
//         clearTimer(getDeadTime());
//     }, []);
//     const onClickReset = () => {
//         clearTimer(getDeadTime());
//     }
  
//     return (
//         <div className="Timer">
//             <h2>Waktu: {timer}</h2>
//             <button onClick={onClickReset}>Reset</button>
//         </div>
//     )
// }

// export default Timer

import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const Timer = ({ delayResend = "120" }) => {
  const [delay, setDelay] = useState(+delayResend);
  const minutes = Math.floor(delay / 60);
  const seconds = Math.floor(delay % 60);
  useEffect(() => {
    const timer = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);

    if (delay === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <>
      <Typography>
        {minutes}:{seconds}
      </Typography>
    </>
  );
};

export default Timer;