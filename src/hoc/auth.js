import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../_actions/user_action";

//opthion
// null => 아무나 출입  true=>로그인한 유저만 출입 false=>로그인한 유저는 출입 불가능

//adminRoute => admin만 들어갈 수 있는 페이지
export default function b(SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch(); //useEffect가 저 []안에 변수가 바뀔때 실행되는건데, 아무것도 안넣으면
    //첫 실행때만 실행되게 하는거
    useEffect(() => {
      dispatch(auth()).then((response) => {
        //로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          //로그인한 상태
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            if (option === false) {
              props.history.push("/");
            }
          }
        }
      });
    }, []);
    return <SpecificComponent {...props} user={user} />;
  }

  return AuthenticationCheck;
}
