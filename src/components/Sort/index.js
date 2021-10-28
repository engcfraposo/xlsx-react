import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExcel } from '../../store/ducks/excel/actions';

// import { Container } from './styles';

function SortComponent() {
    const dispatch = useDispatch()
    const { users } = useSelector(state => state.excel)
    
    const initialDelay = 50;
    const limit = 30;
  
    const [name, setName] = useState(null);
    const [count, setCount] = useState(limit);
    const [names, setNames] = useState([]);
    const [delay, setDelay] = useState(initialDelay);
    const [isFinal, setIsFinal] = useState(false);
  
    const randomizeName = useCallback(
    () => {
      let index = Math.floor(Math.random() * names.length);
      setName(names[index]);
    },[names]);
  
    const shouldRandomizeName = useCallback(
    () => {
      if (count < limit) {
        randomizeName();
        setCount(count + 1);
        switch (count) {
          case limit * 0.5:
            setDelay(delay * 2);
            break;
          case limit * 0.7:
            setDelay(delay * 1.5);
            break;
          case limit * 0.8:
            setDelay(delay * 1.2);
            break;
          default:
            break;
        }
      }
      if (count === limit && name) {
        setIsFinal(true);
      }
    },[count, delay, name, randomizeName]);
  
    useEffect(() => {
      setTimeout(() => {
        shouldRandomizeName();
      }, delay);
    }, [count, delay, shouldRandomizeName]);

    useEffect(() => {
      if(!!users.body){
        setNames(users.body.map(user => user["Nome Completo"]))
      }
    }, [users]);
  
    const startRandomize = () => {
      setDelay(initialDelay);
      setIsFinal(false);
      setCount(0);
    };

    return (
      <div
        className={`text-center d-flex flex-column align-items-center justify-content-center fade-in ${isFinal && " text-white"}`}
        style={{ height: "100vh", backgroundColor: `${isFinal ? "#0644A0" : "white"}` }}
      >
        <div className="container-fluid">
          <h1 className={`display-1`}>{!!name&&name.toUpperCase()}</h1>
        </div>
        <div className="container-fluid">
          <div className="text-center mt-2">
            <button style={{backgroundColor: "orange", borderColor: "white"}}className="btn btn-secondary" onClick={startRandomize}>
              Sortear 
            </button>
            <div className="text-center mt-2"/>
              <button className="ml-2 btn btn-secondary" style={{backgroundColor: "transparent", color:!isFinal?"#7695c2":"orange", borderColor: !isFinal?"#7695c2":"orange"}}onClick={() => dispatch(getExcel({}))}>
                Fazer novo sorteio
              </button>

          </div>
        </div>
      </div>
    );
}

export default SortComponent;