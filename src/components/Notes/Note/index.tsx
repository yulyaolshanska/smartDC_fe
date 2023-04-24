import Wrapper from '@components/Wrapper';
import React from 'react';
import { MainText, Date, Show, Doctor } from './styles';

const Note = () => {
  const [show, setShow] = React.useState<boolean>(false);

  return (
    <Wrapper>
      <Date> Mar 10,2022 09:00</Date>
      <MainText>
        {show ? (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
            alias molestias fugiat provident rerum voluptatem a doloribus
            explicabo veritatis adipisci facilis vitae sed minus repudiandae
            quisquam magni nesciunt inventore maiores. Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Sapiente dignissimos ipsum, at
            eius delectus impedit voluptatibus culpa necessitatibus earum
            tenetur sed illum dolorem ipsam dolore in harum laudantium
            consectetur id? Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Debitis quod quae velit reprehenderit incidunt tempore
            reiciendis. Maxime itaque quae sit sunt recusandae? Numquam
            repudiandae necessitatibus neque ut iusto laboriosam assumenda?
          </p>
        ) : (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
            alias molestias fugiat provident rerum voluptatem a doloribus
            explicabo veritatis adipisci facilis vitae sed minus repudiandae
            quisquam magni...
          </p>
        )}
      </MainText>
      <Show onClick={() => setShow(!show)}>Show {show ? 'less' : 'more'}</Show>

      <Doctor>Dr. Elen Malcovsky</Doctor>
    </Wrapper>
  );
};

export default Note;
