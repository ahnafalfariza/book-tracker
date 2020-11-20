import { Route, Redirect } from 'react-router-dom'
import useStore from '../store'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userId } = useStore()

  return (
    <Route
      {...rest}
      render={(props) =>
        userId ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

export default PrivateRoute
