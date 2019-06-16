export function getTokenFromStorage (key) {
    if(! key)
    {
        return null;
    }
    try {
        const token = localStorage.getItem(key);
        if(token)
        {
            return JSON.parse(token);
        }
        return null;
    } catch (error) {
        return null;
    }
}

export function setTokenInStorage (key, token) {
    if(!key)
    {
        console.log("Error: key is missing");
    }
    try {
        localStorage.setItem(key, JSON.stringify(token));
    } catch (error) {
        console.log(error);
    }
}