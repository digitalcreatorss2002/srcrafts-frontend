// src/utils/nextApiFetch.js

/**
 * @description Dedicated utility for making requests to internal Next.js API Routes (e.g., /api/user).
 * Single Responsibility: Ensuring communication stays within the Next.js application server.
 * * @param {string} endpoint - The path to the internal Next.js API endpoint (e.g., '/api/auth/session').
 * @param {object} options - Standard fetch options (method, body, headers).
 * @returns {Promise<object>} The parsed JSON response.
 */
export async function nextApiFetch(endpoint, options = {}) {
    
    // ⚠️ IMPORTANT: No need for BASE_URL. Requests use relative path, 
    // ensuring they hit the current Next.js server.
    const url = endpoint; 
    
    // Default headers, crucial for POST/DELETE requests
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    // Merge provided options with defaults
    const config = {
        // By default, credentials are included for same-origin requests, 
        // which helps in sending the HTTP-only cookie back to the API route.
        credentials: 'include', 
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        // Use native fetch
        const response = await fetch(url, config);

        // --- Error Handling ---
        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch (e) {
                errorData = { message: response.statusText };
            }

            // Throw standardized error
            const error = new Error(errorData.message || `Internal API Error: ${response.status}`);
            error.status = response.status;
            error.data = errorData;
            
            throw error;
        }

        if (response.status === 204) {
            return {};
        }

        // Successfully parse and return the JSON data
        return response.json();

    } catch (error) {
        console.error(`Error fetching internal API ${url}:`, error);
        throw error;
    }
}