export const API_URL = import.meta.env.VITE_API_URL || "https://embedaiot-embedaiot-api.hf.space";

export const getImgUrl = (path) => {
    if (!path) return "/placeholder.png";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/uploads/")) return `${API_URL}${path}`;
    if (path.startsWith("uploads/")) return `${API_URL}/${path}`;
    if (path.startsWith("/")) return `${API_URL}/uploads${path}`;
    return `${API_URL}/uploads/${path}`;
};
