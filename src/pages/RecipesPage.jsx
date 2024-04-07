import { useState, useEffect } from "react";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Search from "../features/Search.jsx";

import { fetchAllMeals } from "../services/index.js";

function RecipesPage() {
  const [meals, setMeals] = useState([]);
  const [filteredMeals, setFilteredMeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mealsData = await fetchAllMeals();
        if (!mealsData || mealsData.length === 0) {
          console.log("No meals found");
        }
        setMeals(mealsData);
        setFilteredMeals(mealsData);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (query) => {
    const filtered = meals.filter(
      (meal) =>
        meal.name.toLowerCase().includes(query.toLowerCase()) ||
        meal.category.some((category) =>
          category.toLowerCase().includes(query.toLowerCase())
        )
    );
    setFilteredMeals(filtered);
  };

  return (
    <>
      <Header />
      <div className="mb-12 text-orange-800">
        <Search onSearch={handleSearch} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredMeals.length === 0 ? (
            <p>Nincs recept találat</p>
          ) : (
            filteredMeals.map((meal) => (
              <div
                key={meal.id}
                className="border rounded-lg overflow-hidden shadow-lg p-2"
              >
                <div className="p-2">
                  <h3 className="text-lg font-bold mb-4">{meal.name}</h3>
                  <p className="text-sm mb-2">
                    {meal.category.map((category, index) => (
                      <span key={index} className="bg-orange-100 mt-4 px-3 py-1 mr-2 mb-2 rounded-full text-orange-800">
                        {category}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RecipesPage;
