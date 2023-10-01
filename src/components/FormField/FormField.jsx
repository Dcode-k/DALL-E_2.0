import React from 'react'
import styles from './FormField.module.css'

const FormField = ({LabelName,type,name,placeholder,value,handelChange,isSurpriseMe,handelSurpriseMe}) => {
  return (
    <div className={styles.FormField_container}>
      <div className={styles.label_container}>
      <label htmlFor={name} className={styles.label}>
        {LabelName}
       </label>
       {
        isSurpriseMe && (
          <button
          type='button'
          onClick={handelSurpriseMe}
          className={styles.surprisemebtn}
          >
            Surprise Me
          </button>
        )
       }
      </div>
      <div className={styles.formfieldinput_container}>
       <input
        type={type} 
         id={name}
         name={name}
         placeholder={placeholder}
         value={value}
         onChange={(e)=>handelChange(e)}
         required
         className={styles.formfieldinput}
       />
       </div>
    </div>
  )
}

export default FormField