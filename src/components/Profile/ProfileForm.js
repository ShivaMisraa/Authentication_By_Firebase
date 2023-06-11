import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';
import AuthContext from '../../Store/auth-context';


const ProfileForm = () => {
  const newPasswordInputRef= useRef();
  const authCtx= useContext(AuthContext);

  const submitHandler= event=> {
    event.preventDefault();

    const enterNewPassword= newPasswordInputRef.current.value;

    //add valiadation

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBygTFFEDqS5q8VmNCxNgFaxenTeTyaBMs',{
     method:"POST",
     body: JSON.stringify ({
      idToken: authCtx.token,
      password:  enterNewPassword,
      returnSecureToken: false
     }),
     headers: {
      'Content-Type': 'application/json'
     }
    }).then(res=>{
      alert(res);
    })
  }
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}


export default ProfileForm;
