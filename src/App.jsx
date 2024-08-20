import { useState, useEffect } from 'react';
import './App.css';

function convertHEX(colorHex) {
  const colorRGB = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(colorHex);
  let result;
  if (colorRGB) {
    result = `rgb(${parseInt(colorRGB[1], 16)}, ${parseInt(colorRGB[2], 16)}, ${parseInt(colorRGB[3], 16)})`;
  } else {
    result = 'rgb(255, 0, 0)';
  }
  return result;
}

function App() {
  const [colorHex, setColorHex] = useState('');
  const [colorRGB, setColorRGB] = useState('rgb(0, 0, 0)');
  const [text, setText] = useState('Введите цвет в формате #000000');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (colorHex.length === 7) {
      const newColorRGB = convertHEX(colorHex);
      setColorRGB(newColorRGB);
      if (newColorRGB === 'rgb(255, 0, 0)') {
        setIsError(true);
        setText('Ошибка');
      } else {
        setIsError(false);
        setText(newColorRGB);
      }
    } else if (colorHex.length > 7) {
      setIsError(true);
      setText('Ошибка');
    } else {
      setColorRGB('rgb(0, 0, 0)');
      setIsError(false);
      setText('Введите цвет в формате #000000');
    }
  }, [colorHex]);

  const handleColorChange = ({ target }) => {
    const { value } = target;
    if (/^#?([A-Fa-f0-9]{6})$/.test(value)) {
      setColorHex(value);
    } else {
      setColorHex('');
    }
  };

  return (
    <div
      className="container"
      style={{
        backgroundColor: colorRGB,
        color: isError ? '#FF0000' : '#FFFFFF',
      }}
    >
      <form>
        <input
          type="text"
          id="colorHex"
          name="colorHex"
          value={colorHex}
          placeholder="Введите цвет в формате #000000"
          onChange={handleColorChange}
          className={isError ? 'error' : ''}
        />
      </form>
      <div className="converter-content">
        <span>{text}</span>
      </div>
    </div>
  );
}

export default App;

