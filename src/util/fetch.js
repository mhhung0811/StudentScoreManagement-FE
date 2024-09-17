const BASE_URL = "http://localhost:8080/api"

function createUserData (id, name) { 
    return {id, name};
}

const searchRequestOption = (value) => {
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
           'pageNo': value,
           'pageSize' : 5
        })
    }
}

export async function fetchSearchUser(value) {
    try {
        if (value == null) value = "";
        const response = await fetch(`${BASE_URL}/user/search?name=${value}`, searchRequestOption(0));
        if (!response.ok) {
            throw new Error("Fail to create subject");
        }
        const retrieveData = await response.json();
        console.log(retrieveData.content);
        return retrieveData.content;
    } catch (e) {
        throw e;
    }
}