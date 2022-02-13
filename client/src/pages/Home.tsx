import React from 'react';
import {Container, Row} from "react-bootstrap"
import Slider from "../components/Slider"
import BestsellerBlock from "../components/BestsellerBlock"
import NewArrivalsBlock from "../components/NewArrivalsBlock"

const Home = () => {
  return (
    <Container>
      <Row>
        <Slider/>
      </Row>
      <BestsellerBlock/>
      <NewArrivalsBlock/>
    </Container>
  );
};

export default Home;
