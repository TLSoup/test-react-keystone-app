import React from 'react';
import { Container } from 'react-bootstrap';
import DisplayPersonData from './components/DisplayPersonData'; 

const App = () => {
    return (
      <div style={{ height: "100vh", overflowY: "auto", scrollbarWidth: "none" }} >
        <Container>
            <DisplayPersonData />
        </Container>
      </div>
    );
};

export default App;