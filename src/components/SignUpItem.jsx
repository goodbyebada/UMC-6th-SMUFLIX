import { useEffect, useState } from "react";
import styled from "styled-components";

export default function SignUpItem({
  name,
  id,
  checkFun,
  changeEvent,
  password,
  passwordItem,
  submitOneMore,
}) {
  const EMPTY_NOTICE = "";
  const [notice, setNotice] = useState("");
  //input 값 공유를 위해
  const [inputValue, setInputValue] = useState("");

  // 한번 이상 타이핑을 하였는가
  const [typingOneMore, setTypingOneMore] = useState(false);
  const [needToCheck, setNeedToCheck] = useState(false);

  useEffect(() => {
    setNeedToCheck(submitOneMore || typingOneMore);
  }, [submitOneMore, typingOneMore]);

  // onChangepasswordcheck
  // (체인지 이벤트로 걸어놓음) -> setNotice -> notice가 적힌다.
  // notice는 이 컴포내부에서만 바뀔 수 있다.

  // 비밀번호 확인 컴포넌트 일때
  const onChangepasswordCheck = (password, input) => {
    setNotice(checkFun(password, input));
    changeEvent(input, false);

    if (checkFun(password, input) === "비밀번호 일치합니다.") {
      changeEvent(input, true);
    }
  };
  // 비밀번호 컴포넌트 일때
  const onChangepassword = (input) => {
    changeEvent(input, false);

    setNotice(checkFun(input));

    if (checkFun(input) === EMPTY_NOTICE) {
      changeEvent(input, true);
    }
  };
  // 그외의 컴포넌트 일때
  const onChange = (input) => {
    setNotice(checkFun(input));

    // notice == "" 맞는 조건이라면 formData를 변경한다.
    if (checkFun(input) === EMPTY_NOTICE) {
      changeEvent(input, true);
    }
  };

  const CheckLogic = (input, needToCheck) => {
    // 비밀번호 입력란이라면
    if (!needToCheck) return;
    if (passwordItem && password === null) {
      onChangepassword(input);
    } else if (passwordItem) {
      onChangepasswordCheck(password, input);
    } else {
      onChange(input);
    }
  };

  useEffect(() => {
    CheckLogic(inputValue, needToCheck);
  }, [needToCheck, inputValue]);

  return (
    <div>
      <Input
        id={id}
        type={!passwordItem ? "" : "password"}
        onChange={(e) => {
          const input = e.target.value;
          setTypingOneMore(true);
          setInputValue(input);
        }}
        placeholder={`${name}을 입력해보세요`}
      ></Input>
      <Notice>{notice}</Notice>
    </div>
  );
}
const Input = styled.input`
  border-radius: 20px;

  width: 300px;
  height: 40px;
  margin: 8px;
  padding: 5px;
`;

const Notice = styled.p`
  font-size: 13px;
  color: red;
  margin: 3px;
  padding-left: 10px;
`;
