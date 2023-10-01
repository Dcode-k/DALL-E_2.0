import React from 'react'
import { download } from '../../assets'
import { downloadImage } from '../../utils'
import styles from './Card.module.css'
const Card = ({_id,name,prompt,photo}) => {
  return (
    <div className={styles.card_container}>
      <img  className={styles.cardImg} src={photo} alt={prompt} />
      <div className={styles.imageInfo_container}>
        <p className={styles.prompt}>
          {prompt}
        </p>
        <div className={styles.info_container} >
          <div className={styles.creatorInfo_container} >
            <div>
            {name[0]}
            </div>
            <p>
              {name}
            </p>
          </div>
          <button onClick={()=>downloadImage(_id,photo)}>
             <img className={styles.downloadImage} src={download} alt="download" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card