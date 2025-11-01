// src/utils/media.js
export const toImageUrl = (imgPath = "") => {
    if (!imgPath) return "";

    if (/^https?:\/\//i.test(imgPath)) return imgPath;

    const base = (import.meta.env.VITE_API_URL || "http://localhost:4000/api")
    .replace(/\/api\/?$/, "");

    if (imgPath.startsWith("/images/")) {
    return base + imgPath;
    }

    if (imgPath.startsWith("images/")) {
    return base + "/" + imgPath;
    }

    let p = imgPath.startsWith("/") ? imgPath.slice(1) : imgPath;
    return base + "/public/" + p;
};
