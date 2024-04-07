const JSON_FILE_PATH = 'https://raw.githubusercontent.com/visontail/food-planner-dummy/main/data/receptek.json';

/**
 * Fetches data from the local JSON file using the Fetch API.
 * @returns {Promise<Array>} A promise that resolves to an array of meals.
 * @throws {Error} If there is an error fetching the file or parsing JSON.
 */
const fetchLocalJSONFile = async (filePath) => {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching local JSON file:', error);
        throw error;
    }
};

fetchLocalJSONFile(JSON_FILE_PATH).then(data => console.log(data));

/**
 * Fetches all categories from the local JSON file.
 * @returns {Promise<Array>} A promise that resolves to an array of categories.
 * @throws {Error} If there is an error fetching the categories.
 */
export const fetchCategories = async () => {
    try {
        const meals = await fetchLocalJSONFile(JSON_FILE_PATH);
        // Extracting unique categories from meals
        const categories = [...new Set(meals.map(meal => meal.category).flat())];
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

/**
 * Fetches meals within specified categories and number from the local JSON file.
 * @param {number} num - The number of meals to fetch.
 * @param {Array<string>} categories - An array of category names.
 * @returns {Promise<Array>} A promise that resolves to an array of meals.
 * @throws {Error} If there is an error fetching the meals.
 */
export const fetchMealsWithinCategories = async (num, categories) => {
    try {
        const meals = await fetchLocalJSONFile(JSON_FILE_PATH);
        // Filtering meals based on categories
        const filteredMeals = meals.filter(meal => categories.some(category => meal.category.includes(category)));
        // Limiting the number of meals
        const selectedMeals = filteredMeals.slice(0, num);
        return selectedMeals;
    } catch (error) {
        console.error('Error fetching meals:', error);
        throw error;
    }
};

/**
 * Fetches all meals from the local JSON file.
 * @returns {Promise<Array>} A promise that resolves to an array of meals.
 * @throws {Error} If there is an error fetching the meals.
 */
export const fetchAllMeals = async () => {
    try {
        return await fetchLocalJSONFile(JSON_FILE_PATH);
    } catch (error) {
        console.error('Error fetching meals:', error);
        throw error;
    }
};
