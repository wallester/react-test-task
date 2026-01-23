import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Dialog from 'rc-dialog';
import 'rc-dialog/assets/index.css';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { StatusBlock } from '@/shared/ui/StatusBlock/StatusBlock';
import { loadRecipeDetails, recipeDetailsActions } from './recipeDetailsSlice';

import styles from './RecipeDetailsPage.module.scss';

export function RecipeDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const recipeId = Number(id);

  const dispatch = useAppDispatch();
  const { item, status, error } = useAppSelector((s) => s.recipeDetails);

  const [showDialog, setShowDialog] = useState(true);

  useEffect(() => {
    if (!Number.isFinite(recipeId)) return;
    dispatch(loadRecipeDetails(recipeId));
    return () => {
      dispatch(recipeDetailsActions.clear());
    };
  }, [dispatch, recipeId]);

  const title = item?.name ?? `Recipe #${recipeId}`;

  return (
    <div className={styles.root}>
      <div className={styles.topbar}>
        <Link to="/recipes">← Back</Link>
        <button type="button" onClick={() => setShowDialog(true)}>
          Open details dialog
        </button>
      </div>

      {status === 'loading' && (
        <StatusBlock variant="loading" title="Loading" description="Fetching recipe…" />
      )}

      {status === 'failed' && (
        <StatusBlock
          variant="error"
          title="Error"
          description={error ?? 'Something went wrong'}
          action={
            <button type="button" onClick={() => dispatch(loadRecipeDetails(recipeId))}>
              Retry
            </button>
          }
        />
      )}

      {status === 'succeeded' && item && (
        <div className={styles.content}>
          <h1 className={styles.h1}>{title}</h1>
          {item.image && <img className={styles.hero} src={item.image} alt={title} />}
          <pre className={styles.pre}>{JSON.stringify(item, null, 2)}</pre>
        </div>
      )}

      <Dialog visible={showDialog} title={title} onClose={() => setShowDialog(false)} footer={null}>
        <div className={styles.dialogBody}>
          <div className={styles.dialogHint}>
            This dialog demonstrates rc-dialog usage. Styling is minimal.
          </div>
          {status === 'succeeded' && item ? (
            <div className={styles.dialogGrid}>
              {item.image && <img className={styles.dialogImage} src={item.image} alt={title} />}
              <div>
                <div>
                  <b>ID:</b> {item.id}
                </div>
                <div>
                  <b>Name:</b> {item.name}
                </div>
                <div className={styles.todo}>
                  TODO (interview extension): show ingredients nicely, add cropper flow, etc.
                </div>
              </div>
            </div>
          ) : (
            <div>Loading…</div>
          )}
        </div>
      </Dialog>
    </div>
  );
}
