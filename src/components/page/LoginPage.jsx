import SignUpItem from "components/item/SignUpItem";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { checkUserNameTypes, checkpasswordType } from "custom/checkTypes";
import { fetchLoginData } from "custom/fetchData";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setIsLoggedIn }) {
  // 한번 이상 제출 버튼을 눌렀는가 체크 변수
  const [submitOneMore, setSubmitOneMore] = useState(false);
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const INIT_DATA = {
    username: "",
    password: "",
  };

  const INIT_VALIDATION_DATA = {
    username: false,
    password: false,
  };

  const [checkValid, setCheckValid] = useState(INIT_VALIDATION_DATA);
  const [formData, setFormData] = useState(INIT_DATA);
  const [btnColor, setBtnColor] = useState("white");

  const handleChange = (tagName, value, isValid) => {
    setFormData({
      ...formData,
      [tagName]: value,
    });

    setCheckValid({
      ...checkValid,
      [tagName]: isValid,
    });
  };

  useEffect(() => {
    if (checkValid.username && checkValid.password) {
      setBtnColor("#ffe100");
      return;
    }

    setBtnColor("white");
  }, [checkValid]);

  return (
    <>
      <FormContainer
        onSubmit={async (e) => {
          // 아무것도 없다면 제출 금지
          e.preventDefault();
          setSubmitOneMore(true);

          if (checkValid.username && checkValid.password) {
            const loginSuccess = await fetchLoginData(formData, navigate);
            setIsLoggedIn(loginSuccess);
          }
        }}
      >
        <h1 style={{ margin: "10px" }}>로그인 페이지 </h1>

        <SignUpItem
          name={"아이디"}
          id={"username"}
          checkFun={checkUserNameTypes}
          changeEvent={(value, isValid) => {
            handleChange("username", value, isValid);
          }}
          password={null}
          passwordItem={false}
          submitOneMore={submitOneMore}
        />
        <SignUpItem
          name={"비밀번호"}
          id={"password"}
          checkFun={checkpasswordType}
          changeEvent={(value, isValid) => {
            handleChange("password", value, isValid);
            setpassword(value, isValid);
          }}
          password={null}
          passwordItem={true}
          submitOneMore={submitOneMore}
        />

        <Button color={btnColor}>제출하기</Button>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  margin: auto 0;
  height: 100%;
  margin-top: 40px;
`;

export const Button = styled.button`
  border-radius: 20px;
  background-color: ${(props) => props.color};
  border-color: transparent;
  width: 300px;
  height: 40px;
  margin-top: 30px;
`;
