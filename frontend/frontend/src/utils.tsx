 export const getData = async (param: string) => {
     const url = `http://localhost:3001/api${param}`;
     const response = await fetch(url);
     return await response.json();
}
