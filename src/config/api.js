export const API_DOMAIN = "https://newsapi.org/v2/top-headlines"
export const API_KEY = "cd45ba31a79643279ed00e0353545c72"
export const endpointPath = (country, category, page, pageSize) =>
    `${API_DOMAIN}?country=${country}&category=${category}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`;
