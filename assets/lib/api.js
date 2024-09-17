const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Substitua pela sua URL base
  withCredentials: true, // Garante o envio de cookies HttpOnly nas requisições
});

export { axiosInstance };
