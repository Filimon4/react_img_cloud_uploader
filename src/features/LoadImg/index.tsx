import React, { useEffect, useRef, useState } from 'react'
import useClickOutside from '@shared/hooks/useClickOutside'

import styles from "./dropdownmenu.module.scss";

import { TDropUnit } from '@shared/types/dropdownmenu.types';

import upload_file from '@icons/upload_file.svg'
import screen_shot from "@icons/screen_shot_link.svg"
import { useAppDispatch, useAppSelector } from '@shared/lib/store/hooks/reduxTypesHooks';
import { imgHistoryActions } from '@shared/lib/store/slices/imgHistorySlice';
import { TImgModel } from '@shared/types/imghistory.types';
import DropdownInputUnit from '@entities/Dropdown/InputUnit/DropdownInputUnit';
import DropdownLinkUnit from '@entities/Dropdown/LinkUnit/DropdownLinkUnit';
import { imgSelectedActions } from '@shared/lib/store/slices/ImgSelectedSlice';

enum EOptionLoader {
  'upload',
  'screenshot'
}

const dropDownConfig: TDropUnit[] = [
  {
    img: upload_file,
    text: 'File Upload',
    type: EOptionLoader.upload
  },
  {
    img: screen_shot,
    text: 'Take a Screen and Upload',
    type: EOptionLoader.screenshot
  }
]


// TODO при нажатии на квадрат (заменить на плюс) меня на крестик и отбратно
// TODO при навидении на юниты выподающего окна сбиваются border-radius когда есть изображения
const LoadImg = () => {
  // const {loadedImgs} = useAppSelector(state => state.imgSelected)
  const [openLoaderOpt, setOpenLoaderOpt] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const {addLoadedImgs} = imgSelectedActions
  // const { addImg } = imgHistoryActions

  const refClck = useClickOutside(() => {
    setOpenLoaderOpt(false);
  })

  const uploadImg = (file: FileList, id: number) => {
    const filesFromList: File[] = []
    for (let i = 0; i < file.length; ++i) {
      filesFromList.push(file[i])
    }
    dispatch(addLoadedImgs(filesFromList))
    setOpenLoaderOpt(false)
  }

  const takeScrenshot = (e: React.MouseEvent) => {
    setOpenLoaderOpt(false);
  }

  return (
    <div>
      <button 
        className={styles.subject_button}
        onClick={() => setOpenLoaderOpt(!openLoaderOpt)}
        />
      {/* Dropdown menu to features */}
      <div className={
        openLoaderOpt?
        styles.dropdown_active:
        styles.dropdown_hide
      }
      > 
        <div ref={refClck as React.RefObject<HTMLDivElement>} className={styles.dropdown_container}>
          {dropDownConfig.map((unit, indx) => {

            switch (unit.type) {
              case EOptionLoader.upload:
                return <DropdownInputUnit key={indx} fileLink={unit.img} text={unit.text} callback={uploadImg} inputType='file' />
              case EOptionLoader.screenshot:
                return <DropdownLinkUnit key={indx} fileLink={unit.img} text={unit.text} callback={takeScrenshot}/>
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default LoadImg