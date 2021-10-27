import React from 'react';
import { useSelector } from 'react-redux';
import SortComponent from './components/Sort';
import Workbook from './components/Workbook'

const App = () => {
  const { users } = useSelector(state => state.excel)
  return (
    <React.Fragment>
    {!!users.body?(
      <SortComponent />
    ):(
      <Workbook />
    )}
    </React.Fragment>
  );
}

export default App;
