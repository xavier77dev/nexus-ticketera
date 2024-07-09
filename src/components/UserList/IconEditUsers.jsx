import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from 'react-router-dom';
import { useDispatch} from 'react-redux'
// import { setEdituser } from '../../redux/userSlice.js';

const IconEditUsers = ({user, active}) => {
  const getloggedUserLS = JSON.parse(localStorage.getItem("loggedUser"));
  const dispatch = useDispatch();

  const handleClick = () => {
    // dispatch(setEdituser(user));
  }

  return (
    <div>

          <Link onClick={handleClick} className='' to={`/userDetail/${user.id}`} >
            <ModeEditIcon className='text-black ' fontSize='large'/>
          </Link>

    </div>
  )
}

export default IconEditUsers
