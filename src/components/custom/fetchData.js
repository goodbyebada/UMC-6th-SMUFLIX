import { storeToken } from "custom/token";

/**
 * 리팩토링시 : fetchData class로 만들어 signupData 메소드 만드는것도 좋아보인다.
 *
 * @param {*} formData
 * @param {*} navigate
 */

export const fetchSignUpData = (formData, navigate) => {
  fetch("http://localhost:8080/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => {
      if (res.status === 201) {
        alert("회원가입이 정상적으로 처리되었습니다!");
        return res.json();
      }

      if (res.status === 409) {
        alert("이미 존재하는 아이디입니다!");
      }
      if (res.status === 400) {
        alert("비밀번호가 일치하지 않습니다.");
      }

      throw new Error(`${res.status}`);
    })
    .then((data) => {
      navigate("/login");
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const fetchLoginData = async (formData, navigate) => {
  try {
    const res = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.status === 200) {
      alert("로그인 성공!");
      const data = await res.json();
      navigate("/");
      storeToken(data);
      return true;
    }

    if (res.status === 401) {
      alert("아이디나 비밀번호를 다시 확인해주세요.");
      return false;
    }

    throw new Error(`${res.status}`);
  } catch (error) {
    console.error(error);
    return false;
  }
};
