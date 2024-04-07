import { useState, useEffect } from 'react';
import { fetchCategories, fetchMealsWithinCategories } from '../services/index.js';

function Generator() {

    const [meals, setMeals] = useState([]);
    const [categories, setCategories] = useState([]);
    const [numberOfMeals, setNumberOfMeals] = useState(3);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await fetchCategories();
                if (!categoriesData || categoriesData.length === 0) {
                    console.log('No categories found');
                }
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchData();
    }, []);

    function selectItem(category) {
      if (selectedCategories.includes(category)) {
          setSelectedCategories(selectedCategories.filter((item) => item !== category));
      } else {
          setSelectedCategories([...selectedCategories, category]);
      }
  }

    function changeNumberOfMeals(number) {
        setNumberOfMeals(number);
    }

  // fetch data from backend
  const getMeal = async (numberOfMeals, selectedCategories, categories) => {
    try {
      // if no number of meals is selected, default to 3
      if (!numberOfMeals || numberOfMeals === "") {
        numberOfMeals = 3;
      }
      // if no categories are selected, default to all categories
      if (!selectedCategories || selectedCategories.length === 0) {
        selectedCategories = categories;
      }
      const responseMealsWithinCategories = await fetchMealsWithinCategories(numberOfMeals, selectedCategories);
      if (!responseMealsWithinCategories || responseMealsWithinCategories === "") {
        console.error("Failed to fetch meals");
      }
      setMeals(responseMealsWithinCategories);
      setSelectedCategories(['']);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="shadow-2xl rounded-[20px] p-4 mx-6 mb-10 min-w-fit bg-orange-100">
      <h2 className="text-2xl font-semibold text-orange-800 flex justify-center my-10">Mi legyen a Heti Menü?</h2>
      <div className="p-4">
      <p className="text-orange-700 mb-4">Válaszd ki a kívánt kategóriákat</p>
      <ul className="flex flex-wrap gap-2 m-4">
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category, index) => (
            <li
            className={`px-2 py-1 rounded-full cursor-pointer ${selectedCategories.includes(category) ? 'bg-orange-300 text-white' : 'text-orange-800 hover:bg-orange-200 hover:text-white'}`}
              key={index}
              onClick={() => selectItem(category)}
            >
              {category}
            </li>
          ))
        ) : (
          <p className="text-orange-800">Nem talált kategóriákat</p>
        )}
      </ul>
      <p className="text-orange-700 mb-4">Válaszd ki az ételek számát</p>
      <select
        className="bg-orange-300 text-white py-2 px-4 ml-8 rounded-2xl border-r  mr-10"
        onChange={(e) => changeNumberOfMeals(e.target.value)}
      >
        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
      <button
        className="flex m-10 ml-auto bg-orange-300 text-white py-2 px-4 rounded-2xl border-r hover:bg-orange-400 hover:text-white cursor-pointer"
        onClick={() => getMeal(numberOfMeals, selectedCategories, categories)}
      >
        Generálás
      </button>
      </div>
      <hr className="my-6 border-orange-800" />
      <div className="my-10">
        <h2 className="text-2xl font-semibold text-orange-800 flex justify-center">
          Ételek
        </h2>
        <ul className="list-none p-0 mt-4">
          {meals.length === 0 ? (
            <p className="text-orange-800 flex justify-center">
              Nem talált ételeket
            </p>
          ) : (
            meals.map((meal, index) => (
                <p key={index}
                    className="flex justify-center text-base text-orange-800 font-medium py-2 px-4  hover:bg-orange-100 hover:text-hover-orange rounded-2xl cursor-pointer"
                  >
                    {meal.name}
                  </p>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Generator;
