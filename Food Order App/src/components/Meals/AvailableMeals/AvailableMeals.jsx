import React from 'react';

import { DUMMY_MEALS } from '../../../assets/dummy-meals.js';

import Card from '../../UI/Card/Card.jsx';
import classes from './AvailableMeals.module.css';

import MealItem from '../../Meals/MealItem/MealItem.jsx';

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem key={meal.id} meal={meal}></MealItem>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
