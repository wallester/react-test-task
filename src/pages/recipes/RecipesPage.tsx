import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Menu, { Item as MenuItem } from 'rc-menu';
import Dropdown from 'rc-dropdown';
import clsx from 'clsx';
import debounce from 'lodash/debounce';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { StatusBlock } from '@/shared/ui/StatusBlock/StatusBlock';
import { loadRecipes, recipesActions, selectVisibleRecipes } from './recipesSlice';

import styles from './RecipesPage.module.scss';
import 'rc-menu/assets/index.css';

export function RecipesPage() {
  const dispatch = useAppDispatch();
  const { status, error, page, pageSize, total, query } = useAppSelector((s) => s.recipes);
  const items = useAppSelector(selectVisibleRecipes);

  useEffect(() => {
    dispatch(loadRecipes());
  }, [dispatch, page, pageSize]);

  // NOTE: debouncedSetQuery is here, but re-fetch and URL sync are intentionally left as interview challenges.
  const debouncedSetQuery = useMemo(
    () => debounce((value: string) => dispatch(recipesActions.setQuery(value)), 300),
    [dispatch],
  );

  useEffect(() => () => debouncedSetQuery.cancel(), [debouncedSetQuery]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const sortMenu = (
    <Menu
      onSelect={() => {
        // Intentionally a no-op.
        // Interview challenge: implement sorting via API or client-side.
      }}
    >
      <MenuItem key="name:asc">Name ↑ (TODO)</MenuItem>
      <MenuItem key="name:desc">Name ↓ (TODO)</MenuItem>
    </Menu>
  );

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <input
          className={styles.search}
          defaultValue={query}
          placeholder="Search recipes…"
          onChange={(e) => {
            // Intentionally does NOT trigger re-fetch. Candidate decides behavior.
            debouncedSetQuery(e.target.value);
          }}
        />

        <Dropdown overlay={sortMenu} trigger={['click']}>
          <button className={styles.sortBtn} type="button">
            Sort (TODO)
          </button>
        </Dropdown>
      </div>

      {status === 'loading' && (
        <StatusBlock variant="loading" title="Loading" description="Fetching recipes…" />
      )}

      {status === 'failed' && (
        <StatusBlock
          variant="error"
          title="Error"
          description={error ?? 'Something went wrong'}
          action={
            <button type="button" onClick={() => dispatch(loadRecipes())}>
              Retry
            </button>
          }
        />
      )}

      {status === 'succeeded' && items.length === 0 && (
        <StatusBlock variant="empty" title="No results" description="Try another search query." />
      )}

      {status === 'succeeded' && items.length > 0 && (
        <>
          <ul className={styles.grid}>
            {items.map((r) => (
              <li key={r.id} className={clsx(styles.card)}>
                <Link to={`/recipes/${r.id}`} className={styles.cardLink}>
                  <img className={styles.image} src={r.image} alt={r.name} loading="lazy" />
                  <div className={styles.name}>{r.name}</div>
                </Link>
              </li>
            ))}
          </ul>

          <div className={styles.pager}>
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => dispatch(recipesActions.setPage(page - 1))}
            >
              Prev
            </button>
            <span className={styles.pageInfo}>
              {page} / {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => dispatch(recipesActions.setPage(page + 1))}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
