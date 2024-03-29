import React from "react";
import { SERVER_URL } from "./constant";


interface CarFormProps {
    handleClick: () => void;
}

function CarForm({ handleClick }: CarFormProps) {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const formJson = Object.fromEntries(formData.entries());

        const requestOptions: RequestInit = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formJson),
            credentials: 'include'
        };

        fetch(
            SERVER_URL + '/car',
            requestOptions
        ).then(async response => {
            if (!response.ok) {
                console.log("Error happened");
            }

            handleClick();
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="brand" placeholder="Enter car brand"></input>
            <input name="model" placeholder="Enter car model"></input>
            <input name="year" placeholder="Enter car year"></input>
            <button type="submit">Add car</button>
        </form>
    );
}

export default CarForm;
