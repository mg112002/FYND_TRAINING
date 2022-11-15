
const ajax = async (url, method, reqBody, queryString = '', headers = {}) => {
    let options = {};

    if (queryString) {
        const searchParams = new URLSearchParams(queryString)
        url = url + '?' + searchParams
    }

    if (reqBody) {
        options = {
            ...options,
            body: JSON.stringify(reqBody),
        }
    }

    if (headers) {
        options = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        }
    }
    const response = await fetch(
        url,
        {
            method: method,
            ...options
        }
    );

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    const data = await response.json()
    return data
}

export {
    ajax as default
}