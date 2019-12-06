import React from "react";
import styled from "@emotion/styled";

// const Container = styled.div`
//     width: 100%;
//     height: 100%;
//     margin: 0;
// `;

export default ({ handleChange, trainerName }) => {
    console.log(trainerName);
    return (
        <div>
            <h1>Welcome to Poké Battle!</h1>
            <h2>Please enter your name:</h2>
            <input
                type="text"
                name="trainerName"
                placeholder="Your name"
                onChange={e => handleChange(e)}
                value={trainerName}
            />
            <h3
                onClick={() => {
                    trainerName !== ""
                        ? console.log("I'm good to move on")
                        : console.log("No name, no game");
                }}
            >
                Go!
            </h3>
        </div>
    );
};
