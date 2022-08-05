export const getProjectsByUser = async (token, userId) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/${userId}/projects`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.json();
};

export const createProject = async (token, data) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const login = async (data) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/tokens/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};

export const getUserMe = async (token) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const deleteProject = async (token, projectId) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/projects/${projectId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteTask = async (token, taskId) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/tasks/${taskId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const saveTask = async (token, data) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
