import styled from "styled-components";
import { useEffect, useState } from "react";
import SignUpItem from "item/SignUpItem";
import { useNavigate } from "react-router-dom";
import { fetchSignUpData } from "custom/fetchData";
import {
  checkAgeType,
  checkEmailType,
  checkNameTypes,
  checkUserNameTypes,
  checkpasswordType,
  doubleCheckpassword,
} from "custom/checkTypes";
import { INIT_DATA, INIT_VALIDATION_DATA } from "custom/checkTypes";
/**
 * 1. 동일한 input + notice div 스타일 컴포넌트를 만든다.
 * 2. map 을 이용해 props만 바꾼다.
 *  이때의 prop은 tag 이름, placeholder, checklogic, noice palceholder
 *
 * 제출하기 눌렀을시 -> 제어컴포넌트
 *
 *
 */

export default function SignUpPage() {
  const [formData, setFormData] = useState(INIT_DATA);
  const [checkValid, setCheckValid] = useState(INIT_VALIDATION_DATA);
  const [password, setpassword] = useState("");
  const [btnColor, setBtnColor] = useState("white");
  const navigate = useNavigate();

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

  // 한번 이상 제출 버튼을 눌렀는가 체크 변수
  const [submitOneMore, setSubmitOneMore] = useState(false);

  /**
   * 조건 만족할 시 button background 색깔 변경
   */
  useEffect(() => {
    if (
      checkValid.name &&
      checkValid.email &&
      checkValid.password &&
      checkValid.passwordCheck
    ) {
      setBtnColor("#ffe100d4");
      return;
    }

    setBtnColor("white");
  }, [checkValid]);

  const onSubmit = (e) => {
    // 아무것도 없다면 제출 금지
    e.preventDefault();
    setSubmitOneMore(true);

    if (
      checkValid.name &&
      checkValid.email &&
      checkValid.password &&
      checkValid.passwordCheck
    ) {
      fetchSignUpData(formData, navigate);
    }
  };

  return (
    <>
      <FormContainer onSubmit={onSubmit}>
        <h1 style={{ margin: "10px" }}>회원가입 페이지 </h1>
        <SignUpItem
          name={"이름"}
          id={"name"}
          checkFun={checkNameTypes}
          changeEvent={(value, isValid) => {
            handleChange("name", value, isValid);
          }}
          password={null}
          passwordItem={false}
          submitOneMore={submitOneMore}
        />
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
          name={"이메일"}
          id={"email"}
          checkFun={checkEmailType}
          changeEvent={(value, isValid) =>
            handleChange("email", value, isValid)
          }
          password={null}
          passwordItem={false}
          submitOneMore={submitOneMore}
        />
        <SignUpItem
          name={"나이"}
          id={"age"}
          checkFun={checkAgeType}
          changeEvent={(value, isValid) => handleChange("age", value, isValid)}
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
        <SignUpItem
          name={"비밀번호 확인"}
          id={"passwordCheck"}
          checkFun={doubleCheckpassword}
          changeEvent={(value, isValid) => {
            handleChange("passwordCheck", value, isValid);
          }}
          password={password}
          passwordItem={true}
          submitOneMore={submitOneMore}
        />
        <Button color={btnColor}>제출하기</Button>
        <Container>
          <p>이미 아이디가 있으신가요?</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            로그인 페이지로 이동하기
          </button>
        </Container>
      </FormContainer>
    </>
  );
}

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const Button = styled.button`
  border-radius: 20px;
  background-color: ${(props) => props.color};
  border-color: transparent;
  width: 300px;
  height: 40px;
  margin-top: 30px;
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
