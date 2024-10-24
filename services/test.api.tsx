export const fetchAllTests = async () => {
    try {
        const response = await fetch('https://toeic-practice-hze3cbbff4ctd8ce.southeastasia-01.azurewebsites.net/api/v1/tests');
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        return data.data.result;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
}