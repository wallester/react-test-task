import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { RecipesPage } from './pages/recipes/RecipesPage';
import { RecipeDetailsPage } from './pages/recipe-details/RecipeDetailsPage';
import styles from './App.module.scss';

export function App() {
  return (
    <Router>
      <div className={styles.app}>
        <header className={styles.header}>
          <div className={styles.brand}>Recipes Explorer</div>
        </header>

        <main className={styles.main}>
          <Switch>
            <Route exact path="/recipes" component={RecipesPage} />
            <Route exact path="/recipes/:id" component={RecipeDetailsPage} />
            <Redirect to="/recipes" />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
