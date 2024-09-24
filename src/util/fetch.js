const BASE_URL = "http://localhost:8080/api"

function createUserData (id, name) { 
    return {id, name};
}

function createExtendTranscriptData(id, userId, userName, year, semester) {
    return {id, userId, userName, year, semester};
}

function createExtendSubjectData (id, userName, year, semester, subjectName, subjectCode) { 
    return {id, userName, year, semester, subjectName, subjectCode}
}

const searchRequestOption = (value) => {
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
           'pageNo': value,
           'pageSize' : 7
        })
    }
}

async function fetchUserById(value) {
    try {
        const response = await fetch( BASE_URL + `/user/${value}`);
        if (!response.ok) {
            throw new Error("Fail to find user by id: " + value);
        }
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (e) {
        throw e;
    }
}

async function fetchTranscriptById(value) {
    try {
        const response = await fetch( BASE_URL + `/transcript/${value}`);
        if (!response.ok) {
            throw new Error("Fail to find transcript by id: " + value);
        }
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (e) {
        throw e;
    }
}

async function fetchSubjectTypeById(value) {
    try {
        const response = await fetch( BASE_URL + `/subjecttype/id/${value}`);
        if (!response.ok) {
            throw new Error("Fail to find subject type by id: " + value);
        }
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (e) {
        throw e;
    }
}

export async function fetchSearchUser({value, page}) {
    try {        
        if (value == null) value = "";
        const response = await fetch(`${BASE_URL}/user/search?name=${value}`, searchRequestOption(page));
        if (!response.ok) {
            throw new Error("Fail to search user");
        }
        const retrieveData = await response.json();
        const data = retrieveData.content
        const pageSize = retrieveData.totalPages
        console.log(data);
        return {data, pageSize};
    } catch (e) {
        throw e;
    }
}

export async function fetchSearchTranscript({key, name, semester, year, page}) {
    try {        
        if (key == null) key = "";
        const response = await fetch(`${BASE_URL}/transcript/search?key=${key}&name=${name}&semester=${semester}&year=${year}`, searchRequestOption(page));
        if (!response.ok) {
            throw new Error("Fail to search transcript");
        }
        const retrieveData = await response.json();
        const data = retrieveData.content;
        let res = [];
        if (data) {
            await Promise.all(
                data.map(async (transcript) => {
                    const user = await fetchUserById(transcript.userId);
                    res.push(createExtendTranscriptData(
                        transcript.id, 
                        transcript.userId,
                        user.name,
                        transcript.year,
                        transcript.semester
                    ));
                })
            ) 
        }
        const pageSize = retrieveData.totalPages;
        console.log(res);
        return {res, pageSize};
    } catch (e) {
        throw e;
    }
}

export async function fetchSearchSubjectType({key, name, code, page}) {
    try {        
        if (key == null) key = "";
        const response = await fetch(`${BASE_URL}/subjecttype/search?key=${key}&name=${name}&code=${code}`, searchRequestOption(page));
        if (!response.ok) {
            throw new Error("Fail to search subject type");
        }
        const retrieveData = await response.json();
        const data = retrieveData.content
        const pageSize = retrieveData.totalPages
        console.log(data);
        return {data, pageSize};
    } catch (e) {
        throw e;
    }
}

export async function fetchSearchSubject({key, name, semester, year, subjectname, subjectcode, page}) {
    try {        
        if (key == null) key = "";
        const response = await fetch(`${BASE_URL}/subject/search/v2?key=${key}&name=${name}&year=${year}&semester=${semester}&subjectcode=${subjectcode}&subjectname=${subjectname}`, searchRequestOption(page));
        if (!response.ok) {
            throw new Error("Fail to search subject");
        }
        const retrieveData = await response.json();
        const data = retrieveData.content;
        let res = [];
        if (data) {
            await Promise.all(
                data.map(async (subject) => {
                    const transcript = await fetchTranscriptById(subject.transcriptId);
                    const subjecttype = await fetchSubjectTypeById(subject.subjectTypeId);
                    const user = await fetchUserById(transcript.userId);
                    res.push(createExtendSubjectData(
                        subject.id, 
                        user.name,
                        transcript.year,
                        transcript.semester,
                        subjecttype.name,
                        subjecttype.code
                    ));
                })
            ) 
        }
        const pageSize = retrieveData.totalPages;
        console.log(res);
        return {res, pageSize};
    } catch (e) {
        throw e;
    }
}