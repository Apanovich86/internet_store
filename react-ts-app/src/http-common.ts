import axios from "axios";

export default axios.create({
    baseURL: "https://java-postgresql-internet-store.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});