import React from 'react';
import styled from 'styled-components';
import { ExampleButton } from './style';
import { useToggle } from './exampleComponentHooks';

function ExampleComponent() {
  const [isVisible, setIsVisible] = useToggle(false);

  return (
    <div>
      <ExampleButton primary onClick={setIsVisible}>
        Click me!
      </ExampleButton>

      <ExampleButton onClick={setIsVisible}>Or click me!</ExampleButton>
      {isVisible ? 'Hide' : 'Show'}
    </div>
  );
}

export default ExampleComponent;
