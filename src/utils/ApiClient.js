const baseUrl = "http://localhost:5000";

const http = {
  post: async (url, body, headers) => {
    return await fetch(baseUrl + url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
    });
  },
};

export const loginUser = async (user) => {
  try {
    const result = await http.post("/login", { ...user });
    const { access_token, refresh_token } = await result.json();
    if (!!access_token && !!refresh_token) {
      localStorage.setItem("token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      return access_token;
    } else {
      throw new Error("Login Failed");
    }
  } catch (ex) {
    throw ex;
  }
};

export const registerUser = async (user) => {
  try {
    const result = await http.post("/register", { ...user });
    const { details, message } = await result.json();
    if (!!details) {
      return details;
    } else {
      throw new Error(message);
    }
  } catch (ex) {
    throw ex;
  }
};

export const refreshToken = async () => {
  try {
    const result = await http.post("/refresh", null, {
      Authorization: localStorage.getItem("refresh_token"),
    });

    const { access_token } = await result.json();
    if (!!access_token) {
      localStorage.setItem("token", access_token);
    } else {
      throw new Error("Session Timeout");
    }
  } catch (ex) {
    throw ex;
  }
};
