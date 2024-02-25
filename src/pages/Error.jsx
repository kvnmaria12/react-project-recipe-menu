import styled from 'styled-components';

function Error() {
  return (
    <div>
      <NotFound> 404 Not Found ! </NotFound>
    </div>
  );
}

const NotFound = styled.h1`
  font-size: 5rem;
  color: red;
  text-align: center;
`;

export default Error;
