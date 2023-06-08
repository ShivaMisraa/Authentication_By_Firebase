import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading]= useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const eneteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //optional validiation

    setIsLoading(true);

    if (isLogin) {
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBygTFFEDqS5q8VmNCxNgFaxenTeTyaBMs",
        {
          method: "POST",
          body: JSON.stringify({
            email: eneteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "apllication/json",
          },
        }
      ).then(res=>{
        setIsLoading(false);
        if(res.ok){
          //...
        }
        else{
          return res.json().then(data=>{
            //show error modal
            // let errorMessage= "Aunthentication failed!";
            if (data && data.error && data.error.message){
              const errorMessage= data.error.message;
              alert(errorMessage);
            }
          })
        }
      });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? "Login" : "Create Account"}</button>}
          {(isLoading && <p>Sending Request...</p> )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
