export const INIT_DATA = {
  name: "",
  username: "",
  email: "",
  age: "",
  password: "",
  passwordCheck: "",
};

export const INIT_VALIDATION_DATA = {
  name: false,
  username: false,
  email: false,
  age: false,
  password: false,
  passwordCheck: false,
};

/**
 *공백을 검사하는 함수
 * @param obj
 * @returns
 */
function noSpace(obj) {
  const whitespaceRegex = /\s/;

  if ((obj === "") | whitespaceRegex.test(obj)) return false;

  return true;
}

export function checkNameTypes(obj) {
  if (noSpace(obj)) {
    return "";
  }
  const innerText = "필수입력 항목입니다!";
  return innerText;
}

export function checkUserNameTypes(obj) {
  let innerText;

  if (obj.length && obj.length < 5) {
    innerText = "아이디는 최소 5자리 이상으로 구성해주세요!";
    return innerText;
  }

  if (noSpace(obj)) {
    return "";
  }

  innerText = "아이디를 입력해주세요!";
  return innerText;
}

export function checkEmailType(obj) {
  let innerText;
  if (obj.includes("@") && noSpace(obj)) {
    return "";
  }

  if (!noSpace(obj)) {
    innerText = "이메일을 입력해주세요";
    return innerText;
  }
  innerText = "올바른 이메일 형식이 아닙니다!";
  return innerText;
}

export function checkpasswordType(obj) {
  let innerText;
  const regex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~@#$!%*?&])[a-zA-Z\d~@#$!%*?&]{4,12}$/;

  if (regex.exec(obj)) {
    // 올바른 비밀번호형식
    return "";
  }
  if (!noSpace(obj)) {
    innerText = "비밀번호를 입력해주세요";
  } else if (obj.length < 4) {
    innerText = "4자리 수 이상이어야 합니다.";
  } else if (obj.length > 12) {
    innerText = "12자리 수 이하이어야 합니다.";
  } else innerText = "올바른 비밀번호 형식이 아닙니다.";

  return innerText;
}

export function checkAgeType(obj) {
  let innerText;
  const regex = /^[0-9]*$/;
  if (regex.exec(obj) && parseInt(obj) >= 19) {
    return "";
  }

  if (parseInt(obj) < 0) {
    innerText = "나이는 양수여야합니다.";
  } else if (parseInt(obj) < 19) {
    innerText = "19세 이상만 사용 가능합니다.";
  } else if (!Number.isInteger(obj)) {
    innerText = "나이는 실수로 입력해주세요.";
  } else {
    innerText = "비밀번호를 입력해주세요";
  }

  return innerText;
}

export function doubleCheckpassword(password, obj) {
  let innerText;
  if (obj === password) {
    innerText = "비밀번호 일치합니다.";
    return innerText;
  }
  innerText = "비밀번호 일치하지 않습니다.";
  return innerText;
  // password input창 value 같은지 확인해야함
}

// formData 초기값 데이터가 ""인지를 체크 => 아니라면 변화 유
