import React, { useState }  from 'react'
import styles from '../../styles/Input.module.scss'

const Input = ({ value, label, name, placeholder, type, onChange, register, required }) => {
    if (type == 'textarea') {
        return (
            <textarea name={name} className={styles.textarea} defaultValue={value} />
        );  
    } else {
        return (
            <>
                <label className={styles.label}>
                    <h3>{label}</h3>
                </label>
                {/* <input {...register(label, { required })} /> */}
                <input 
                    type={type}
                    defaultValue={value}
                    name={name}
                    placeholder={placeholder}
                    className={styles.input}
                    onChange={onChange}
                    {...register(label, { required })}
                />
            </>
        );       
    }
};

export default Input;