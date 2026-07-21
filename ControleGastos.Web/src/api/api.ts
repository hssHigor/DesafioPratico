import axios from "axios";

// Instância centralizada do Axios para concentrar a comunicação com a API.
const api = axios.create({
  baseURL: "http://localhost:5092/api",
});

export default api;