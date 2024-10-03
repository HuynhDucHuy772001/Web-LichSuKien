export const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getHardToken = () => {
    return { Authorization: `Bearer ${process.env.REACT_APP_HARD_TOKEN}` };
};