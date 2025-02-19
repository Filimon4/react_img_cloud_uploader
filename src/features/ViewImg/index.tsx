import React from 'react'
import cn from 'classnames'

import styles from "./ViewImg.module.scss";
import PreviewImgEntity from '@entities/PreviewImgEntity';
import { useAppDispatch, useAppSelector } from '@shared/lib/store/hooks/reduxTypesHooks';
import { imgSelectedActions } from '@shared/lib/store/slices/ImgSelectedSlice';

// TODO: исплоьзовать useOptimistic для выюеления больших картинок
const ViewImg = () => {
  const {loadedImgs, selectedImgs} = useAppSelector(state => state.imgSelected)
  const {addSelectedImg, removeSelectedImg} = imgSelectedActions
  const dispatch = useAppDispatch()

  console.log(selectedImgs)

  const onSelecteClick = (id: number) => {
    if (selectedImgs.includes(id)) {
      dispatch(removeSelectedImg([id]))
    } else {
      dispatch(addSelectedImg(id))
    }
  }

  return (
    <div className={styles.loader_subject_grid}>
      {loadedImgs.map((file, indx) => (
        <div key={indx} onClick={e => onSelecteClick(indx)} className={cn({[styles.subject_grid_unit_active]: selectedImgs.includes(indx)})}>
          <PreviewImgEntity file={file} />
        </div>
      ))}
    </div>
  )
}

export default ViewImg