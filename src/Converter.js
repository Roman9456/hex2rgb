import { useState } from "react";
import React from "react";
import "./css/converter.css";

function Converter() {
  
  const handleSubmit = evt => {
    evt.preventDefault();
    console.log(evt.type);
    console.dir(evt.target);
  }

  const[form, setForm]= useState({
    hex: '',
    rgb: '',
    color: ''
  });

  const hexToRGB = (hex) => {
    
    setForm(prevForm => ({...prevForm, hex: hex}));

    hex = '0x' + hex.replace('#', '');
    let r = hex >> 16 & 0xFF;
    let g = hex >> 8 & 0xFF;
    let b = hex & 0xFF;

    setForm(prevForm => ({...prevForm, rgb: 'rgb('+r+','+g+','+b+')'}));
    setForm(prevForm => ({...prevForm, color: 'rgb('+r+','+g+','+b+')'}));
  }

  const handleNameChange = evt => {
    
    if(evt.target.value.length == 7){
      if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(evt.target.value)) {
        hexToRGB(evt.target.value);
      } else {
        setForm(prevForm => ({...prevForm, rgb: 'Ошибка !'}))
        setForm(prevForm => ({...prevForm, color: 'rgb(255,0,0'}));
        container.background = 'red';
      }
    }
  }

  const container = {
    background: form.color,
    height: 500,
  }
  
  return (
    <div style={container}>
      <form onSubmit={handleSubmit}>
        <input id="name" name="hex" placeholder="Введите hex" value={form.name} onChange={handleNameChange} />
        <br />
        <label htmlFor="name">{form.rgb}</label>
      </form>
    </div>
  );
}

export default Converter;