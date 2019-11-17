import React from "react";
import ReactLoading from "react-loading";
import styled from "tachyons-components";

const Section = styled('div')`flex flex-wrap content-center justify-center w-100 h-100 bg-white`;
const Article = styled('div')`w-25 ma2 h4 items-center justify-center flex flex-column flex-wrap`;
const types = {
                "spinningBubbles":"spinningBubbles", "bars":"bars", "bubbles":"bubbles","cubes":"cubes","cylon":"cylon","spin":"spin"
              }

const LoadingBar = () => (
  <Section>
      <Article key={types.bars}>
        <ReactLoading type={types.bars} color="#f5de13" height={200} width={200} />
      </Article>
  </Section>
);

export default LoadingBar;
