// TODO: Set the base URL for your API

const BASE_URL = "http://bvrithcloud.com";

export const get = async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`,{
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            "x-student-id":"23WH1A0528" 
        }
    });

    return response.json();
}