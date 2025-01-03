import { API_ENDPOINTS } from "@/constants/api"
import { SubmitRequest, User } from "@/types/global.type";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FilterParams {
    pageSize?: string;
    current?: string;
    search?: string;
    orderAscBy?: string;
    orderDescBy?: string;
}

export const getAllTests = async (filterParams: FilterParams) => {
    const queryString = new URLSearchParams(filterParams as Record<string, string>).toString();
    const url = queryString ? `${API_ENDPOINTS.TESTS}?${queryString}` : `${API_ENDPOINTS.TESTS}?pageSize=999`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response;
    } catch (error) {
        console.error('Error fetching tests:', error);
        throw error; // Có thể xử lý lỗi theo cách bạn muốn
    }
}

export const getAllTestQuestions = async (testId: string) => {
    const url = `${API_ENDPOINTS.TESTS}/${testId}/full-test`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error; // Có thể xử lý lỗi theo cách bạn muốn
    }
}

export const submitTest = async (test: SubmitRequest) => {
    const url = `${API_ENDPOINTS.TESTS}/submit`;
    try {
        const userData = await AsyncStorage.getItem('userInfo');
        if (!userData) throw new Error('User data not found');
        const user: User = await JSON.parse(userData);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(test),
            mode: 'cors'
        })
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return response;
    } catch (error) {
        console.error('Error submit questions:', error);
        throw error; // Có thể xử lý lỗi theo cách bạn muốn
    }
}