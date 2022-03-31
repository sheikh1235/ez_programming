import React from "react";
import Anime from "react-anime";
import PointerSvg from "../../images/right-arrow-svgrepo-com.svg";
import "./AnimatedPointer.css";

const AnimatedPointer = (props, state) => (
  <Anime
    easing="easeOutElastic"
    duration={1000}
    direction="normal"
    translateY="13rem"
  >
    {PointerSvg}
  </Anime>
);

export default AnimatedPointer;
