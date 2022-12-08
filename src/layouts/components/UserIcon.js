// ** Custom Icon Import
import Icon from '../../@core/components/icon'

const UserIcon = ({ icon, ...rest }) => {
  console.log(icon,"4444");
  return <Icon icon={icon} {...rest} />
}

export default UserIcon
