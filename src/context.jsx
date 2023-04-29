import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'

const AppContext = React.createContext()

const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
//const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState([])
  const [meals, setMeals] = useState([])
  const [selectedMeal, setSelectedMeal] = useState(null)

  const [showModal, setShowModal] = useState(false)

  const selectMeal = (idMeal, favoriteMeal) => {
    let meal
    meal = meals.find((meal) => meal.idMeal === idMeal)
    setSelectedMeal(meal)
    setShowModal(true)
  }

  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const { data } = await axios.get(url)
      setMeals(data.meals)
    } catch (e) {
      console.error(e.response)
    }
    setLoading(false)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    fetchMeals(allMealsUrl)
  }, [])

  return (
    <AppContext.Provider
      value={{
        closeModal,
        selectedMeal,
        selectMeal,
        showModal,
        loading,
        meals,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
