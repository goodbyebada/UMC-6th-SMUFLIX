export default function FormContainer({ children }) {
  return (
    <FormContainer
      onSubmit={(e) => {
        // 아무것도 없다면 제출 금지
        e.preventDefault();
        setSubmitOneMore(true);

        if (
          checkValid.name &&
          checkValid.email &&
          checkValid.pw &&
          checkValid.checkPw
        ) {
          console.log(formData);
          console.log("회원가입 성공");
        }
      }}
    >
      {children}
    </FormContainer>
  );
}

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  /* background: white; */
`;

export const Button = styled.button`
  border-radius: 20px;

  width: 300px;
  height: 40px;
`;

const Container = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 30px;

  justify-content: center;
  p {
    font-weight: 300;
  }

  button {
    background: transparent;
    border: none;
    font-size: large;
    font-weight: 700;
    color: white;
  }
`;
