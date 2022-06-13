/* eslint-disable */


import Axios from "axios";


/**
 * We use axios to create REST calls to our backend
 *
 * We have provided the login rest call for your
 * reference to build other rest calls with.
 *
 * This is an async function. Which means calling this function requires that
 * you "chain" it with a .then() function call.
 * <br>
 * What this means is when the function is called it will essentially do it "in
 * another thread" and when the action is done being executed it will do
 * whatever the logic in your ".then()" function you chained to it
 * @example
 * login(request)
 * .then(response => alert(JSON.stringify(response.data, null, 2)));
 */
export async function login(loginRequest) {
    const requestBody = {
        email: loginRequest.email,
        password: loginRequest.password
    };

    const options = {
        method: "POST", // Method type ("POST", "GET", "DELETE", ect)
        baseURL: "http://10.0.2.2:8081", // Base URL (localhost:8081 for example)
        url: "/login", // Path of URL ("/login")
        data: requestBody // Data to send in Body (The RequestBody to send)
    }

    return Axios.request(options);
}

export async function register(registerRequest) {
    const requestBody = {
        email: registerRequest.email,
        password: registerRequest.password
    };

    const options = {
        method: "POST",
        baseURL: "http://10.0.2.2:8081",
        url: "/register", // Path of URL ("/register")
        data: requestBody
    }

    return Axios.request(options);
}

