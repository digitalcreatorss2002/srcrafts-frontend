const API_BASE_URL = process.env.NEXT_PUBLIC_API_URI;

export async function apiFetcher(endPoint, options = {})
{
    const url = `${API_BASE_URL }${endPoint }`;

    // 1. Initial Fetch Attempt
    let response; 
    try{
        response = await fetch(url,options);
    }
    catch (error){
        // 2. Network/DNS Error Handling (e.g., server offline, no internet)
        console.error(`Network or fetch error for ${endPoint}:`,error);
        throw new Error('Network error, could not connect to the API.');
    }

    // 3. Status Code and Error Handling (SRP)
    if(!response.ok){
        let errorDetail = `API call failed for ${endPoint}`

        switch (response.status) {
            case 404:
              errorDetail = `Resource not found at ${endPoint}.`;
              break;
            case 401:
            case 403:
              errorDetail = 'Authentication or permission denied.';
              break;
            case 429:
              // 4. Basic Rate Limiting Handling (429 Too Many Requests)
              console.warn(`Rate limit hit for ${endPoint}. Retry later.`);
              // For production, you might want to return an empty set or a cached response here.
              errorDetail = 'Too many requests. Please try again shortly.';
              break;
            case 500:
              errorDetail = 'Internal server error. The API failed to process the request.';
              break;
        }

        try{
            console.log("hello");
            const errorData = await response.json();
            errorDetail = errorData.message || errorDetail;
        }
        catch{
            console.log(`JSON error `)
        }
        const customError = new Error(errorDetail);
        customError.status = response.status;
        throw customError;
    }
    // 5. Successful Response
    try {
        return await response.json();
    } catch (error) {
        throw new Error('Invalid data format recieve from API');
    }
}